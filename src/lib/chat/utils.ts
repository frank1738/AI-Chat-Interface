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
