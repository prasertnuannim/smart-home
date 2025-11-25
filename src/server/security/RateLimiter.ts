const hits = new Map<string, { count: number; ts: number }>();

export class RateLimiter {
  constructor(private limit: number, private windowSec: number) {}

  async check(key: string) {
    const now = Date.now();
    const w = this.windowSec * 1000;

    if (!hits.has(key)) hits.set(key, { count: 1, ts: now });
    else {
      const rec = hits.get(key)!;
      if (now - rec.ts < w) {
        rec.count++;
        if (rec.count > this.limit) throw createAppError("RATE_LIMIT", "Too many requests", 429);
      } else {
        hits.set(key, { count: 1, ts: now });
      }
    }
  }
}
