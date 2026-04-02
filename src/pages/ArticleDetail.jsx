import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getArticleBySlug } from '../utils/articles';
import ShareButtons from '../components/ShareButtons';
import RecentPosts from '../components/RecentPosts';

const ArticleDetail = () => {
    const { slug } = useParams();
    const article = getArticleBySlug(slug);

    if (!article) {
        return (
            <main className='bg-brand-bg pt-28 pb-10 px-6'>
                <div className='mx-auto max-w-3xl text-center'>
                    <h1 className='font-heading text-4xl text-brand-text'>
                        Article Not Found
                    </h1>
                    <Link
                        to='/articles'
                        className='mt-6 inline-block text-brand-accent hover:opacity-80'
                    >
                        ← Back to Articles
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className='bg-brand-bg pt-5 pb-0 px-6'>
            <div className='mx-auto max-w-3xl text-right'>
                <Link
                    to='/articles'
                    className='text-sm text-brand-accent hover:opacity-80 font-sans'
                >
                    ← Back to Articles
                </Link>
            </div>

            <article className='mx-auto max-w-3xl pt-12'>
                <h1 className='mt-3 font-heading text-4xl leading-tight sm:text-5xl text-brand-text'>
                    {article.title}
                </h1>

                {article.category && (
                    <p className='mt-4 text-xs uppercase tracking-wider text-brand-accent font-sans'>
                        {article.category}
                    </p>
                )}

                <div className='mt-4 flex items-center justify-between text-xs text-brand-text/50 font-sans'>
                    <div className='flex items-center gap-4'>
                        {article.date && <span>{article.date}</span>}
                        {article.readTime && <span>{article.readTime}</span>}
                    </div>

                    <ShareButtons title={article.title} slug={slug} />
                </div>

                {article.thumbnail && (
                    <img
                        src={article.thumbnail}
                        alt={article.title}
                        className='mt-8 w-full rounded-lg object-cover max-h-80'
                    />
                )}

                <div className='mt-10 prose prose-invert prose-lg max-w-none
                    prose-headings:font-heading prose-headings:text-brand-text
                    prose-p:text-brand-text/80 prose-p:font-sans prose-p:leading-relaxed
                    prose-a:text-brand-accent prose-a:no-underline hover:prose-a:opacity-80
                    prose-strong:text-brand-text
                    prose-blockquote:border-brand-accent prose-blockquote:text-brand-text/70'
                >
                    <ReactMarkdown>{article.body}</ReactMarkdown>
                </div>
                <div className='pt-10'>
                    <ShareButtons title={article.title} slug={slug} />
                </div>

                <RecentPosts currentSlug={slug} />

                <div className='text-center pt-8 pb-10'>
                    <Link
                        to='/articles'
                        className='text-sm text-brand-accent hover:opacity-80 font-sans'
                    >
                        ← Back to Articles
                    </Link>
                </div>

            </article>
        </main>
    );
};

export default ArticleDetail;