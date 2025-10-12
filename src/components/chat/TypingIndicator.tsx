import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export function TypingIndicator() {
  const dotVariants = {
    initial: { y: 0, opacity: 0.6 },
    animate: { y: -8, opacity: 1 },
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.15,
        repeatDelay: 0.3,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="flex w-full gap-3 mb-4 justify-start"
    >
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 shadow-md">
          <Bot size={18} strokeWidth={2.5} />
        </div>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-xs text-gray-500 dark:text-gray-400 mb-1 px-2">
          now
        </span>

        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="max-w-sm rounded-3xl px-4 py-3 shadow-sm relative bg-gray-100 dark:bg-gray-800"
        >
          <div className="absolute left-0 top-2 w-0 h-0 border-8 border-t-8 border-r-8 border-l-0 border-b-0 border-t-gray-100 dark:border-t-gray-800 border-r-transparent border-l-transparent" />

          <motion.div
            className="flex gap-1.5 items-end"
            variants={containerVariants}
            initial="initial"
            animate="animate"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
                variants={dotVariants}
                transition={{
                  duration: 0.4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
