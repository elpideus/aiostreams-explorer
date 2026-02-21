import React from "react";
import type {SortCriterion} from "../../types";

interface PriorityFilterProps {
    criteria: SortCriterion[];
    setCriteria: (c: SortCriterion[]) => void;
    allLangs: string[];
    allRes: string[];
    allQualities: string[];
    searchTerm: string;
    setSearchTerm: (s: string) => void;
}

export const PriorityFilter: React.FC<PriorityFilterProps> = ({
                                                                  criteria,
                                                                  setCriteria,
                                                                  allLangs,
                                                                  allRes,
                                                                  allQualities,
                                                                  searchTerm,
                                                                  setSearchTerm,
                                                              }) => {
    const moveCriterion = (index: number, direction: "up" | "down") => {
        const newCriteria = [...criteria];
        if (direction === "up" && index > 0) {
            [newCriteria[index - 1], newCriteria[index]] = [
                newCriteria[index],
                newCriteria[index - 1],
            ];
        } else if (direction === "down" && index < newCriteria.length - 1) {
            [newCriteria[index], newCriteria[index + 1]] = [
                newCriteria[index + 1],
                newCriteria[index],
            ];
        }
        setCriteria(newCriteria);
    };

    const updateValues = (index: number, newValues: string[]) => {
        const newCriteria = [...criteria];
        newCriteria[index].values = newValues;
        setCriteria(newCriteria);
    };

    const toggleSeedersDir = (index: number) => {
        const newCriteria = [...criteria];
        const crit = newCriteria[index];
        if (crit.category === "seeders") {
            crit.direction = crit.direction === "desc" ? "asc" : "desc";
            setCriteria(newCriteria);
        }
    };

    const renderValueEditor = (criterion: SortCriterion, idx: number) => {
        if (criterion.category === "seeders") {
            return (
                <button
                    onClick={() => toggleSeedersDir(idx)}
                    style={{
                        background: "#1e1e32",
                        color: "#9ca3af",
                        border: "1px solid #3b82f6",
                        borderRadius: 6,
                        padding: "4px 10px",
                        fontSize: 12,
                        cursor: "pointer",
                    }}
                >
                    {criterion.direction === "desc" ? "↓ Desc" : "↑ Asc"}
                </button>
            );
        }

        const available =
            criterion.category === "lang"
                ? allLangs
                : criterion.category === "resolution"
                    ? allRes
                    : allQualities;
        const selected = criterion.values;

        const addValue = (value: string) => {
            if (!selected.includes(value)) {
                updateValues(idx, [...selected, value]);
            }
        };

        const removeValue = (value: string) => {
            updateValues(idx, selected.filter((v) => v !== value));
        };

        const moveValue = (valIdx: number, dir: "up" | "down") => {
            const newVals = [...selected];
            if (dir === "up" && valIdx > 0) {
                [newVals[valIdx - 1], newVals[valIdx]] = [
                    newVals[valIdx],
                    newVals[valIdx - 1],
                ];
            } else if (dir === "down" && valIdx < newVals.length - 1) {
                [newVals[valIdx], newVals[valIdx + 1]] = [
                    newVals[valIdx + 1],
                    newVals[valIdx],
                ];
            }
            updateValues(idx, newVals);
        };

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {selected.map((val, i) => (
                        <div
                            key={val}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                background: "#2e2e4a",
                                borderRadius: 16,
                                padding: "2px 8px",
                            }}
                        >
              <span style={{ color: "#c0c0e0", fontSize: 11, marginRight: 4 }}>
                {val}
              </span>
                            <button
                                onClick={() => moveValue(i, "up")}
                                disabled={i === 0}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#9ca3af",
                                    cursor: "pointer",
                                    fontSize: 14,
                                }}
                            >
                                ↑
                            </button>
                            <button
                                onClick={() => moveValue(i, "down")}
                                disabled={i === selected.length - 1}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#9ca3af",
                                    cursor: "pointer",
                                    fontSize: 14,
                                }}
                            >
                                ↓
                            </button>
                            <button
                                onClick={() => removeValue(val)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "#f87171",
                                    cursor: "pointer",
                                    fontSize: 14,
                                    marginLeft: 4,
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    ))}
                </div>
                <select
                    onChange={(e) => addValue(e.target.value)}
                    value=""
                    style={{
                        background: "#1e1e32",
                        color: "#c0c0e0",
                        border: "1px solid #2e2e4a",
                        borderRadius: 6,
                        padding: "4px 8px",
                        fontSize: 12,
                    }}
                >
                    <option value="" disabled>
                        Add {criterion.category}...
                    </option>
                    {available
                        .filter((v) => !selected.includes(v))
                        .map((v) => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                </select>
            </div>
        );
    };

    return (
        <div
            style={{
                background: "#161628",
                border: "1px solid #2e2e4a",
                borderRadius: 10,
                padding: "12px 16px",
                marginBottom: 16,
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ color: "#64748b", fontSize: 12 }}>Search:</span>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Filter by filename..."
                    style={{
                        background: "#1e1e32",
                        border: "1px solid #3b3b5a",
                        borderRadius: 6,
                        padding: "6px 10px",
                        color: "#e0e0ff",
                        fontSize: 13,
                        flex: 1,
                    }}
                />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {criteria.map((criterion, idx) => (
                    <div
                        key={criterion.category}
                        style={{
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 12,
                            borderBottom: "1px solid #2e2e4a",
                            paddingBottom: 8,
                        }}
                    >
                        <div
                            style={{
                                minWidth: 90,
                                fontWeight: 600,
                                color: "#818cf8",
                                fontSize: 13,
                            }}
                        >
                            {criterion.category === "lang"
                                ? "Language"
                                : criterion.category.charAt(0).toUpperCase() +
                                criterion.category.slice(1)}
                        </div>
                        <div style={{ flex: 1 }}>{renderValueEditor(criterion, idx)}</div>
                        <div style={{ display: "flex", gap: 4 }}>
                            <button
                                onClick={() => moveCriterion(idx, "up")}
                                disabled={idx === 0}
                                style={{
                                    background: "#1e1e32",
                                    border: "1px solid #3b3b5a",
                                    color: "#c0c0e0",
                                    borderRadius: 4,
                                    width: 24,
                                    height: 24,
                                    cursor: "pointer",
                                }}
                            >
                                ↑
                            </button>
                            <button
                                onClick={() => moveCriterion(idx, "down")}
                                disabled={idx === criteria.length - 1}
                                style={{
                                    background: "#1e1e32",
                                    border: "1px solid #3b3b5a",
                                    color: "#c0c0e0",
                                    borderRadius: 4,
                                    width: 24,
                                    height: 24,
                                    cursor: "pointer",
                                }}
                            >
                                ↓
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};