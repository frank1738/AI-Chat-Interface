import { ChatMessage } from '@/components/chat/ChatMessage';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { Composer } from '@/components/chat/Composer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/hooks/useChat';
import { useAutoScroll } from '@/hooks/use-auto-scroll';
import { formatLocalTime } from '@/lib/chat/utils';
import useStreamingResponse from '@/hooks/useStreamingResponse';
import { useState } from 'react';
import { Message } from '@/types';
import { initialMessage } from '@/lib/chat/conversationFlow';
import ErrrorBubble from './ErrrorBubbl';

const streamingURL = import.meta.env.VITE_BACKEND_STREAMING_URL;

export function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);

  const handleComplete = (content: string) => {
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'assistant',
      text: content,
      tone: 'humorous',
      length: 5,
      includeOutline: false,
      replyStyle: 'bullets',
      time: Date.now().toString(),
    };
    setMessages((prev) => [...prev, assistantMessage]);
  };
  const { content, startStream, isStreaming, stopStream, isError } =
    useStreamingResponse(streamingURL, {
      onComplete: handleComplete,
    });

  const messagesContainerRef = useAutoScroll({
    enabled: true,
    deps: [content, isError],
    behavior: 'smooth',
  });

  const sendMessage = (message: Message) => {
    setMessages((prev) => [...prev, message]);
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 px-4 py-6">
        <div ref={messagesContainerRef} className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              sender={message.sender}
              text={message.text}
              timestamp={formatLocalTime(message.time)}
            />
          ))}

          {isStreaming && (
            <ChatMessage
              key="streamingResponse"
              sender="assistant"
              text={content}
              timestamp={formatLocalTime(String(Date.now()))}
            />
          )}

          {isError && <ErrrorBubble />}
        </div>
      </ScrollArea>
      <div className="max-w-4xl mx-auto w-full pb-14">
        <Composer
          onSend={sendMessage}
          startStream={startStream}
          isStreaming={isStreaming}
          stopStream={stopStream}
        />
      </div>
    </div>
  );
}
