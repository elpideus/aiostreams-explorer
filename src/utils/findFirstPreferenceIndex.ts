export function findFirstPreferenceIndex(
    langs: string[],
    preferred: string[]
): number {
    for (let i = 0; i < preferred.length; i++) {
        if (langs.includes(preferred[i])) return i;
    }
    return 9999;
}