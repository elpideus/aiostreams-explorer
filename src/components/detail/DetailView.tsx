import React from "react";
import type {TmdbItem, StreamResult, SeasonMeta, SortCriterion} from "../../types";
import { MagnetRow } from "../common/MagnetRow";
import { PriorityFilter } from "../filters/PriorityFilter";
import { SeasonRow } from "../series/SeasonRow";
import { fmtTitle, fmtYear, posterUrl } from "../../utils/formatters";
import { TMDB_IMAGE_BASE } from "../../constants";

interface DetailViewProps {
    selected: TmdbItem;
    onBack: () => void;
    streams: StreamResult[];
    seriesStructure: SeasonMeta[] | null;
    loading: boolean;
    error: string;
    // For movie filters
    sortCriteria: SortCriterion[];
    onSortChange: (c: SortCriterion[]) => void;
    allLangs: string[];
    allRes: string[];
    allQualities: string[];
    searchTerm: string;
    setSearchTerm: (s: string) => void;
    sortedStreams: StreamResult[]; // pre-sorted for movies
    onEpisodeClick: (season: number, episode: number) => void;
}

export const DetailView: React.FC<DetailViewProps> = ({
                                                          selected,
                                                          onBack,
                                                          streams,
                                                          seriesStructure,
                                                          loading,
                                                          error,
                                                          sortCriteria,
                                                          onSortChange,
                                                          allLangs,
                                                          allRes,
                                                          allQualities,
                                                          searchTerm,
                                                          setSearchTerm,
                                                          sortedStreams,
                                                          onEpisodeClick,
                                                      }) => {
    return (
        <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <button
                    onClick={onBack}
                    style={{
                        background: "#1e1e32",
                        border: "1px solid #3b3b5a",
                        color: "#c0c0e0",
                        borderRadius: 8,
                        padding: "6px 14px",
                        cursor: "pointer",
                        fontSize: 13,
                    }}
                >
                    ← Back
                </button>
                {posterUrl(selected, TMDB_IMAGE_BASE) && (
                    <img
                        src={posterUrl(selected, TMDB_IMAGE_BASE)!}
                        alt=""
                        style={{ height: 60, borderRadius: 6 }}
                    />
                )}
                <div>
                    <div style={{ fontWeight: 700, fontSize: 18, color: "#e0e0ff" }}>
                        {fmtTitle(selected)}
                    </div>
                    <div style={{ fontSize: 13, color: "#64748b" }}>
                        {fmtYear(selected)} ·{" "}
                        <span style={{ color: selected.media_type === "movie" ? "#60a5fa" : "#a78bfa" }}>
              {selected.media_type === "movie" ? "Movie" : "Series"}
            </span>
                    </div>
                </div>
            </div>

            {loading && (
                <div style={{ textAlign: "center", color: "#818cf8", padding: 40, fontSize: 16 }}>
                    ⏳ Fetching streams…
                </div>
            )}

            {!loading && streams.length > 0 && (
                <>
                    {selected.media_type === "movie" && (
                        <PriorityFilter
                            criteria={sortCriteria}
                            setCriteria={onSortChange}
                            allLangs={allLangs}
                            allRes={allRes}
                            allQualities={allQualities}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />
                    )}

                    {selected.media_type === "movie" && (
                        <div>
                            <div style={{ color: "#64748b", fontSize: 13, marginBottom: 12 }}>
                                {sortedStreams.length} sources
                            </div>
                            {sortedStreams.map((r, i) => (
                                <MagnetRow key={r.infoHash + i} r={r} idx={i} />
                            ))}
                        </div>
                    )}

                    {selected.media_type === "tv" && seriesStructure && (
                        <div>
                            {seriesStructure.map((season) => (
                                <SeasonRow
                                    key={season.season_number}
                                    season={season.season_number}
                                    episodes={season.episodes}
                                    onEpisodeClick={onEpisodeClick}
                                />
                            ))}
                            {seriesStructure.length === 0 && (
                                <div style={{ color: "#64748b", textAlign: "center", padding: 40 }}>
                                    No season information found.
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}

            {!loading && streams.length === 0 && !error && (
                <div style={{ color: "#64748b", textAlign: "center", padding: 40 }}>
                    No streams found for this title.
                </div>
            )}
        </div>
    );
};