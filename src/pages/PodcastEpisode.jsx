import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePodcastFeed, formatDate, formatDuration } from '../hooks/usePodcastFeed';
import { toSlug } from '../utils/podcast';
import usePageTitle from '../hooks/usePageTitle';

const TABS = ['Show Notes', 'Chapters', 'Transcript']

const formatTimestamp = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`
}

const patchLinks = (html) =>
    html.replace(/<a\s/gi, '<a target="_blank" rel="noopener noreferrer" ');

const PodcastEpisode = () => {
    const { slug } = useParams();
    const { episodes, loading: feedLoading } = usePodcastFeed();
    const [activeTab, setActiveTab] = useState('Show Notes');
    const [transcript, setTranscript] = useState(null);
    const [chapters, setChapters] = useState(null);
    const [tabLoading, setTabLoading] = useState(false);
    const [tabError, setTabError] = useState(null);

    const episode = episodes.find(ep => toSlug(ep.title) === slug);

    usePageTitle(episode?.title ?? 'Episode')

    useEffect(() => {
        if (!episode) return;

        const loadTranscript = async () => {
            if (activeTab !== 'Transcript' || transcript || !episode.transcriptUrl) return;
            setTabLoading(true);
            setTabError(null)
            try {
                const r = await fetch(`/api/transcript?url=${encodeURIComponent(episode.transcriptUrl)}`);
                const data = await r.json();
                setTranscript(data);
            } catch (err) {
                console.log(err, err.message)
                setTabError('Could not load transcript.')
            } finally {
                setTabLoading(false);
            }
        }

        const loadChapters = async () => {
            if (activeTab !== 'Chapters' || chapters || !episode.chaptersUrl) return;
            setTabLoading(true);
            setTabError(null)
            try {
                const r = await fetch(`/api/chapters?url=${encodeURIComponent(episode.chaptersUrl)}`);
                const data = await r.json();
                setChapters(data)
            } catch (err) {
                console.log(err, err.message);
                setTabError('Could not load chapters.')
            } finally {
                setTabLoading(false);
            }
        }

        loadTranscript();
        loadChapters();
    }, [activeTab, episode])

    if (feedLoading) return <LoadingSkeleton />

    if (!episode) return (
        <main className='bg-brand-bg pt-24 pb-24 px-6 min-h-screen'>
            <div className='mx-auto max-w-3xl text-center'>
                <p className='text-brand-text/50 mb-4'>Episode not found.</p>
                <Link to='/podcast' className='text-brand-accent hover:underline text-sm'>
                    ← All Episodes
                </Link>
            </div>
        </main>
    )

    const seasonLabel = episode.season
        ? `Season ${episode.season}${episode.episode ? ` · Ep ${episode.episode}` : ''}`
        : null;

    return (
        <main className='bg-brand-bg pt-24 pb-24 px-6'>
            <div className='mx-auto max-w-3xl'>

                <Link
                    to='/podcast'
                    className='inline-flex items-center gap-1 text-sm text-brand-text/50
                                hover:text-brand-accent transition-colors mb-8'
                >
                    ← All Episodes
                </Link>

                <div className='flex gap-5 mb-8'>
                    <img
                        src={episode.artworkUrl}
                        alt='Speak Plainly Podcast'
                        className='w-24 h-24 flex-shrink-0 rounded-lg object-cover'
                    />
                    <div className='flex-1 min-w-0'>
                        {seasonLabel && (
                            <p className='text-xs text-brand-text/40 uppercase tracking-wide mb-1'>
                                {seasonLabel}
                            </p>
                        )}
                        <h1 className='font-heading text-2xl sm:text-3xl text-brand-text leading-snug mb-2'>
                            {episode.title}
                        </h1>
                        <p className='text-sm text-brand-text/50'>
                            {formatDate(episode.publishedAt)}
                            {episode.duration ? ` · ${formatDuration(episode.duration)}` : ''}
                        </p>
                    </div>
                </div>

                <div className='mb-8 rounded-lg overflow-hidden'>
                    <iframe
                        src={`https://www.buzzsprout.com/1877201/${episode.id}?client_source=small_player&iframe=true`}
                        loading='lazy'
                        width='100%'
                        height='200'
                        frameBorder='0'
                        scrolling='no'
                        title={episode.title}
                    />
                </div>

                <div className='flex border-b border-white/10 mb-6'>
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            onClick={() => { setActiveTab(tab); setTabError(null) }}
                            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 -mb-px
                                ${activeTab === tab
                                    ? 'border-brand-accent text-brand-accent'
                                    : 'border-transparent text-brand-text/50 hover:text-brand-text'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {tabLoading && (
                    <div className='space-y-3 animate-pulse'>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className='h-4 rounded bg-white/10'
                                style={{ width: `${90 - i * 8}%` }} />
                        ))}
                    </div>
                )}

                {tabError && (
                    <p className='text-brand-text/50 text-sm'>
                        {tabError}
                    </p>
                )}

                {!tabLoading && !tabError && activeTab === 'Show Notes' && (
                    <div
                        className='prose prose-invert prose-sm max-w-none
                            prose-a:text-brand-accent prose-a:no-underline
                            hover:prose-a:underline prose-p:text-brand-text/80
                            prose-headings:text-brand-text'
                        dangerouslySetInnerHTML={{ __html: patchLinks(episode.showNotes) }}
                    />
                )}

                {!tabLoading && !tabError && activeTab === 'Chapters' && (
                    <ChaptersTab chapters={chapters} hasUrl={!!episode.chaptersUrl} />
                )}

                {!tabLoading && !tabError && activeTab === 'Transcript' && (
                    <TranscriptTab transcript={transcript} hasUrl={!!episode.transcriptUrl} />
                )}
            </div>
        </main>
    );
};

