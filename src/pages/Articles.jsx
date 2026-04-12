import { getAllArticles } from '../utils/articles';
import ArticleCard from '../components/ArticleCard';
import usePageTitle from '../hooks/usePageTitle';
import SubscribeForm from '../components/SubscribeForm';

const articles = getAllArticles();


const Articles = () => {
    usePageTitle('Articles')

    return (
        <main className='bg-brand-bg pt-24 pb-24 px-6'>
            <div className='mx-auto max-w-5xl'>
                <h1 className='font-heading text-5xl text-center text-brand-text'>
                    Articles
                </h1>
                <div className='mt-10 w-full'>
                    <div className='w-[50%] mx-auto'>
                        <SubscribeForm />
                    </div>
                </div>

                <div className='mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                    {articles.map((article) => (
                        <ArticleCard key={article.slug} article={article} />
                    ))}
                </div>
            </div>
        </main >
    )
}
export default Articles;