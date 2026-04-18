/**
 * Calculates the number of days between a target date and today.
 * Using UTC-based calculation to avoid timezone and DST shift issues.
 *
 * @param dateStr - The target date string.
 * @returns The number of days (can be negative for past dates).
 */
export function calculateDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();

  const targetUtc = Date.UTC(
    target.getUTCFullYear(),
    target.getUTCMonth(),
    target.getUTCDate()
  );
  const nowUtc = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  const diff = targetUtc - nowUtc;
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

/**
 * Formats a date string into "MMM DD" format (e.g., "MAY 24").
 *
 * @param dateStr - The target date string to format.
 * @returns The formatted date string.
 */
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  const month = d
    .toLocaleString("en-US", { month: "short", timeZone: "UTC" })
    .toUpperCase();
  const day = d.getUTCDate().toString().padStart(2, "0");
  return `${month} ${day}`;
}

/**
 * Formats a date string into "HH:MM" format.
 *
 * @param dateStr - The target date string to format.
 * @returns The formatted time string.
 */
export function formatTime(dateStr: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Berlin",
  }).format(new Date(dateStr));
}
