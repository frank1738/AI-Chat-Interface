// Textarea types
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

// Auto-scroll hook types
export interface UseAutoScrollOptions {
  /**
   * Whether to scroll to bottom when dependencies change
   */
  enabled?: boolean;
  /**
   * Dependencies to watch for changes
   */
  deps?: React.DependencyList;
  /**
   * Scroll behavior - 'smooth' or 'instant'
   */
  behavior?: ScrollBehavior;
  /**
   * Block alignment for scrollIntoView
   */
  block?: ScrollLogicalPosition;
}
