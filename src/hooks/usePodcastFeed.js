import {useState, useEffect } from 'react';

let cache = null;

const formatDuration = (totalSeconds) => {
    if (!totalSeconds) return '';
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.round((totalSeconds % 3600) / 60);
    return hrs > 0 ? `${hrs} hr ${mins} min` : `${mins} min`;
};

const formatDate = (pubDate) => {
    if (!pubDate) return '';
    return new Date(pubDate).toLocaleDateString('en-US', {
        year: 'numeric', month: 'short', day: 'numeric'
    });
};

const usePodcastFeed = () => {
    const [episodes, setEpisodes] = useState(cache ?? []);
    const [loading, setLoading] = useState(!cache);
    const [error, setError] = useState(null);

    useEffect(() => {

        if (cache) return;

        const fetchEpisodes = async () => {
            try {
                const r = await fetch('/api/podcast-feed')
                if (!r.ok) throw new Error(`Feed fetch failed: ${r.status}`);
                const data = await r.json();
                cache = data;
                setEpisodes(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false)
            }
        }
        fetchEpisodes()
    }, []);

    return {episodes, loading, error};
}

export {formatDuration, formatDate, usePodcastFeed};