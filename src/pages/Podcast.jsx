import { useState, useMemo } from 'react';
import { usePodcastFeed } from '../hooks/usePodcastFeed';
import EpisodeRow from '../components/EpisodeRow';
import usePageTitle from '../hooks/usePageTitle';

const Podcast = () => {
    usePageTitle('Podcast')
    const { episodes, loading, error } = usePodcastFeed();
    const [query, setQuery] = useState('');

    const filtered = useMemo(() => {
        if (!query.trim()) return episodes;
        const q = query.toLowerCase();
        return episodes.filter(ep =>
            ep.title.toLowerCase().includes(q) ||
            ep.summary?.toLowerCase().includes(q)
        )
    }, [episodes, query]);

    return (
        <main className='bg-brand-bg pt-24 pb-24 px-6'>
            <div className='mx-auto max-w-3xl'>
                {/* Header */}
                <h1 className='font-heading text-5xl text-center text-brand-text mb-6'>
                    Podcast
                </h1>

                {/* Show description */}
                <p className='text-center text-brand-text/60 max-w-xl mx-auto mb-10 leading-relaxed'>
                    Hosted by 2-time best-selling trauma author, Owl C Medicine. A veteran of the
                    US Military — no-nonsense tools for mental, physical, and relational health.
                </p>

                {/* Platform links */}
                <div className='flex justify-center gap-4 mb-12 flex-wrap'>
                    {[
                        { label: 'Apple Podcasts', href: 'https://podcasts.apple.com/podcast/id1594904790' },
                        { label: 'Spotify', href: 'https://open.spotify.com/show/4BsTYLvSUe6HOrkkMG4BqG' },
                        { label: 'Amazon Music', href: 'https://music.amazon.com/podcasts/825a6168-fe24-4c93-9912-410386400928' },
                    ].map(({ label, href }) => (
                        <a
                            key={label}
                            href={href}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-sm px-4 py-2 rounded-full border border-white/20
                                        text-brand-text/70 hover:border-brand-accent hover:text-brand-accent
                                        transition-colors duration-150'
                        >
                            {label}
                        </a>
                    ))}
                </div>

                {/* Search */}
                <div className='relative mb-8'>
                    <svg
                        className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text/40'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth={2}
                        viewBox='0 0 24 24'
                    >
                        <circle cx={11} cy={11} r={8} /><path d='m21 21-4.35-4.35' />
                    </svg>
                    <input
                        type='text'
                        placeholder='Search episodes...'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        className='w-full bg-white/5 border border-white/10 rounded-lg
                                    pl-10 pr-4 py-3 text-sm text-brand-text placeholder:text-brand-text/30
                                    focus:outline-none focus:border-brand-accent/50 transition-colors'
                    />
                </div>

                {/* Episode list */}
                {loading && (
                    <div className='space-y-6'>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className='flex gap-5 py-6 border-b border-white/10 animate-pulse'>
                                <div className='w-20 h-20 rounded-md bg-white/10 flex-shrink-0'/>
                                <div className='flex-1 space-y-2'>
                                    <div className='h-3 w-24 rounded bg-white/10'/>
                                    <div className='h-5 w-3/4 rounded bg-white/10'/>
                                    <div className='h-3 w-32 rounded bg-white/10'/>
                                    <div className='h-3 w-full rounded bg-white/10'/>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {error && (
                    <p className='text-center text-brand-text/50 py-12'>
                        Couldn't load episode. Try again later.
                    </p>
                )}

                {!loading && !error && filtered.length === 0 && (
                    <p className='text-center text-brand-text/50 py-12'>
                        No episodes match "{query}"
                    </p>
                )}

                {!loading && !error && (
                    <div>
                        {filtered.map((ep, i) => (
                            <EpisodeRow 
                                key={ep.id}
                                episode={ep}
                                isLatest={ i === 0 && !query}
                            />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Podcast;