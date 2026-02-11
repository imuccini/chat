export type Gender = 'male' | 'female' | 'other';

export interface User {
  id: string;
  alias: string;
  gender: Gender;
  status?: string; // Short status text (e.g. "In viaggio", "Disponibile")
  image?: string; // Base64 or URL
  phoneNumber?: string; // For account recovery
  email?: string; // For registered users
  isAnonymous?: boolean; // To distinguish session types
  joinedAt?: number;
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

export interface Feedback {
  id: string;
  score: number;
  comment?: string;
  userId: string;
  user?: User;
  tenantId: string;
  createdAt: string;
}
