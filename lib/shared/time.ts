// ─────────────────────────────────────────────
// KAIROS — Shared time / clock formatting helpers
//
// Consolidates the greeting + clock formatting logic
// that was previously duplicated across the Reception
// page and the marketing landing page.
// ─────────────────────────────────────────────

/** Returns a time-of-day greeting for the given date. */
export function timeGreeting(date: Date = new Date()): string {
  const h = date.getHours();
  if (h >= 5 && h < 12) return 'Good morning';
  if (h >= 12 && h < 17) return 'Good afternoon';
  return 'Good evening';
}

export interface ClockFormatOptions {
  locale?: string;
  hour12?: boolean;
  withSeconds?: boolean;
}

/** Formats a clock time string using Intl locale options. */
export function formatClockTime(
  date: Date = new Date(),
  { locale = 'en-GB', hour12 = false, withSeconds = false }: ClockFormatOptions = {},
): string {
  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    ...(withSeconds ? { second: '2-digit' } : {}),
    hour12,
  });
}
