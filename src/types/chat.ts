export type RoleType = 'user' | 'assistant' | 'system';

export type MessageStatus = 'pending' | 'streaming' | 'error' | 'done';

export interface MessageProps {
  id: string;
  createdAt?: string;
  role: RoleType;
  content: string;
  status?: MessageStatus;
}
