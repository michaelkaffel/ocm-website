import { Link } from 'react-router-dom';

const ArticleCard = ({article, compact = false}) => {
    const categories = article.category
        ? article.category.split(',').map((c) => c.trim()).filter(Boolean).slice(0, 3)
        : [];

    return (
        <Link
            to={`/articles/${article.slug}`}
            className='group flex flex-col rounded-lg bg-brand-surface overflow-hidden transition-transform hover:-translate-y-1'
        >
            {article.thumbnail && (
                <img
                    src={article.thumbnail}
                    alt={article.title}
                    className={`w-full object-cover ${compact ? 'h-64 lg:h-36' : 'h-72 lg:h-40'}`}
                />
            )}
            <div className='flex flex-col flex-grow p-6'>
                {categories.length > 0 && (
                    <p className='text-xs uppercase tracking-wider text-brand-accent font-sans truncate'>
                        {categories.join(', ')}
                    </p>
                )}
                <h3 className={`mt-2 font-heading text-brand-text ${compact ? 'text-lg line-clamp-2' : 'text-xl'}`}>
                    {article.title}
                </h3>
                {!compact && (
                    <div className='mt-auto flex items-center justify-between pt-4'>
                        <p className='text-xs text-brand-text/50 font-sans'>
                            {article.readTime} min read
                        </p>
                        <span className='text-sm font-semibold text-brand-accent transition-opacity group-hover:opacity-80'>
                            Read More →
                        </span>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default ArticleCard;