export type Gender = 'male' | 'female' | 'other';

export interface User {
  id: string;
  alias: string;
  gender: Gender;
  status?: string; // Short status text (e.g. "In viaggio", "Disponibile")
  joinedAt?: number;
  phoneNumber?: string; // For account recovery
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  senderAlias: string;
  senderGender: Gender;
  timestamp: string;
  recipientId?: string; // For private messages
  isSystem?: boolean;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  config?: any;
}
