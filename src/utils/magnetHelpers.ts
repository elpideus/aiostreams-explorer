import type {StreamResult} from "../types";

export function buildMagnet(r: StreamResult): string {
    let m = `magnet:?xt=urn:btih:${r.infoHash}&dn=${encodeURIComponent(
        r.filename || ""
    )}`;
    (r.sources || []).forEach((s) => {
        const tr = s.startsWith("tracker:") ? s.slice(8) : s;
        if (/^(udp|https?):\/\//.test(tr))
            m += `&tr=${encodeURIComponent(tr)}`;
    });
    return m;
}