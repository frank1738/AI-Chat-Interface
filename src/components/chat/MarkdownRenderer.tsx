import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Copy, Check } from 'lucide-react';

interface MarkdownRendererProps {
  text: string;
}

export function MarkdownRenderer({ text }: MarkdownRendererProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (content: string) => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        pre: ({ children, ...props }) => {
          const codeContent =
            children &&
            typeof children === 'object' &&
            'props' in (children as React.ReactElement)
              ? String((children as React.ReactElement).props.children).trim()
              : String(children).trim();

          const handleCopyClick = () => handleCopy(codeContent);

          return (
            <div className="relative group">
              <pre
                {...props}
                className="overflow-x-auto p-3 rounded-md bg-gray-200 dark:bg-gray-700"
              >
                {children}
              </pre>

              {copied ? (
                <div className="absolute top-2 right-2 p-2 bg-teal-500 text-white rounded-md animate-fade-out">
                  <Check size={16} strokeWidth={3} />
                </div>
              ) : (
                <button
                  onClick={handleCopyClick}
                  className="absolute top-2 right-2 p-2 bg-gray-300 dark:bg-gray-600 rounded-md transition-opacity opacity-0 group-hover:opacity-100"
                  title="Copy code"
                >
                  <Copy size={16} />
                </button>
              )}
            </div>
          );
        },
        code: ({ children }) => (
          <code className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-sm">
            {children}
          </code>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
