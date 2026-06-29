export interface Lead {
  id: string;
  fullName: string;
  phone: string;
  businessName: string;
  branches: '1' | '2-3' | 'over-3';
  submittedAt: string;
  source: 'demo_form' | 'resource_download';
  email?: string;
  status: 'New' | 'Contacted' | 'Demo Scheduled' | 'VIP';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'soli-ai';
  text: string;
  timestamp: string;
  type?: 'text' | 'pricing' | 'slots' | 'success';
  options?: string[];
  slots?: string[];
  selectedSlot?: string;
}

export interface LeadStats {
  totalLeads: number;
  completedBookings: number;
  savedAdCost: number;
  conversionRate: number;
}