const ChaptersTab = ({ chapters, hasUrl }) => {
    if (!hasUrl) return (
        <p className='text-brand-text/50 text-sm'>No chapters available for this episode.</p>
    );

    if (!chapters) return null;

    const list = chapters?.chapters ?? [];

    return (
        <ol className='space-y-1'>
            {list.map((ch, i) => (
                <li key={i} className='flex items-baseline gap-3 py-2 border-b border-white/5'>
                    <span className='text-xs text-brand-accent font-mono w-12 flex-shrink-0'>
                        {formatTimestamp(ch.startTime)}
                    </span>
                    <span className='text-brand-text/80 text-sm'>{ch.title}</span>
                </li>
            ))}
        </ol>
    );
};

const TranscriptTab = ({ transcript, hasUrl }) => {
    if (!hasUrl) return (
        <p className='text-brand-text/50 text-sm'>No transcript available for this episode.</p>
    )
    if (!transcript) return null;

    const segments = transcript?.segments ?? [];

    const blocks = segments.reduce((acc, seg) => {
        const last = acc[acc.length - 1];
        if (last && last.speaker === seg.speaker) {
            last.lines.push(seg.body)
        } else {
            acc.push({ speaker: seg.speaker, startTime: seg.startTime, lines: [seg.body] })
        };
        return acc
    }, []);

    return (
        <div className='space-y-6'>
            {blocks.map((block, i) => (
                <div key={i} className='border-b border-white/5 pb-4'>
                    <div className='flex items-center gap-3 mb-1'>
                        <span className='text-xs font-mono text-brand-accent'>
                            {formatTimestamp(block.startTime)}
                        </span>
                        <span className='text-xs text-brand-text/40 uppercase tracking-wide'>
                            {block.speaker}
                        </span>
                    </div>
                    <p className='text-brand-text/75 text-sm leading-relaxed'>
                        {block.lines.join(' ')}
                    </p>
                </div>
            ))}
        </div>
    );
};

const LoadingSkeleton = () => (
    <main className='bg-brand-bg pt-24 pb-24 px-6'>
        <div className='mx-auto max-w-3xl animate-pulse space-y-6'>
            <div className='h-4 w-24 rounded bg-white/10' />
            <div className='flex gap-5'>
                <div className='w-24 h-24 rounded-lg bg-white/10 flex-shrink-0' />
                <div className='flex-1 space-y-3 pt-1'>
                    <div className='h-3 w-20 rounded bg-white/10' />
                    <div className='h-7 w-3/4 rounded bg-white/10' />
                    <div className='h-3 w-32 rounded bg-white/10' />
                </div>
            </div>
            <div className='h-48 rounded-lg bg-white/10' />
        </div>
    </main>
);

export default PodcastEpisode;