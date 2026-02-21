import React, { useRef } from "react";
import type {EpisodeMeta} from "../../types";
import { EpisodeCard } from "./EpisodeCard";

interface SeasonRowProps {
    season: number;
    episodes: EpisodeMeta[];
    onEpisodeClick: (season: number, episode: number) => void;
}

export const SeasonRow: React.FC<SeasonRowProps> = ({
                                                        season,
                                                        episodes,
                                                        onEpisodeClick,
                                                    }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (dir: "left" | "right") => {
        if (scrollRef.current) {
            const amount = 300;
            scrollRef.current.scrollBy({
                left: dir === "left" ? -amount : amount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ color: "#818cf8", fontWeight: 700, fontSize: 14 }}>
                    Season {season}
                </div>
                <button
                    onClick={() => scroll("left")}
                    style={{
                        background: "#1e1e32",
                        border: "1px solid #3b3b5a",
                        color: "#c0c0e0",
                        borderRadius: 6,
                        width: 28,
                        height: 28,
                        cursor: "pointer",
                    }}
                >
                    ←
                </button>
                <button
                    onClick={() => scroll("right")}
                    style={{
                        background: "#1e1e32",
                        border: "1px solid #3b3b5a",
                        color: "#c0c0e0",
                        borderRadius: 6,
                        width: 28,
                        height: 28,
                        cursor: "pointer",
                    }}
                >
                    →
                </button>
            </div>
            <div
                ref={scrollRef}
                className="episode-scroll"
                style={{
                    display: "flex",
                    overflowX: "auto",
                    gap: 12,
                    paddingBottom: 8,
                    scrollbarWidth: "thin",
                    scrollbarColor: "#3b3b5a #1e1e32",
                }}
            >
                {episodes.map((ep) => (
                    <EpisodeCard
                        key={ep.episode_number}
                        season={season}
                        episode={ep.episode_number}
                        meta={ep}
                        onClick={() => onEpisodeClick(season, ep.episode_number)}
                    />
                ))}
            </div>
        </div>
    );
};