import React, { useState } from "react";
import type {StreamResult} from "../../types";
import { buildMagnet } from "../../utils/magnetHelpers";
import { fmtSize } from "../../utils/formatters";
import { RES_COLOR, FLAG_MAP } from "../../constants";
import { Tag } from "./Tag";

interface MagnetRowProps {
    r: StreamResult;
    idx: number;
}

export const MagnetRow: React.FC<MagnetRowProps> = ({ r, idx }) => {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(buildMagnet(r));
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const {
        resolution,
        quality,
        encode,
        visualTags = [],
        audioTags = [],
        languages = [],
    } = r.parsedFile ?? {};

    return (
        <div
            style={{
                background: "#1e1e32",
                border: "1px solid #2e2e4a",
                borderRadius: 8,
                padding: "10px 14px",
                marginBottom: 8,
                display: "flex",
                alignItems: "flex-start",
                gap: 12,
            }}
        >
            <div style={{ color: "#555", fontSize: 12, minWidth: 22, paddingTop: 2 }}>
                #{idx + 1}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div
                    style={{
                        fontSize: 12,
                        color: "#c0c0e0",
                        marginBottom: 5,
                        wordBreak: "break-all",
                    }}
                >
                    {r.filename}
                </div>
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 4,
                        alignItems: "center",
                    }}
                >
                    {resolution && (
                        <span
                            style={{
                                background: RES_COLOR[resolution] ?? "#6b7280",
                                color: "#fff",
                                borderRadius: 4,
                                padding: "1px 6px",
                                fontSize: 10,
                                fontWeight: 700,
                            }}
                        >
              {resolution}
            </span>
                    )}
                    {quality && (
                        <span
                            style={{
                                background: "#1e3a5f",
                                color: "#93c5fd",
                                borderRadius: 4,
                                padding: "1px 6px",
                                fontSize: 10,
                            }}
                        >
              {quality}
            </span>
                    )}
                    {encode && (
                        <span
                            style={{
                                background: "#1a2a1a",
                                color: "#86efac",
                                borderRadius: 4,
                                padding: "1px 6px",
                                fontSize: 10,
                            }}
                        >
              {encode}
            </span>
                    )}
                    {[...visualTags, ...audioTags].map((t) => (
                        <Tag key={t} label={t} />
                    ))}
                    {languages.slice(0, 3).map((l) => (
                        <span
                            key={l}
                            style={{
                                background: "#2e1a3a",
                                color: "#d8b4fe",
                                borderRadius: 4,
                                padding: "1px 5px",
                                fontSize: 10,
                            }}
                        >
              {FLAG_MAP[l] || "🏳️"} {l}
            </span>
                    ))}
                    <span style={{ color: "#64748b", fontSize: 11, marginLeft: 4 }}>
            💾 {fmtSize(r.size)}
          </span>
                    <span style={{ color: "#16a34a", fontSize: 11, marginLeft: 4 }}>
            ▲ {r.seeders ?? "?"}
          </span>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
                <button
                    onClick={copy}
                    style={{
                        background: copied ? "#16a34a" : "#1d4ed8",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: "5px 10px",
                        cursor: "pointer",
                        fontSize: 12,
                    }}
                >
                    {copied ? "✓ Copied" : "📋 Copy"}
                </button>
                <button
                    onClick={() => window.open(buildMagnet(r), "_self")}
                    style={{
                        background: "#7c3aed",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: "5px 10px",
                        cursor: "pointer",
                        fontSize: 12,
                    }}
                >
                    🔗 Open
                </button>
            </div>
        </div>
    );
};