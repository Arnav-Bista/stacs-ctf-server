const leakyBucket = new Map<number, { tokens: number, lastDrain: number }>();

// Tokens per Second
const RATE = 1;
// Max Queue Size
const CAPACITY = 10;
// 30 min Stale Time -> Delete Entry
const STALE_DATA = 30 * 60 * 1000;
// 5 Minutes - How often we elimitate stale entries
const STALIN_TIMER = 5 * 60 * 1000;

// Stalin
setInterval(() => {
  const now = Date.now();
  for (const [key, val] of leakyBucket) {
    if (now - val.lastDrain > STALE_DATA) {
      leakyBucket.delete(key);
    }
  }
}, STALIN_TIMER);

export default function checkRateLimit(teamId: number): boolean {
  const now = Date.now();
  const bucket = leakyBucket.get(teamId) ?? { tokens: 0, lastDrain: now };

  // Calculate drain between last time 
  const elapsed = (now - bucket.lastDrain) / 1000;
  bucket.tokens = Math.max(0, bucket.tokens - elapsed * RATE);
  bucket.lastDrain = now;

  if (bucket.tokens >= CAPACITY) {
    return false;
  }

  bucket.tokens += 1;
  leakyBucket.set(teamId, bucket);

  return true;
}
