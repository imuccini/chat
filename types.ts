
export type Gender = 'male' | 'female' | 'other';

export interface User {
  id: string;
  alias: string;
  gender: Gender;
  joinedAt: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderAlias: string;
  senderGender: Gender;
  text: string;
  timestamp: number;
  recipientId?: string;
}
