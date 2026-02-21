import React from "react";

interface SearchBarProps {
    query: string;
    setQuery: (q: string) => void;
    onSearch: () => void;
    loading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
                                                        query,
                                                        setQuery,
                                                        onSearch,
                                                        loading,
                                                    }) => {
    const inputStyle: React.CSSProperties = {
        flex: 1,
        background: "#1e1e32",
        border: "1px solid #3b3b5a",
        borderRadius: 10,
        padding: "12px 16px",
        color: "#e0e0ff",
        fontSize: 15,
        outline: "none",
    };

    return (
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                placeholder="Search movies or TV series..."
                style={inputStyle}
            />
            <button
                onClick={onSearch}
                disabled={loading}
                style={{
                    background: "#4f46e5",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "12px 22px",
                    cursor: "pointer",
                    fontSize: 15,
                    fontWeight: 600,
                }}
            >
                {loading ? "…" : "Search"}
            </button>
        </div>
    );
};