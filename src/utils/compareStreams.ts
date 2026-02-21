import type {SortCriterion, StreamResult} from "../types";

import {findFirstPreferenceIndex} from "./findFirstPreferenceIndex.ts";

export function compareStreams(
    a: StreamResult,
    b: StreamResult,
    criteria: SortCriterion[]
): number {
    for (const crit of criteria) {
        const cat = crit.category;
        if (cat === "seeders") {
            const va = a.seeders ?? 0;
            const vb = b.seeders ?? 0;
            if (va !== vb) {
                return crit.direction === "desc" ? vb - va : va - vb;
            }
        } else {
            let valA: string | undefined;
            let valB: string | undefined;
            if (cat === "resolution") {
                valA = a.parsedFile?.resolution;
                valB = b.parsedFile?.resolution;
            } else if (cat === "quality") {
                valA = a.parsedFile?.quality;
                valB = b.parsedFile?.quality;
            } else if (cat === "lang") {
                const langsA = a.parsedFile?.languages ?? [];
                const langsB = b.parsedFile?.languages ?? [];
                const preferred = crit.values;
                const idxA = findFirstPreferenceIndex(langsA, preferred);
                const idxB = findFirstPreferenceIndex(langsB, preferred);
                if (idxA !== idxB) return idxA - idxB;
                continue;
            }

            const pref = crit.values;
            const rankA = valA ? pref.indexOf(valA) : -1;
            const rankB = valB ? pref.indexOf(valB) : -1;
            const rA = rankA === -1 ? 9999 : rankA;
            const rB = rankB === -1 ? 9999 : rankB;
            if (rA !== rB) return rA - rB;
        }
    }
    return 0;
}