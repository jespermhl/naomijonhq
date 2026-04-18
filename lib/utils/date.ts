/**
 * Extracts month and day parts from a date string in Europe/Berlin timezone.
 * 
 * @param dateStr - The target date string.
 * @returns An object containing the month (short, uppercase) and zero-padded day.
 */
/**
 * Extracts year, month, and day parts from a date string or Date object in the specified timezone.
 * Defaults to "Europe/Berlin".
 * 
 * @param date - The target date string or Date object.
 * @param timeZone - The IANA timezone identifier.
 * @returns An object containing the month (short), zero-padded day, year, and numeric components.
 */
export function getDateParts(date: string | Date, timeZone: string = "Europe/Berlin") {
  const d = typeof date === "string" ? new Date(date) : date;
  
  const formatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone,
  });
  
  const parts = formatter.formatToParts(d);
  const getPart = (type: string) => parts.find(p => p.type === type)?.value || "0";
  
  const year = parseInt(getPart("year"), 10);
  const monthNum = parseInt(getPart("month"), 10);
  const dayNum = parseInt(getPart("day"), 10);

  const monthName = new Intl.DateTimeFormat("en-US", {
    month: "short",
    timeZone,
  }).format(d).toUpperCase();

  const dayStr = dayNum.toString().padStart(2, "0");

  return { 
    month: monthName, 
    day: dayStr, 
    year, 
    monthNum, 
    dayNum 
  };
}

/**
 * Calculates the number of days between a target date and today,
 * normalizing both to Europe/Berlin local midnight using UTC midnights for comparison.
 *
 * @param dateStr - The target date string.
 * @returns The number of days (can be negative for past dates).
 */
export function calculateDaysUntil(dateStr: string): number {
  const targetParts = getDateParts(dateStr, "Europe/Berlin");
  const nowParts = getDateParts(new Date(), "Europe/Berlin");

  // Create UTC timestamps for midnights in the specified timezone
  const targetUtc = Date.UTC(targetParts.year, targetParts.monthNum - 1, targetParts.dayNum);
  const nowUtc = Date.UTC(nowParts.year, nowParts.monthNum - 1, nowParts.dayNum);

  const diff = targetUtc - nowUtc;
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
