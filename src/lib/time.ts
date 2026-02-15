import { differenceInMinutes, parseISO } from "date-fns";

export function toTimeValue(input: string): string {
  // Accepts "9:30 PM", "21:30", "9:30pm", etc. Returns "HH:MM" 24h if possible.
  const s = input.trim();
  // Already 24h?
  const m24 = s.match(/^([01]?\d|2[0-3]):([0-5]\d)$/);
  if (m24) return `${m24[1].padStart(2,"0")}:${m24[2]}`;

  const m12 = s.match(/^([1-9]|1[0-2])(?::([0-5]\d))?\s*([AaPp][Mm])$/);
  if (m12) {
    let h = parseInt(m12[1], 10);
    const min = m12[2] ? parseInt(m12[2], 10) : 0;
    const ampm = m12[3].toLowerCase();
    if (ampm === "pm" && h !== 12) h += 12;
    if (ampm === "am" && h === 12) h = 0;
    return `${String(h).padStart(2,"0")}:${String(min).padStart(2,"0")}`;
  }

  // Best effort: leave as-is; UI validates separately
  return s;
}

export function localIso(date: string, time: string): string {
  // Treat as "local" naive time. Used for layovers between same-airport times.
  return `${date}T${time}:00`;
}

export function minutesBetween(aIso: string, bIso: string): number {
  return differenceInMinutes(parseISO(bIso), parseISO(aIso));
}

export function clampMinutes(m: number): number {
  if (!Number.isFinite(m)) return 0;
  return Math.max(0, Math.round(m));
}

export function formatMinutes(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h <= 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}
