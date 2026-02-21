import React from "react";
import type {TmdbItem} from "../../types";
import { fmtTitle, fmtYear, posterUrl } from "../../utils/formatters";
import { TMDB_IMAGE_BASE } from "../../constants";

interface ResultsGridProps {
    results: TmdbItem[];
    onSelect: (item: TmdbItem) => void;
}

export const ResultsGrid: React.FC<ResultsGridProps> = ({ results, onSelect }) => {
    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 20,
                marginBottom: 24,
            }}
        >
            {results.map((item) => (
                <div
                    key={item.id}
                    onClick={() => onSelect(item)}
                    style={{
                        background: "#161628",
                        border: "1px solid #2e2e4a",
                        borderRadius: 12,
                        overflow: "hidden",
                        cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
                >
                    {posterUrl(item, TMDB_IMAGE_BASE) ? (
                        <img
                            src={posterUrl(item, TMDB_IMAGE_BASE)!}
                            alt=""
                            style={{ width: "100%", display: "block" }}
                        />
                    ) : (
                        <div
                            style={{
                                height: 200,
                                background: "#1e1e32",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 48,
                            }}
                        >
                            {item.media_type === "movie" ? "🎬" : "📺"}
                        </div>
                    )}
                    <div style={{ padding: "8px 10px" }}>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: 4,
                            }}
                        >
                            <div style={{ fontSize: 13, fontWeight: 600, color: "#e0e0ff", lineHeight: 1.3 }}>
                                {fmtTitle(item)}
                            </div>
                            <span style={{ fontSize: 16, flexShrink: 0 }}>
                {item.media_type === "movie" ? "🎬" : "📺"}
              </span>
                        </div>
                        <div style={{ fontSize: 11, color: "#64748b", marginTop: 3 }}>
                            {fmtYear(item)}
                        </div>
                        <div style={{ marginTop: 4 }}>
              <span
                  style={{
                      background: item.media_type === "movie" ? "#1d4ed8" : "#7c3aed",
                      color: "#fff",
                      borderRadius: 4,
                      padding: "1px 6px",
                      fontSize: 10,
                      fontWeight: 700,
                  }}
              >
                {item.media_type === "movie" ? "MOVIE" : "SERIES"}
              </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};