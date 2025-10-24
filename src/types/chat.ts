export type ReplyStyle =
  | 'summary' // Summary Paragraph
  | 'bullets' // Bullet Points
  | 'steps' // Numbered Steps
  | 'quip' // Short Quip
  | 'definition' // Definition with Example
  | 'qa'; // Q&A Format

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  tone: string;
  length?: number;
  includeOutline?: boolean;
  hasAttachedFiles?: boolean;
  lastUserTopic?: string;
  is_file_uploaded?: boolean;
  replyStyle?: ReplyStyle;
  time?: string;
}

export interface ChatContextType {
  messages: Message[];
  sendMessage: (message: Message) => void;
  isTyping: boolean;
}

export interface ChatMessageProps {
  sender: 'user' | 'assistant';
  text: string;
}

export interface ComposerProps {
  onSend: (message: Message) => void;
  disabled?: boolean;
  startStream: () => void;
  isStreaming: boolean;
  stopStream: () => void;
}
