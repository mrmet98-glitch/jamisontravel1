export function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
}

export async function readJson<T>(req: Request): Promise<T> {
  const text = await req.text();
  if (!text) return {} as T;
  return JSON.parse(text) as T;
}

export function err(message: string, status = 400) {
  return json({ error: message }, { status });
}

export function nowISO() {
  return new Date().toISOString();
}

export function uid() {
  return crypto.randomUUID();
}

export function upperIata(s: string) {
  return (s || "").trim().toUpperCase();
}

export function routeSummaryFromSegments(segs: Array<{ dep_airport: string; arr_airport: string }>) {
  const points: string[] = [];
  for (let i = 0; i < segs.length; i++) {
    if (i === 0) points.push(upperIata(segs[i].dep_airport));
    points.push(upperIata(segs[i].arr_airport));
  }
  const compact: string[] = [];
  for (const p of points) {
    if (!p) continue;
    if (compact.length === 0 || compact[compact.length - 1] !== p) compact.push(p);
  }
  return compact.join("→") || "—";
}

export function flightNumbersFromSegments(segs: Array<{ flight_number: string }>) {
  return segs.map(s => (s.flight_number || "").trim()).filter(Boolean).join("/") || "—";
}

export function minutesBetween(a: string, b: string) {
  const ta = Date.parse(a);
  const tb = Date.parse(b);
  if (!Number.isFinite(ta) || !Number.isFinite(tb)) return 0;
  const diff = Math.round((tb - ta) / 60000);
  return Math.max(0, diff);
}

export function localIso(date: string, time: string) {
  return `${date}T${time}:00`;
}
