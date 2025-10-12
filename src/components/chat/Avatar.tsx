import { User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AvatarProps {
  type: 'user' | 'assistant';
  size?: number;
}

export function Avatar({ type, size = 18 }: AvatarProps) {
  const isUser = type === 'user';

  return (
    <div
      className={cn(
        'w-8 h-8 rounded-lg flex items-center justify-center text-white shadow-md',
        isUser
          ? 'bg-gradient-to-br from-teal-500 to-teal-600'
          : 'bg-gradient-to-br from-gray-400 via-gray-400 to-gray-600'
      )}
    >
      {isUser ? (
        <User size={size} strokeWidth={2.5} />
      ) : (
        <Bot size={size} strokeWidth={2.5} />
      )}
    </div>
  );
}
