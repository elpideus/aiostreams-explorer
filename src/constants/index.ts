/**
 * Base URL for TMDB images (poster, still, etc.)
 */
export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w200";

/**
 * Prefix used for localStorage cache keys
 */
export const CACHE_PREFIX = "cache_";

/**
 * Cache time-to-live in milliseconds (24 hours)
 */
export const CACHE_TTL = 24 * 60 * 60 * 1000;

/**
 * Base path for the local streaming API
 */
export const API_BASE = "/api/search";

/**
 * Ranking of video resolutions (higher = better)
 */
export const RES_RANK: Record<string, number> = {
    "2160p": 4,
    "1080p": 3,
    "720p": 2,
    "480p": 1,
};

/**
 * Ranking of quality tags (higher = better)
 */
export const QUAL_RANK: Record<string, number> = {
    "BluRay REMUX": 5,
    "BluRay": 4,
    "WEB-DL": 3,
    "WEBRip": 2,
    "HDRip": 1,
    "BDRip": 1,
};

/**
 * Color mapping for resolution badges
 */
export const RES_COLOR: Record<string, string> = {
    "2160p": "#a855f7",
    "1080p": "#3b82f6",
    "720p": "#22c55e",
};

/**
 * Color mapping for various visual/audio tags (HDR, DV, Atmos, etc.)
 */
export const TAG_COLORS: Record<string, string> = {
    HDR: "#f59e0b",
    DV: "#c084fc",
    "10bit": "#34d399",
    SDR: "#6b7280",
    Atmos: "#60a5fa",
    TrueHD: "#818cf8",
    "DTS-HD MA": "#f472b6",
};

/**
 * Flag emoji mapping for common languages
 */
export const FLAG_MAP: Record<string, string> = {
    Italian: "🇮🇹",
    English: "🇬🇧",
    French: "🇫🇷",
    German: "🇩🇪",
    Spanish: "🇪🇸",
    Japanese: "🇯🇵",
    Korean: "🇰🇷",
    Chinese: "🇨🇳",
};