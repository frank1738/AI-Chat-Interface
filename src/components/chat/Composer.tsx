import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { RequestOptionsPanel, RequestOptions } from './RequestOptionsPanel';
import { FileAttachments } from './composer/FileAttachments';
import { MessageInput } from './composer/MessageInput';
import { SendButton } from './composer/SendButton';

import type { ComposerProps } from '@/types/chat';
import StreamingButton from './composer/StreamingButton';

const MAX_FILES = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function Composer({
  onSend,
  disabled,
  startStream,
  isStreaming,
  stopStream,
}: ComposerProps) {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const [options, setOptions] = useState<RequestOptions>({
    tone: 'Professional',
    responseLength: 5,
    includeOutline: false,
    replyStyle: 'summary',
  });
  const [showOptions, setShowOptions] = useState(false);

  const composerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canSend = message.trim() || attachedFiles.length > 0;

  const handleSubmit = (e?: React.FormEvent) => {
    startStream();
    e?.preventDefault();
    if (!canSend || disabled) return;

    onSend({
      id: Date.now().toString(),
      sender: 'user',
      text: attachedFiles.length ? 'Uploaded file(s)' : message,
      tone: options.tone,
      length: options.responseLength,
      includeOutline: options.includeOutline,
      replyStyle: options.replyStyle,
      hasAttachedFiles: attachedFiles.length > 0,
      is_file_uploaded: attachedFiles.length > 0,
      time: Date.now().toString(),
    });

    setMessage('');
    setAttachedFiles([]);
  };

  const handleNewLine = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isStreaming) {
      return;
    }

    const el = e.target as HTMLTextAreaElement;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
      return;
    }
    setTimeout(() => {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 200)}px`;
    }, 0);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    if (attachedFiles.length + files.length > MAX_FILES) {
      alert(
        `Maximum ${MAX_FILES} files allowed. Currently have ${attachedFiles.length}.`
      );
      e.target.value = '';
      return;
    }

    const validFiles: File[] = [];
    const invalidFiles: string[] = [];

    files.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        invalidFiles.push(`${file.name} (exceeds 10MB)`);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      alert(
        `The following files exceed the 10MB limit:\n${invalidFiles.join('\n')}`
      );
    }

    if (validFiles.length > 0) {
      setAttachedFiles((prev) => [...prev, ...validFiles]);
    }

    e.target.value = '';
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleStopStream = () => {
    stopStream();
  };

  return (
    <div className="w-full px-4 md:px-0" ref={composerRef}>
      <div
        className={cn(
          'overflow-hidden relative rounded-2xl transition-all duration-200 shadow-[0_2px_8px_0_rgba(99,99,99,0.2)]',
          isFocused
            ? 'ring-2 ring-ring ring-offset-2 border-transparent'
            : 'border border-input'
        )}
      >
        <FileAttachments files={attachedFiles} onRemove={removeFile} />

        <div className="flex items-center gap-1 pl-2 pr-3 pt-2 overflow-hidden">
          <MessageInput
            message={message}
            setMessage={setMessage}
            handleNewLine={handleNewLine}
            setIsFocused={setIsFocused}
            disabled={disabled}
          />

          {isStreaming ? (
            <StreamingButton handleStopStream={handleStopStream} />
          ) : (
            <SendButton
              canSend={!!canSend}
              disabled={!!disabled}
              handleSubmit={handleSubmit}
            />
          )}
        </div>

        <div className="flex items-center gap-3 px-4 pb-4 pt-3 bg-card">
          <Button
            variant="outline"
            className="w-8 h-8"
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus />
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />

          <Popover open={showOptions} onOpenChange={setShowOptions}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-8 h-8">
                <SlidersHorizontal />
              </Button>
            </PopoverTrigger>
            <AnimatePresence>
              {showOptions && (
                <PopoverContent
                  side="top"
                  align="start"
                  className="w-[320px] bg-background p-4 rounded-2xl shadow-xl backdrop-blur-sm border"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <RequestOptionsPanel
                      onOptionsChange={setOptions}
                      DEFAULT_OPTIONS={options}
                    />
                  </motion.div>
                </PopoverContent>
              )}
            </AnimatePresence>
          </Popover>
        </div>
      </div>
    </div>
  );
}
