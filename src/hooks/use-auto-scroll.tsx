import { useEffect, useRef } from 'react';
import { UseAutoScrollOptions } from '@/types/ui';

export function useAutoScroll({
  enabled = true,
  deps = [],
  behavior = 'smooth',
  block = 'end',
}: UseAutoScrollOptions = {}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !scrollRef.current) return;

    const scrollElement = scrollRef.current;

    const lastChild = scrollElement.lastElementChild;

    if (lastChild) {
      lastChild.scrollIntoView({
        behavior,
        block,
        inline: 'nearest',
      });
    }
  }, deps);

  return scrollRef;
}
