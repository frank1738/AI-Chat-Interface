import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Avatar } from './Avatar';
import { ChatBubble } from './ChatBubble';

interface ChatMessageProps {
  sender: 'user' | 'assistant';
  text: string;
  timestamp?: string;
}

export function ChatMessage({
  sender,
  text,
  timestamp = '10:30 AM',
}: ChatMessageProps) {
  const isUser = sender === 'user';

  return (
    <motion.div
      className={cn(
        'flex w-full gap-3 mb-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && <Avatar type="assistant" />}

      <div
        className={cn('flex flex-col', isUser ? 'items-end' : 'items-start')}
      >
        <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 px-2">
          {timestamp}
        </span>

        <ChatBubble sender={sender} text={text} />
      </div>

      {isUser && <Avatar type="user" />}
    </motion.div>
  );
}
