import { useLocalStorage } from "./useLocalStorage";
import type {SortCriterion} from "../types";

const defaultCriteria: SortCriterion[] = [
    { category: "seeders", values: [], direction: "desc" },
    { category: "resolution", values: ["2160p", "1080p", "720p"] },
    { category: "quality", values: ["BluRay REMUX", "BluRay", "WEB-DL"] },
    { category: "lang", values: ["Italian", "English"] },
];

export function useSortCriteria(storageKey: string = "sortCriteria") {
    return useLocalStorage<SortCriterion[]>(storageKey, defaultCriteria);
}