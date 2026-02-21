import { CACHE_PREFIX, CACHE_TTL } from "../constants";

export async function cachedFetch<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl = CACHE_TTL
): Promise<T> {
    const cacheKey = CACHE_PREFIX + key;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        try {
            const { timestamp, data } = JSON.parse(cached);
            if (Date.now() - timestamp < ttl) {
                return data as T;
            }
        } catch {
            // ignore corrupted cache
        }
    }
    const data = await fetcher();
    localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
    return data;
}