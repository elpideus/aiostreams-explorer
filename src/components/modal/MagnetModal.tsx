import React, { useEffect, useMemo } from "react";
import type {StreamResult, SortCriterion} from "../../types";
import { MagnetRow } from "../common/MagnetRow";
import { PriorityFilter } from "../filters/PriorityFilter";
import { useLocalStorage } from "../../hooks/useLocalStorage";

import {compareStreams} from "../../utils/compareStreams.ts";

interface MagnetModalProps {
    isOpen: boolean;
    onClose: () => void;
    magnets: StreamResult[];
    allLangs: string[];
    allRes: string[];
    allQualities: string[];
}

const defaultModalCriteria: SortCriterion[] = [
    { category: "seeders", values: [], direction: "desc" },
    { category: "resolution", values: ["2160p", "1080p", "720p"] },
    { category: "quality", values: ["BluRay REMUX", "BluRay", "WEB-DL"] },
    { category: "lang", values: ["Italian", "English"] },
];

export const MagnetModal: React.FC<MagnetModalProps> = ({
                                                            isOpen,
                                                            onClose,
                                                            magnets,
                                                            allLangs,
                                                            allRes,
                                                            allQualities,
                                                        }) => {
    const [modalCriteria, setModalCriteria] = useLocalStorage<SortCriterion[]>(
        "modalCriteria",
        defaultModalCriteria
    );
    const [modalSearch, setModalSearch] = React.useState("");

    // Reset search when modal opens/closes
    useEffect(() => {
        if (!isOpen) setModalSearch("");
    }, [isOpen]);

    const filtered = useMemo(() => {
        if (!isOpen) return [];
        return magnets.filter((r) => {
            if (r.filename && /part/i.test(r.filename)) return false;
            if (modalSearch && !r.filename?.toLowerCase().includes(modalSearch.toLowerCase()))
                return false;
            return true;
        });
    }, [isOpen, magnets, modalSearch]);

    const sorted = useMemo(() => {
        if (!isOpen) return [];
        return [...filtered].sort((a, b) => compareStreams(a, b, modalCriteria));
    }, [isOpen, filtered, modalCriteria]);

    if (!isOpen) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0,0,0,0.8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1000,
                padding: 20,
            }}
            onClick={onClose}
        >
            <div
                style={{
                    background: "#0a0a1a",
                    border: "1px solid #3b3b5a",
                    borderRadius: 12,
                    maxWidth: 800,
                    width: "100%",
                    maxHeight: "90vh",
                    overflow: "auto",
                    padding: 20,
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 16,
                    }}
                >
                    <h3 style={{ color: "#818cf8", margin: 0 }}>
                        Magnet Links ({sorted.length})
                    </h3>
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            color: "#9ca3af",
                            fontSize: 24,
                            cursor: "pointer",
                        }}
                    >
                        ×
                    </button>
                </div>

                <PriorityFilter
                    criteria={modalCriteria}
                    setCriteria={setModalCriteria}
                    allLangs={allLangs}
                    allRes={allRes}
                    allQualities={allQualities}
                    searchTerm={modalSearch}
                    setSearchTerm={setModalSearch}
                />

                {sorted.map((r, i) => (
                    <MagnetRow key={r.infoHash + i} r={r} idx={i} />
                ))}
                {sorted.length === 0 && (
                    <p style={{ color: "#64748b", textAlign: "center" }}>
                        No magnets match your filters.
                    </p>
                )}
            </div>
        </div>
    );
};