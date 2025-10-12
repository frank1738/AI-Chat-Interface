import { ChatMessage } from '@/components/chat/ChatMessage';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { Composer } from '@/components/chat/Composer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/hooks/useChat';
import { useAutoScroll } from '@/hooks/use-auto-scroll';
import { formatLocalTime } from '@/lib/chat/utils';

export function ChatContainer() {
  const { messages, sendMessage, isTyping } = useChat();

  const messagesContainerRef = useAutoScroll({
    enabled: true,
    deps: [messages.length, isTyping],
    behavior: 'smooth',
  });

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
          {isTyping && <TypingIndicator />}
        </div>
      </ScrollArea>
      <div className="max-w-4xl mx-auto w-full pb-14">
        <Composer onSend={sendMessage} />
      </div>
    </div>
  );
}
