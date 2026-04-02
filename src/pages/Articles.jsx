import { Link } from 'react-router-dom';
import { getAllArticles } from '../utils/articles';
import ArticleCard from '../components/ArticleCard';

const articles = getAllArticles();

const Articles = () => {
    return (
        <main className='bg-brand-bg pt-28 pb-24 px-6'>
            <div className='mx-auto max-w-5xl'>
                <h1 className='font-heading text-5xl text-center text-brand-text'>
                    Articles
                </h1>

                <div className='mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                    {articles.map((article) => (
                        <ArticleCard  key={article.slug} article={article} />
                    ))}
                </div>
            </div>
        </main>
    )
}
export default Articles;