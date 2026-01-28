
export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  statJobs: string;
  statYears: string;
  statClients: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  timing: string;
}

export enum Page {
  HOME = 'HOME',
  AI_DESIGNER = 'AI_DESIGNER',
  SERVICES = 'SERVICES',
  CONTACT = 'CONTACT',
  ADMIN = 'ADMIN'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  groundingUrls?: string[];
}
