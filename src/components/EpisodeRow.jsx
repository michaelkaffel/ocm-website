import { useNavigate } from 'react-router-dom';
import { formatDuration, formatDate } from '../hooks/usePodcastFeed';

const EpisodeRow = ({ episode, isLatest }) => {
    const navigate = useNavigate();

    const seasonLabel = episode.season
        ? `Season ${episode.season}${episode.episode ? ` · Ep ${episode.episode}` : ''}`
        : null;

    const excerpt = episode.summary
        ? episode.summary.replace(/Send us Fan Mail\s*/i, '').slice(0, 160).trim() + '...'
        : '';

    return (
        <button
            onClick={() => navigate(`/podcast/${episode.id}`)}
            className='w-full text-left flex gap-5 py-6 border-b border-white/10
                        hover:bg-white/5 transition-colors duration-150 px-3 -mx-3 rounded-lg'   
        >
            {/* Artwork */}
            <img 
                src={episode.artworkUrl}
                alt='Speak Plainly Podcast'
                className='w-20 h-20 flex-shrink-0 rounded-md object-cover'
            />

            {/* Content */}
            <div className='flex-1 min-w-0'>
                {/* Top meta row */}
                <div className='flex items-center gap-2 mb-1 flex-wrap'>
                    {isLatest && (
                        <span className='text-xs font-medium px-2 py-0.5 rounded bg-brand-accent/20 text-brand-accent border border-brand-accent/30'>
                            Latest
                        </span>
                    )}
                    {seasonLabel && (
                        <span className='text-xs text-brand-text/40 uppercase tracking-wide'>
                            {seasonLabel}
                        </span>
                    )}
                </div>

                {/* Title */}
                <h3 className='font-heading text-lg text-brand-text leading-snug mb-1 truncate'>
                    {episode.title}
                </h3>

                {/* Date + Duration */}
                <p className='text-sm text-brand-text/50 mb-2'>
                    {formatDate(episode.publishedAt)}
                    {episode.duration ? ` · ${formatDuration(episode.duration)}` : ''}
                </p>

                {/* Excerpt */}
                <p className='text-sm text-brand-text/60 line-clamp-2 hidden sm:block'>
                    {excerpt}
                </p>
            </div>
        </button>
    );
};

export default EpisodeRow;