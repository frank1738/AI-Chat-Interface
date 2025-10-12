// src/context/ChatContext.tsx

import { createContext, useState, ReactNode } from 'react';
import { Message, ChatContextType } from '@/types/chat';
import { getAgentResponse } from '@/services/agent';
import {
  conversationFlow,
  AgentResponseContent,
} from '@/lib/chat/conversationFlow';

export const ChatContext = createContext<ChatContextType | undefined>(
  undefined
);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [currentAgentStateId, setCurrentAgentStateId] =
    useState<string>('start');
  const [isTyping, setIsTyping] = useState(false);

  const [messages, setMessages] = useState<Message[]>(() => {
    const startStep = conversationFlow.find((step) => step.id === 'start')!;
    const initialGreeting =
      typeof startStep.agentQuestion === 'string'
        ? startStep.agentQuestion
        : (startStep.agentQuestion as AgentResponseContent)['professional'];

    return [
      {
        id: '1',
        sender: 'assistant',
        text: initialGreeting,
        tone: 'professional',
        length: 7,
        includeOutline: false,
        time: Date.now().toString(),
      },
    ];
  });

  const sendMessage = (messageItem: Message) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: messageItem.text,
      tone: messageItem.tone.toLowerCase(),
      length: messageItem.length,
      includeOutline: messageItem.includeOutline,
      replyStyle: messageItem.replyStyle,
      hasAttachedFiles: messageItem.hasAttachedFiles || false,
      is_file_uploaded: messageItem.is_file_uploaded || false,
      time: messageItem.time,
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const { responseText, nextAgentStateId: newAgentState } =
        getAgentResponse(
          {
            text: newMessage.text,
            tone: newMessage.tone.toLocaleLowerCase(),
            length: newMessage.length,
            includeOutline: newMessage.includeOutline,
            hasAttachedFiles: newMessage.hasAttachedFiles || false,
            replyStyle: newMessage.replyStyle,
          },
          currentAgentStateId
        );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: responseText,
        tone: newMessage.tone,
        length: newMessage.length,
        includeOutline: newMessage.includeOutline,
        replyStyle: newMessage.replyStyle,
        time: Date.now().toString(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, assistantMessage]);
      setCurrentAgentStateId(newAgentState);
    }, 800);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, isTyping }}>
      {children}
    </ChatContext.Provider>
  );
}
