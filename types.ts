
export interface Message {
  id: string;
  text: string;
  timestamp: string;
  sender: 'user' | 'ai' | 'system';
  isRead?: boolean;
}

export interface Conversation {
  id: string;
  userName: string;
  userPhone: string;
  avatarUrl: string;
  messages: Message[];
}

export interface Template {
    id: string;
    name: string;
    content: string;
    category: string;
    createdAt: string;
}

export interface Plugin {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    apiKey: string;
    endpoint: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'Admin' | 'Agent' | 'Viewer';
    lastLogin: string;
}
