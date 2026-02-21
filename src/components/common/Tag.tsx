import React from "react";
import { TAG_COLORS } from "../../constants";

interface TagProps {
    label: string;
}

export const Tag: React.FC<TagProps> = ({ label }) => {
    const bg = TAG_COLORS[label] ?? "#475569";
    return (
        <span
            style={{
                background: bg,
                color: "#fff",
                borderRadius: 4,
                padding: "1px 5px",
                fontSize: 10,
                fontWeight: 700,
                marginRight: 3,
            }}
        >
      {label}
    </span>
    );
};