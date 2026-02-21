import { useState } from "react";
import { searchTMDB } from "../services/api";
import type {TmdbItem} from "../types";

export function useTMDB() {
    const [results, setResults] = useState<TmdbItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const search = async (query: string) => {
        if (!query.trim()) return;
        setLoading(true);
        setResults([]);
        setError("");
        try {
            const data = await searchTMDB(query);
            setResults(
                (data.results as TmdbItem[] || []).filter(
                    (x) => x.media_type === "movie" || x.media_type === "tv"
                )
            );
        } catch {
            setError("TMDB search failed.");
        }
        setLoading(false);
    };

    return { results, loading, error, search };
}