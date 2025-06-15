
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
  date: Date;
  shift: 'day' | 'evening' | 'night';
  analyst: User;
  alertsHandled: number;
  incidentsResolved: number;
  newIOCs: number;
  notes: string;
  handoffNotes: string;
}
