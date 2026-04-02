import { Link } from 'react-router-dom'
import { getAllArticles } from '../utils/articles';
import ArticleCard from './ArticleCard';

const RecentPosts = ({ currentSlug }) => {
    const posts = getAllArticles()
        .filter((a) => a.slug !== currentSlug)
        .slice(0, 3);

    if (posts.length === 0) return null

    return (
        <section className='mt-10 border-t border-brand-text/10 pt-12'>
            <div className='flex items-center justify-between'>
                <h2 className='font-heading text-2xl text-brand-text'>
                    Recent Posts
                </h2>
                <Link
                    to='/articles'
                    className='text-sm font-semibold text-brand-accent hover:opacity-80'
                >
                    See All
                </Link>
            </div>

            <div className='mt-8 grid gap-8 sm-grid-cols-2 lg:grid-cols-3'>
                {posts.map((post) => (
                    <ArticleCard key={post.slug} article={post} compact />
                ))}
            </div>
        </section>
    );
};

export default RecentPosts;