export function formatLocalTime(timeString: string): string {
  const timestamp = Number(timeString);

  if (isNaN(timestamp)) {
    throw new Error('Invalid time string provided');
  }

  const date = new Date(timestamp);

  const formatted = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return formatted;
}

export const TONE_OPTIONS = [
  'Professional',
  'Casual',
  'Humorous',
  'Concise',
] as const;
export const REPLY_STYLES = [
  { value: 'summary', label: 'Summary Paragraph' },
  { value: 'bullets', label: 'Bullet Points' },
  { value: 'steps', label: 'Numbered Steps' },
  { value: 'quip', label: 'Short Quip' },
  { value: 'definition', label: 'Definition' },
  { value: 'qa', label: 'Q&A' },
] as const;
export const RESPONSE_LENGTH_LABELS = [
  'Very Short',
  'Short',
  'Brief',
  'Medium',
  'Moderate',
  'Long',
  'Very Long',
  'Extended',
  'Detailed',
  'Comprehensive',
];
