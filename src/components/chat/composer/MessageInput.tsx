import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';

interface MessageInputProps {
  message: string;
  setMessage: (msg: string) => void;
  handleNewLine: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  setIsFocused: (focused: boolean) => void;
  disabled?: boolean;
}

export function MessageInput({
  message,
  setMessage,
  handleNewLine,
  setIsFocused,
  disabled,
}: MessageInputProps) {
  return (
    <motion.div
      className="flex-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleNewLine}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Create content"
        disabled={disabled}
        className="min-h-[44px] resize-none bg-transparent border-0 outline-none"
      />
    </motion.div>
  );
}
