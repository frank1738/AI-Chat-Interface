import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ChatBubbleProps {
  sender: 'user' | 'assistant';
  text: string;
}

export function ChatBubble({ sender, text }: ChatBubbleProps) {
  const isUser = sender === 'user';

  return (
    <motion.div
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.2 }}
      className={cn(
        'max-w-sm rounded-3xl px-4 py-3 shadow-sm relative',
        isUser
          ? 'bg-teal-500 text-white'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
      )}
    >
      <div
        className={cn(
          'absolute w-0 h-0 border-8',
          isUser
            ? 'right-0 top-[11px] border-t-8 border-l-8 border-r-0 border-b-0 border-t-teal-500 border-l-transparent'
            : 'left-0 top-[12px] border-t-8 border-r-8 border-l-0 border-b-0 border-t-gray-100 dark:border-t-gray-800 border-r-transparent'
        )}
      />

      <div
        className={cn(
          'markdown-body text-sm leading-relaxed',
          isUser ? 'text-white' : 'text-gray-900 dark:text-gray-100'
        )}
      >
        <MarkdownRenderer text={text} />
      </div>
    </motion.div>
  );
}
