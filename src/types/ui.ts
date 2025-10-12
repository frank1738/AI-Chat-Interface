export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export interface UseAutoScrollOptions {
  enabled?: boolean;

  deps?: React.DependencyList;

  behavior?: ScrollBehavior;

  block?: ScrollLogicalPosition;
}
