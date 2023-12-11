export interface Ticket {
  id: number;
  // userId: number;
  subject: string;
  email: string;
  status: 'New' | 'In Progress' | 'Resolved' | 'Spam';
  responseText: string;
  // assigneeUserId: number | null;
  name: string;
  problemDescription: string;
  createdAt: string;
  updatedAt: string;
}
