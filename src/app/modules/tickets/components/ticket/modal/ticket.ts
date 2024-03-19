export interface Ticket {
  id?: string;
  subject?: string;
  Requester?: string;
  state?: string;
  status?: string;
  priority?: string;
  assigned_to?: string;
  status_details?: string;
  department?: string;
  source?: string;
  created_date?: string;
  last_modified_date?: string;
  due_date?: string;
  closed_date?: string;
  approval_status?: string;
  impact?: string;
  urgency?: string;
  child_ticket?: string;
  consultant_remarks?: string;
  category?: categoryPayload[];
}

export interface categoryPayload {
  id?: string;
  sub_category?: string;
  item?: string;
}
