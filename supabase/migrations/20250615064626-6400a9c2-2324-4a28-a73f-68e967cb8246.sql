
-- Table for document categories
CREATE TABLE public.knowledge_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE
);

-- Table for knowledge documents
CREATE TABLE public.knowledge_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  file_path TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  indexed BOOLEAN DEFAULT FALSE,
  category_id UUID REFERENCES knowledge_categories(id) ON DELETE SET NULL,
  -- Optionally: Add other metadata fields needed for RAG
  tags TEXT[],
  file_type TEXT
);

-- Enable RLS for both tables (public read, insert, update, delete)
ALTER TABLE public.knowledge_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_categories ENABLE ROW LEVEL SECURITY;

-- Policies: allow full access (no authentication)
CREATE POLICY "Public full access knowledge_documents"
  ON public.knowledge_documents
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public full access knowledge_categories"
  ON public.knowledge_categories
  USING (true)
  WITH CHECK (true);

-- Create a storage bucket for documents (public)
insert into storage.buckets
  (id, name, public)
values
  ('knowledge_docs', 'knowledge_docs', true)
on conflict do nothing;
