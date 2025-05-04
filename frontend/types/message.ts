// frontend/types/message.ts

// Who sent the message
export type Role = 'user' | 'assistant';

// Supported language codes
export type LanguageCode =
  | 'slovene'
  | 'german'
  | 'italian'
  | 'croatian'
  | 'french'
  | 'english'
  | 'portuguese';

// A single chat message, stamped with HH:MM
export interface Message {
  role: Role;
  content: string;
  timestamp: string;
}

// A single correction tied to one user message
export interface CorrectionRecord {
  original: string;
  corrected: string;
  explanation: string;
  timestamp: string;
}

// What the backend returns for each turn
export interface ChatResponse {
  reply: string;
  correction: {
    corrected: string;
    explanation: string;
  };
}
