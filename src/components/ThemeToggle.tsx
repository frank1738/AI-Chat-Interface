import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { clsx } from 'clsx';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
      <button
        onClick={() => setTheme('light')}
        className={clsx(
          'flex items-center gap-2 px-4 py-2 sm:px-4 sm:py-2 rounded-full transition-all',
          theme === 'light'
            ? 'bg-white dark:bg-gray-700 shadow-md'
            : 'text-gray-600 dark:text-gray-400'
        )}
        aria-label="Light theme"
      >
        <Sun className="h-4 w-4" />
        <span className="hidden sm:inline text-sm font-medium">Light</span>
      </button>

      <button
        onClick={() => setTheme('dark')}
        className={clsx(
          'flex items-center gap-2 px-4 py-2 sm:px-4 sm:py-2 rounded-full transition-all',
          theme === 'dark'
            ? 'bg-gray-700 dark:bg-white shadow-md text-gray-700'
            : 'text-gray-600 dark:text-gray-400'
        )}
        aria-label="Dark theme"
      >
        <Moon className="h-4 w-4" />
        <span className="hidden sm:inline text-sm font-medium">Dark</span>
      </button>
    </div>
  );
}
