import { useState, useEffect, useMemo } from "react";
import { useTMDB } from "./hooks/useTMDB";
import { useStreams } from "./hooks/useStreams";
import { useSortCriteria } from "./hooks/useSortCriteria";
import { SearchBar } from "./components/search/SearchBar";
import { ResultsGrid } from "./components/search/ResultsGrid";
import { DetailView } from "./components/detail/DetailView";
import { MagnetModal } from "./components/modal/MagnetModal";
import type {StreamResult, TmdbItem} from "./types";
import { RES_RANK, QUAL_RANK } from "./constants";
import {compareStreams} from "./utils/compareStreams.ts";

function App() {
    const [query, setQuery] = useState("");
    const { results, loading: searchLoading, error: searchError, search } = useTMDB();
    const [selected, setSelected] = useState<TmdbItem | null>(null);
    const { rawStreams, seriesStructure, loading: streamsLoading, error: streamsError } =
        useStreams(selected);
    const [modalEpisode, setModalEpisode] = useState<{ season: number; episode: number } | null>(
        null
    );

    // Main sort criteria (for movies)
    const [sortCriteria, setSortCriteria] = useSortCriteria("sortCriteria");
    const [searchTerm, setSearchTerm] = useState("");

    // Inject custom scrollbar styles
    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
      .episode-scroll::-webkit-scrollbar { height: 6px; }
      .episode-scroll::-webkit-scrollbar-track { background: #1e1e32; border-radius: 10px; }
      .episode-scroll::-webkit-scrollbar-thumb { background: #3b3b5a; border-radius: 10px; }
      .episode-scroll::-webkit-scrollbar-thumb:hover { background: #4f4f7a; }
    `;
        document.head.appendChild(style);
        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Filter and sort movie streams
    const sortedStreams = useMemo<StreamResult[]>(() => {
        let filtered = [...rawStreams];
        if (searchTerm) {
            filtered = filtered.filter((r) =>
                r.filename?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        filtered.sort((a, b) => compareStreams(a, b, sortCriteria));
        return filtered;
    }, [rawStreams, sortCriteria, searchTerm]);

    // Aggregate all possible values for filters
    const allLangs = useMemo<string[]>(() => {
        const s = new Set<string>();
        rawStreams.forEach((r) => r.parsedFile?.languages?.forEach((l) => s.add(l)));
        return [...s].sort();
    }, [rawStreams]);

    const allRes = useMemo<string[]>(() => {
        const s = new Set<string>();
        rawStreams.forEach((r) => {
            if (r.parsedFile?.resolution) s.add(r.parsedFile.resolution);
        });
        return [...s].sort((a, b) => (RES_RANK[b] ?? 0) - (RES_RANK[a] ?? 0));
    }, [rawStreams]);

    const allQualities = useMemo<string[]>(() => {
        const s = new Set<string>();
        rawStreams.forEach((r) => {
            if (r.parsedFile?.quality) s.add(r.parsedFile.quality);
        });
        return [...s].sort((a, b) => (QUAL_RANK[b] ?? 0) - (QUAL_RANK[a] ?? 0));
    }, [rawStreams]);

    // Magnets for selected episode
    const modalMagnets = useMemo<StreamResult[]>(() => {
        if (!modalEpisode) return [];
        const { season, episode } = modalEpisode;
        return rawStreams.filter((r) => {
            const seasons = r.parsedFile?.seasons ?? [];
            if (seasons.length === 0) return false;
            const firstSeason = seasons[0];
            if (firstSeason !== season) return false;
            if (r.parsedFile?.seasonPack) return true;
            const episodes = r.parsedFile?.episodes ?? [];
            return episodes.includes(episode);
        });
    }, [modalEpisode, rawStreams]);

    const handleBack = () => {
        setSelected(null);
        setModalEpisode(null);
    };

    const error = searchError || streamsError;

    return (
        <div
            style={{
                fontFamily: "'Segoe UI', system-ui, sans-serif",
                background: "#0a0a1a",
                minHeight: "100vh",
                color: "#e0e0ff",
                padding: 20,
            }}
        >
            <div style={{ maxWidth: "100vw", margin: "0 auto" }}>
                <h1
                    style={{
                        textAlign: "center",
                        color: "#818cf8",
                        marginBottom: 24,
                        fontSize: 28,
                        letterSpacing: 1,
                    }}
                >
                    🎬 Torrent Search
                </h1>

                <SearchBar query={query} setQuery={setQuery} onSearch={() => search(query)} loading={searchLoading} />

                {error && (
                    <div
                        style={{
                            background: "#3b0000",
                            border: "1px solid #7f1d1d",
                            borderRadius: 8,
                            padding: "10px 14px",
                            color: "#fca5a5",
                            marginBottom: 16,
                        }}
                    >
                        {error}
                    </div>
                )}

                {results.length > 0 && !selected && (
                    <ResultsGrid results={results} onSelect={setSelected} />
                )}

                {selected && (
                    <DetailView
                        selected={selected}
                        onBack={handleBack}
                        streams={rawStreams}
                        seriesStructure={seriesStructure}
                        loading={streamsLoading}
                        error={streamsError}
                        sortCriteria={sortCriteria}
                        onSortChange={setSortCriteria}
                        allLangs={allLangs}
                        allRes={allRes}
                        allQualities={allQualities}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        sortedStreams={sortedStreams}
                        onEpisodeClick={(s, e) => setModalEpisode({ season: s, episode: e })}
                    />
                )}

                <MagnetModal
                    isOpen={modalEpisode !== null}
                    onClose={() => setModalEpisode(null)}
                    magnets={modalMagnets}
                    allLangs={allLangs}
                    allRes={allRes}
                    allQualities={allQualities}
                />
            </div>
        </div>
    );
}

export default App;