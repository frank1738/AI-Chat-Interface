import { motion } from 'framer-motion';
import { SendHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SendButtonProps {
  canSend: boolean;
  disabled: boolean;
  handleSubmit: (e?: React.FormEvent) => void;
}

export function SendButton({
  canSend,
  disabled,
  handleSubmit,
}: SendButtonProps) {
  return (
    <motion.div whileHover={{ scale: canSend ? 1.05 : 1 }}>
      <Button
        onClick={handleSubmit}
        disabled={!canSend || disabled}
        className="p-0 bg-transparent hover:bg-transparent text-gray-400 hover:text-green-500"
      >
        <SendHorizontal className="h-10 w-10" />
      </Button>
    </motion.div>
  );
}
