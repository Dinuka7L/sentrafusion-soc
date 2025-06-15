
-- 1. Table for shift summaries (basic metadata and audit trail)
CREATE TABLE public.shift_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shift_date DATE NOT NULL,
  shift_start TIMESTAMP WITH TIME ZONE,
  shift_end TIMESTAMP WITH TIME ZONE,
  shift_lead_id UUID,
  shift_lead_name TEXT,
  team_notes TEXT,
  external_threat_intel TEXT,
  report_text TEXT,
  version INTEGER NOT NULL DEFAULT 1,

  created_by UUID, -- Analyst submitting
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID,
  updated_at TIMESTAMPTZ,

  file_attachment_path TEXT,
  -- refer to previous summary for version history
  previous_summary_id UUID REFERENCES public.shift_summaries(id)
);

-- For auditing (who edited/created which summary), RLS will use `created_by` and `updated_by`.

-- 2. Table linking shift summaries to incidents/tickets
CREATE TABLE public.shift_summary_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shift_summary_id UUID NOT NULL REFERENCES public.shift_summaries(id) ON DELETE CASCADE,
  ticket_id TEXT NOT NULL,  -- can reference a ticketing system or a supabase table
  status TEXT,
  recommended_next_actions TEXT,
  analyst_comment TEXT
);

-- 3. Table linking shift summaries to IOCs surfaced in that shift
CREATE TABLE public.shift_summary_iocs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shift_summary_id UUID NOT NULL REFERENCES public.shift_summaries(id) ON DELETE CASCADE,
  ioc_type TEXT, -- ip/domain/hash
  ioc_value TEXT,
  description TEXT,
  external_link TEXT -- e.g. VirusTotal
);

-- 4. Table linking shift summaries to Knowledge Base updates
CREATE TABLE public.shift_summary_kb_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shift_summary_id UUID NOT NULL REFERENCES public.shift_summaries(id) ON DELETE CASCADE,
  kb_doc_id UUID,  -- references knowledge_documents(id)
  title TEXT,
  description TEXT
);

-- 5. Table linking shift summaries to recommended priorities
CREATE TABLE public.shift_summary_priorities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shift_summary_id UUID NOT NULL REFERENCES public.shift_summaries(id) ON DELETE CASCADE,
  priority_text TEXT
);

-- 6. Enable RLS on shift summary tables for workspace/user isolation (assume `created_by`/`updated_by` is the analyst's profile id)
ALTER TABLE public.shift_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shift_summary_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shift_summary_iocs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shift_summary_kb_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shift_summary_priorities ENABLE ROW LEVEL SECURITY;

-- 7. RLS Policies: Allow full access to creator and SOC leads/admins (will be refined as needed)
CREATE POLICY "SOC leads & creator can access shift summaries"
  ON public.shift_summaries
  USING (
    auth.uid() = created_by
    OR auth.uid() = updated_by
    OR public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'soc_analyst')
  )
  WITH CHECK (
    auth.uid() = created_by
    OR public.has_role(auth.uid(), 'admin')
    OR public.has_role(auth.uid(), 'soc_analyst')
  );

CREATE POLICY "SOC leads & creator can manage shift summary tickets"
  ON public.shift_summary_tickets
  USING (
    EXISTS (
      SELECT 1 FROM public.shift_summaries ss
      WHERE ss.id = shift_summary_id
        AND (
          auth.uid() = ss.created_by
          OR auth.uid() = ss.updated_by
          OR public.has_role(auth.uid(), 'admin')
          OR public.has_role(auth.uid(), 'soc_analyst')
        )
    )
  )
  WITH CHECK (true);

CREATE POLICY "SOC leads & creator can manage shift summary IOCs"
  ON public.shift_summary_iocs
  USING (
    EXISTS (
      SELECT 1 FROM public.shift_summaries ss
      WHERE ss.id = shift_summary_id
        AND (
          auth.uid() = ss.created_by
          OR auth.uid() = ss.updated_by
          OR public.has_role(auth.uid(), 'admin')
          OR public.has_role(auth.uid(), 'soc_analyst')
        )
    )
  )
  WITH CHECK (true);

CREATE POLICY "SOC leads & creator can manage shift summary KB updates"
  ON public.shift_summary_kb_updates
  USING (
    EXISTS (
      SELECT 1 FROM public.shift_summaries ss
      WHERE ss.id = shift_summary_id
        AND (
          auth.uid() = ss.created_by
          OR auth.uid() = ss.updated_by
          OR public.has_role(auth.uid(), 'admin')
          OR public.has_role(auth.uid(), 'soc_analyst')
        )
    )
  )
  WITH CHECK (true);

CREATE POLICY "SOC leads & creator can manage shift summary priorities"
  ON public.shift_summary_priorities
  USING (
    EXISTS (
      SELECT 1 FROM public.shift_summaries ss
      WHERE ss.id = shift_summary_id
        AND (
          auth.uid() = ss.created_by
          OR auth.uid() = ss.updated_by
          OR public.has_role(auth.uid(), 'admin')
          OR public.has_role(auth.uid(), 'soc_analyst')
        )
    )
  )
  WITH CHECK (true);

-- 8. Add bucket for file attachments (public for now, can restrict later)
INSERT INTO storage.buckets (id, name, public)
VALUES ('shift_attachments', 'shift_attachments', true)
ON CONFLICT DO NOTHING;

