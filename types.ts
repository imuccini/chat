export type Gender = 'male' | 'female' | 'other';

export interface User {
  id: string;
  alias: string;
  gender: Gender;
  joinedAt?: number;
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
