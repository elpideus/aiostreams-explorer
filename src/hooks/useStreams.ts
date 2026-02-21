import { useState, useEffect } from "react";
import {
    fetchExternalIds,
    fetchTVDetails,
    fetchSeason,
    fetchStreams,
} from "../services/api";
import type {TmdbItem, StreamResult, SeasonMeta} from "../types";

export function useStreams(selectedItem: TmdbItem | null) {
    const [rawStreams, setRawStreams] = useState<StreamResult[]>([]);
    const [seriesStructure, setSeriesStructure] = useState<SeasonMeta[] | null>(
        null
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!selectedItem) {
            setRawStreams([]);
            setSeriesStructure(null);
            setError("");
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            setRawStreams([]);
            setSeriesStructure(null);
            setError("");

            try {
                // 1. Get IMDB ID
                const ed = await fetchExternalIds(selectedItem.media_type, selectedItem.id);
                const imdbId: string | undefined = ed.imdb_id;
                if (!imdbId) {
                    setError("No IMDB ID found for this title.");
                    setLoading(false);
                    return;
                }

                // 2. If TV, fetch series structure
                if (selectedItem.media_type === "tv") {
                    const tvData = await fetchTVDetails(selectedItem.id);
                    const totalSeasons = tvData.number_of_seasons || 0;

                    const seasonPromises = [];
                    for (let s = 1; s <= totalSeasons; s++) {
                        seasonPromises.push(fetchSeason(selectedItem.id, s));
                    }
                    const seasonsData = await Promise.all(seasonPromises);

                    const structure: SeasonMeta[] = [];
                    seasonsData.forEach((seasonData, index) => {
                        if (!seasonData || !seasonData.episodes) return;
                        const seasonNumber = index + 1;
                        const episodes = seasonData.episodes.map((ep: any) => ({
                            episode_number: ep.episode_number,
                            name: ep.name,
                            overview: ep.overview || "",
                            still_path: ep.still_path || null,
                        }));
                        structure.push({ season_number: seasonNumber, episodes });
                    });
                    setSeriesStructure(structure);
                }

                // 3. Fetch streams
                const type = selectedItem.media_type === "movie" ? "movie" : "series";
                const sd = await fetchStreams(imdbId, type);
                setRawStreams((sd.data?.results as StreamResult[]) || []);
            } catch {
                setError("Stream API error — is the local server running?");
            }
            setLoading(false);
        };

        fetchData();
    }, [selectedItem]);

    return { rawStreams, seriesStructure, loading, error };
}