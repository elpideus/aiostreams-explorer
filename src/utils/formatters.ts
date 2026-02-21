import type {TmdbItem} from "../types";

export function fmtSize(b: number | null | undefined): string {
    if (b == null) return "?";
    const g = b / 1e9;
    return g >= 1 ? `${g.toFixed(2)} GB` : `${(b / 1e6).toFixed(0)} MB`;
}

export function fmtTitle(r: TmdbItem): string {
    return r.name ?? r.title ?? "Unknown";
}

export function fmtYear(r: TmdbItem): string {
    return (r.release_date ?? r.first_air_date ?? "").slice(0, 4);
}

export function posterUrl(r: TmdbItem, baseUrl: string): string | null {
    return r.poster_path ? `${baseUrl}${r.poster_path}` : null;
}