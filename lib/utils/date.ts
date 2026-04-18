/**
 * Extracts month and day parts from a date string in Europe/Berlin timezone.
 * 
 * @param dateStr - The target date string.
 * @returns An object containing the month (short, uppercase) and zero-padded day.
 */
export function getDateParts(dateStr: string): { month: string; day: string } {
  const d = new Date(dateStr);
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "Europe/Berlin",
  });
  
  const parts = formatter.formatToParts(d);
  const month = parts.find(p => p.type === "month")?.value.toUpperCase() || "";
  const day = parts.find(p => p.type === "day")?.value || "";
  
  return { month, day };
}

/**
 * Calculates the number of days between a target date and today,
 * normalizing both to Europe/Berlin local midnight.
 *
 * @param dateStr - The target date string.
 * @returns The number of days (can be negative for past dates).
 */
export function calculateDaysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();

  // Berlin is UTC+2 in summer (April), UTC+1 in winter. 
  // A safer way to normalize to midnight in Berlin:
  const targetNormalized = new Date(target.toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
  targetNormalized.setHours(0, 0, 0, 0);
  
  const nowNormalized = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Berlin" }));
  nowNormalized.setHours(0, 0, 0, 0);

  const diff = targetNormalized.getTime() - nowNormalized.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

/**
 * Formats a date string into "MMM DD" format (e.g., "MAY 24") using Europe/Berlin timezone.
 *
 * @param dateStr - The target date string to format.
 * @returns The formatted date string.
 */
export function formatDate(dateStr: string): string {
  const { month, day } = getDateParts(dateStr);
  return `${month} ${day}`;
}

/**
 * Formats a date string into "HH:MM" format in Europe/Berlin timezone.
 *
 * @param dateStr - The target date string to format.
 * @returns The formatted time string.
 */
export function formatTime(dateStr: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Europe/Berlin",
  }).format(new Date(dateStr));
}
