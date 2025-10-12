import { ReactNode } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  showHeader?: boolean;
}

export function Layout({
  children,
  title = 'AI Chat',
  showHeader = true,
}: LayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-background">
      {showHeader && (
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-b border-border bg-card/50 backdrop-blur-sm"
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-foreground">{title}</h1>
            </div>
            <ThemeToggle />
          </div>
        </motion.header>
      )}

      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
