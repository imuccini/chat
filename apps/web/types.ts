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
  imageUrl?: string;
  recipientId?: string; // For private messages
  roomId?: string; // For room messages
  tenantId?: string; // For multitenancy context
  isSystem?: boolean;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  config?: any;
  menuEnabled?: boolean;
  feedbackEnabled?: boolean;
  staffEnabled?: boolean;
  menuUrl?: string | null;
  rooms?: Room[]; // Optional populated field
}

export type RoomType = 'ANNOUNCEMENT' | 'GENERAL';

export interface Room {
  id: string;
  name: string;
  description?: string;
  type: RoomType;
  tenantId: string;
}
