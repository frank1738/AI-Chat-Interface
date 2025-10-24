import { Button } from '@/components/ui/button';
import { CircleStop } from 'lucide-react';

interface StreamingButtonProps {
  handleStopStream: () => void;
}

const StreamingButton = ({ handleStopStream }: StreamingButtonProps) => {
  return (
    <Button
      onClick={handleStopStream}
      className="relative !w-[30px] !h-[30px] rounded-[50%] bg-gray-200 hover:bg-gray-300 
                 dark:bg-gray-700 text-foreground overflow-visible"
    >
      <span className="absolute inset-0 rounded-full bg-gray-400 dark:bg-gray-500 animate-ping opacity-75 scale-75" />
      <CircleStop className="relative z-10" />
    </Button>
  );
};

export default StreamingButton;
