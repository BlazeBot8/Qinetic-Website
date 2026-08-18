/**
 * Client-side submission quota for the contact form: 3 sends per rolling 24h.
 *
 * SCOPE — read this before trusting it. Everything here runs in the visitor's
 * browser, so it is a deterrent, not enforcement:
 *   - survives a page reload, a tab close, and clearing any ONE storage layer
 *   - does NOT survive a fresh browser profile, another browser, or incognito,
 *     because those start with empty storage
 *   - does NOT stop anyone who calls the EmailJS endpoint directly
 * Enforcing a real per-person limit requires a server that holds the counter.
 *
 * The redundancy below (three independent storage layers, reconciled on read)
 * exists because clearing site data casually — e.g. only cookies — is common,
 * while clearing all three is deliberate.
 */

export const MAX_SENDS = 3;
export const WINDOW_MS = 24 * 60 * 60 * 1000;

const KEY = "qinetic.contact.sends";
const DB_NAME = "qinetic-guard";
const DB_STORE = "guard";

// --- layer 1: localStorage ------------------------------------------------
function readLocal() {
  try {
    return JSON.parse(window.localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

function writeLocal(stamps) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(stamps));
  } catch {
    /* storage disabled or full — other layers still apply */
  }
}

// --- layer 2: cookie ------------------------------------------------------
function readCookie() {
  try {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${KEY}=`));
    if (!match) return [];
    return JSON.parse(decodeURIComponent(match.slice(KEY.length + 1)));
  } catch {
    return [];
  }
}

function writeCookie(stamps) {
  try {
    const value = encodeURIComponent(JSON.stringify(stamps));
    const maxAge = Math.ceil(WINDOW_MS / 1000);
    document.cookie = `${KEY}=${value}; max-age=${maxAge}; path=/; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

// --- layer 3: IndexedDB ---------------------------------------------------
function openDb() {
  return new Promise((resolve) => {
    try {
      const req = window.indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(DB_STORE)) db.createObjectStore(DB_STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function readDb() {
  const db = await openDb();
  if (!db) return [];

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(DB_STORE, "readonly");
      const req = tx.objectStore(DB_STORE).get(KEY);
      req.onsuccess = () => resolve(Array.isArray(req.result) ? req.result : []);
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

async function writeDb(stamps) {
  const db = await openDb();
  if (!db) return;

  try {
    const tx = db.transaction(DB_STORE, "readwrite");
    tx.objectStore(DB_STORE).put(stamps, KEY);
  } catch {
    /* ignore */
  }
}

// --- reconciliation -------------------------------------------------------
const withinWindow = (stamps, now) =>
  stamps
    .filter((t) => typeof t === "number" && now - t < WINDOW_MS && t <= now)
    .sort((a, b) => a - b);

/**
 * Union of every layer, so wiping one does not reset the count.
 *
 * Dedupe is by exact value: all layers receive the identical array from
 * writeAll, so the same send appears with the same timestamp in each. Matching
 * on a time window instead would collapse distinct sends into one.
 */
async function readAll(now) {
  const merged = [...readLocal(), ...readCookie(), ...(await readDb())];
  return withinWindow([...new Set(merged)], now);
}

async function writeAll(stamps) {
  writeLocal(stamps);
  writeCookie(stamps);
  await writeDb(stamps);
}

/**
 * @returns {Promise<{allowed: boolean, remaining: number, retryAfterMs: number}>}
 */
export async function checkQuota(now = Date.now()) {
  const stamps = await readAll(now);

  // heal any layer that was cleared or lagging
  await writeAll(stamps);

  const remaining = Math.max(0, MAX_SENDS - stamps.length);
  const oldest = stamps[0];

  return {
    allowed: remaining > 0,
    remaining,
    retryAfterMs:
      remaining > 0 || oldest === undefined ? 0 : oldest + WINDOW_MS - now,
  };
}

export async function recordSend(now = Date.now()) {
  const stamps = await readAll(now);

  // two sends inside the same millisecond would dedupe into one, so keep
  // stamps strictly increasing
  const last = stamps[stamps.length - 1];
  const stamp = last !== undefined && now <= last ? last + 1 : now;

  stamps.push(stamp);
  await writeAll(withinWindow(stamps, stamp));
}

export function formatRetryAfter(ms) {
  if (ms <= 0) return "shortly";

  // round to whole minutes first, then split — rounding after the split lets a
  // remainder of 59.9 minutes render as "60m"
  const totalMinutes = Math.max(1, Math.ceil(ms / (60 * 1000)));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) return minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
  return `${minutes}m`;
}
