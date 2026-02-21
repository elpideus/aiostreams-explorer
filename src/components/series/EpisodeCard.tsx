import React from "react";
import type {EpisodeMeta} from "../../types";
import { TMDB_IMAGE_BASE } from "../../constants";

interface EpisodeCardProps {
    season: number;
    episode: number;
    meta?: EpisodeMeta;
    onClick: () => void;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
                                                            season,
                                                            episode,
                                                            meta,
                                                            onClick,
                                                        }) => {
    const stillUrl = meta?.still_path ? `${TMDB_IMAGE_BASE}${meta.still_path}` : null;

    return (
        <div
            onClick={onClick}
            style={{
                background: "#1e1e32",
                border: "1px solid #2e2e4a",
                borderRadius: 8,
                width: 180,
                flexShrink: 0,
                cursor: "pointer",
                overflow: "hidden",
                transition: "transform 0.1s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
            {stillUrl ? (
                <img
                    src={stillUrl}
                    alt=""
                    style={{ width: "100%", height: 100, objectFit: "cover" }}
                />
            ) : (
                <div
                    style={{
                        height: 100,
                        background: "#2e2e4a",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 32,
                    }}
                >
                    📺
                </div>
            )}
            <div style={{ padding: 8 }}>
                <div style={{ fontWeight: 700, fontSize: 13, color: "#e0e0ff" }}>
                    S{season}E{episode}: {meta?.name || `Episode ${episode}`}
                </div>
                <div
                    style={{
                        fontSize: 11,
                        color: "#94a3b8",
                        marginTop: 4,
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}
                >
                    {meta?.overview || "No description available."}
                </div>
            </div>
        </div>
    );
};