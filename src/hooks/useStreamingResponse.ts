// hooks/useStreamingResponse.ts
import { useState, useRef, useEffect } from 'react';

interface UseStreamingResponseOptions {
  onComplete?: (finalContent: string) => void;
  onError?: (error: string) => void;
}

function useStreamingResponse(
  url: string,
  options?: UseStreamingResponseOptions
) {
  const [content, setContent] = useState<string>('');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const contentRef = useRef<string>('');

  const startStream = () => {
    // Reset content
    setContent('');
    contentRef.current = '';

    // Reset error state
    setIsError(false);

    // Set streaming to true
    setIsStreaming(true);

    // Close any existing connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }

    // Create new EventSource connection
    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    // Listen for messages
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.done) {
        // Stream is complete, close connection
        eventSource.close();
        setIsStreaming(false);

        // Call onComplete callback with final content
        options?.onComplete?.(contentRef.current);
      } else {
        // Accumulate content
        const newContent = contentRef.current + ' ' + data.content;
        contentRef.current = newContent;
        setContent(newContent);
      }
    };

    // Handle errors
    eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
      eventSource.close();
      setIsStreaming(false);
      setIsError(true);

      // Call onError callback if provided
      options?.onError?.('Connection error occurred');
    };
  };

  const stopStream = () => {
    // Close the EventSource connection
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }

    // Reset streaming state
    setIsStreaming(false);

    // Reset error state
    setIsError(false);

    // Clear content
    setContent('');
    contentRef.current = '';
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  return {
    content,
    isStreaming,
    isError,
    startStream,
    stopStream,
  };
}

export default useStreamingResponse;
