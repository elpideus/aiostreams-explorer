export interface EpisodeMeta {
    episode_number: number;
    name: string;
    overview: string;
    still_path: string | null;
}

export interface SeasonMeta {
    season_number: number;
    episodes: EpisodeMeta[];
}

export interface TmdbItem {
    id: number;
    media_type: "movie" | "tv";
    title?: string;
    name?: string;
    release_date?: string;
    first_air_date?: string;
    poster_path?: string | null;
    overview?: string;
}

export interface ParsedFileInfo {
    resolution?: string;
    quality?: string;
    encode?: string;
    visualTags?: string[];
    audioTags?: string[];
    languages?: string[];
    seasons?: number[];
    episodes?: number[];
    seasonPack?: boolean;
}

export interface StreamResult {
    infoHash: string;
    filename?: string;
    size?: number | null;
    seeders?: number;
    sources?: string[];
    parsedFile?: ParsedFileInfo;
}

export interface SortCriterion {
    category: "lang" | "resolution" | "quality" | "seeders";
    values: string[]; // for seeders this is ignored but kept for consistency
    direction?: "asc" | "desc"; // only for seeders
}