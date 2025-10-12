import { motion, AnimatePresence } from 'framer-motion';
import { FileUp, X } from 'lucide-react';

interface FileAttachmentsProps {
  files: File[];
  onRemove: (index: number) => void;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export function FileAttachments({ files, onRemove }: FileAttachmentsProps) {
  if (!files.length) return null;

  return (
    <div className="flex flex-wrap gap-2 px-4 pt-3">
      <AnimatePresence>
        {files.map((file, index) => (
          <motion.div
            key={`${file.name}-${index}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-2 px-3 py-1.5 bg-secondary rounded-lg text-sm border border-border"
          >
            <FileUp className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium truncate max-w-[150px]">
              {file.name}
            </span>
            <span className="text-muted-foreground text-xs">
              ({formatFileSize(file.size)})
            </span>
            <button
              onClick={() => onRemove(index)}
              className="ml-1 text-muted-foreground hover:text-destructive transition-colors"
              type="button"
              aria-label="Remove file"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
