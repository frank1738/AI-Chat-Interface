import { AlertCircle } from 'lucide-react';

const ErrorBubble = () => {
  return (
    <div
      className="
        max-w-sm rounded-3xl px-4 py-3 shadow-sm relative bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100"
    >
      <div className="absolute w-0 h-0 border-8 left-0 top-[12px] border-t-8 border-r-8 border-l-0 border-b-0 border-t-red-50 dark:border-t-red-900/20 border-r-transparent" />

      <div className="flex items-start gap-2">
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600 dark:text-red-400" />
        <div
          className="markdown-body text-sm leading-relaxed 
            text-red-900 dark:text-red-100"
        >
          Server error occurred
        </div>
      </div>
    </div>
  );
};

export default ErrorBubble;
