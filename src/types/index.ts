export interface User {
  id: string;
  email: string;
  name: string;
  role: 'tier1' | 'tier2' | 'admin';
  avatar?: string;
}

export interface Workspace {
  id: string;
  name: string;
  description: string;
  members: User[];
  createdAt: Date;
  connectors: Connector[];
}

export interface Connector {
  id: string;
  type: 'discord' | 'google-sheets' | 'siem' | 'threat-intel';
  name: string;
  status: 'active' | 'inactive' | 'error';
  lastSync?: Date;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  source: string;
  timestamp: Date;
  status: 'open' | 'investigating' | 'resolved' | 'false-positive';
  assignee?: User;
  iocs?: IOC[];
}

export interface IOC {
  id: string;
  type: 'ip' | 'domain' | 'hash' | 'url' | 'email';
  value: string;
  confidence: number;
  tags: string[];
  firstSeen: Date;
  lastSeen: Date;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  context?: string[];
  citations?: Document[];
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  workspaceId: string;
  incidentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'csv' | 'md' | 'url';
  size: number;
  uploadedAt: Date;
  uploadedBy: User;
  indexed: boolean;
  workspaceId: string;
}

export interface Incident {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  assignee?: User;
  createdAt: Date;
  updatedAt: Date;
  alerts: Alert[];
  chatSessionId?: string;
}

export interface ShiftSummary {
  id: string;
  shift_date: string; // ISO Date string
  shift_start?: string | null;
  shift_end?: string | null;
  shift_lead_id?: string | null;
  shift_lead_name?: string | null;
  team_notes?: string | null;
  external_threat_intel?: string | null;
  report_text?: string | null;
  version: number;
  created_by?: string | null;
  created_at: string;
  updated_by?: string | null;
  updated_at?: string | null;
  file_attachment_path?: string | null;
  previous_summary_id?: string | null;

  tickets?: ShiftSummaryTicket[];
  iocs?: ShiftSummaryIOC[];
  kb_updates?: ShiftSummaryKBUpdate[];
  priorities?: ShiftSummaryPriority[];
}

export interface ShiftSummaryTicket {
  id: string;
  shift_summary_id: string;
  ticket_id: string;
  status?: string | null;
  recommended_next_actions?: string | null;
  analyst_comment?: string | null;
}

export interface ShiftSummaryIOC {
  id: string;
  shift_summary_id: string;
  ioc_type?: string | null;
  ioc_value?: string | null;
  description?: string | null;
  external_link?: string | null;
}

export interface ShiftSummaryKBUpdate {
  id: string;
  shift_summary_id: string;
  kb_doc_id?: string | null;
  title?: string | null;
  description?: string | null;
}

export interface ShiftSummaryPriority {
  id: string;
  shift_summary_id: string;
  priority_text?: string | null;
}
