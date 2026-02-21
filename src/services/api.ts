import { cachedFetch } from "./cache";
import { API_BASE } from "../constants";

const TMDB_KEY = import.meta.env.VITE_TMDB_KEY || "";

export async function searchTMDB(query: string) {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_KEY}&query=${encodeURIComponent(
        query
    )}&include_adult=false`;
    return cachedFetch(`tmdb_search_${query}`, async () => {
        const res = await fetch(url);
        return res.json();
    });
}

export async function fetchExternalIds(mediaType: "movie" | "tv", id: number) {
    const endpoint =
        mediaType === "movie"
            ? `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${TMDB_KEY}`
            : `https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${TMDB_KEY}`;
    return cachedFetch(`tmdb_external_${mediaType}_${id}`, async () => {
        const res = await fetch(endpoint);
        return res.json();
    });
}

export async function fetchTVDetails(id: number) {
    const url = `https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_KEY}`;
    return cachedFetch(`tmdb_tv_${id}`, async () => {
        const res = await fetch(url);
        return res.json();
    });
}

export async function fetchSeason(seriesId: number, season: number) {
    const url = `https://api.themoviedb.org/3/tv/${seriesId}/season/${season}?api_key=${TMDB_KEY}`;
    return cachedFetch(`tmdb_tv_${seriesId}_season_${season}`, async () => {
        const res = await fetch(url);
        return res.json();
    }).catch(() => null);
}

export async function fetchStreams(imdbId: string, type: "movie" | "series") {
    const url = `${API_BASE}?id=${imdbId}&type=${type}`;
    return cachedFetch(`local_api_${imdbId}_${type}`, async () => {
        const res = await fetch(url);
        return res.json();
    });
}