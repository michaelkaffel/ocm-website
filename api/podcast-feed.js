import { XMLParser } from 'fast-xml-parser';

export const config = { runtime: 'edge' };

const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: '@_',
    isArray: (name) => name === 'item',
})

function parseDuration(raw) {
    if (!raw) return 0;
    if (typeof raw === 'number') return raw;
    if (raw.includes(':')) {
        const parts = raw.split(':').map(Number);
        if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
        if (parts.length === 2) return parts[0] * 60 + parts[1];
    };
    return parseInt(raw) || 0
};

export default async function handler() {
    try {
        const res = await fetch('https://feeds.buzzsprout.com/1877201.rss', {
            headers: { 'User-Agent': 'OCMWebsite/1.0' }
        })
        const xml = await res.text();
        const feed = parser.parse(xml)
        const channel = feed.rss.channel
        const items = channel.item ?? [];
        

        // Channel-level artwork (shared across all episodes)
        const channelArtwork =
            channel['itunes:image']?.['@_href'] ??
            channel.image?.url ??
            '';

        const episodes = items.map(item => {

            const rawGuid = typeof item.guid === 'object' ? item.guid['#text'] : item.guid ?? '';
            const id = String(rawGuid).replace('Buzzsprout', '').replace(/^-/, '');

            return {
                id,
                title: item.title ?? '',
                summary: item['itunes:summary'] ?? '',
                showNotes: item.description ?? '',
                publishedAt: item.pubDate ?? '',
                duration: parseDuration(item['itunes:duration']),
                season: item['itunes:season'] ?? null,
                episode: item['itunes:episode'] ?? null,
                audioUrl: item.enclosure?.['@_url'] ?? '',
                artworkUrl: channelArtwork,
                transcriptUrl: (() => {
                    const t = item['podcast:transcript'] ?? [];
                    return Array.isArray(t)
                        ? (t.find(x => x['@_type'] == 'application/json')?.['@_url'] ?? '')
                        : (t['@_url'] ?? '')
                })(),
                chaptersUrl: (() => {
                    const c = item['podcast:chapters'] ?? [];
                    return Array.isArray(c)
                        ? (c.find(x => x['@_type'] === 'application/json+chapters')?.['@_url'] ?? '')
                        : (c['@_url'] ?? '')
                })(),
            }
        })

        return new Response(JSON.stringify(episodes), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
                'Access-Control-Allow-Origin': '*',
            }
        })
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        })
    }
}