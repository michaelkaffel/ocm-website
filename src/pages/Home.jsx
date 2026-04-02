import { Link } from 'react-router-dom';
import heroImage from '../assets/omc-hero.png';
import bookCover from '../assets/book.png';
import podcastArt from '../assets/podcast-graphic.png'
import { getAllArticles } from '../utils/articles';
import ArticleCard from '../components/ArticleCard';

const latestArticles = getAllArticles().slice(0, 3);

const CALENDLY_URL = 'https://calendly.com/owlmedicine/15min';
const APPLE_EMBED_URL = 'https://embed.podcasts.apple.com/us/podcast/speak-plainly-podcast/id1594904790';
const SPOTIFY_URL = 'https://open.spotify.com/show/4BsTYLvSUe6HOrkkMG4BqG';
const APPLE_URL = 'https://podcasts.apple.com/us/podcast/speak-plainly-podcast/id1594904790';

const Home = () => {
    return (
        <main>
            {/* ── Hero ──────────────────────── */}
            <section
                id='hero'
                className='relative flex min-h-screen flex-col lg:flex-row lg:items-center overflow-hidden bg-brand-bg'
            >
                <div className='relative z-10 w-full px-6 pt-32 pb-8 lg:w-1/2 lg:pt-40 lg:pb-12 lg:pr-8'>
                    <h1 className='font-heading text-5xl leading-tight sm:text-6xl lg:text-7xl text-brand-text'>
                        Owl Chrysalis
                        <br />
                        Medicine
                    </h1>
                    <p className='mt-6 max-w-lg text-lg leading-relaxed text-brand-text/80 font-sans'>
                        Guiding you through deep transformation — body, mind, and spirit.
                    </p>
                </div>

                <div className='mt-auto flex items-end justify-center lg:bottom-0 lg:right-0 lg:h-full lg:w-1/2 lg:justify-end'>
                    <img
                        src={heroImage}
                        alt='Portrait of Owl Chrysalis Medicine'
                        className='h-auto w-full max-w-md lg:max-w-lg lg:h-[90%] object-contain object-bottom'
                    />
                </div>
            </section>


            {/* ── Podcast ──────────────────────── */}
            <section
                id='podcast' className='py-24 px-6 bg-brand-surface'
            >
                <div className='mx-auto max-w-5xl'>
                    <h2 className='font-heading text-4xl text-center text-brand-text'>
                        Podcast
                    </h2>

                    <div className='mt-12 grid gap-12 lg:grid-cols-2 items-start'>
                        {/* ── Left - description + platform badges */}
                        <div className='flex flex-col items-center text-center lg:items-start lg:text-left'>

                            <div className='flex flex-col items-center text-center lg:items-start lg:text-left'>
                                <img
                                    src={podcastArt}
                                    alt='Speak Plainly Podcast show art'
                                    className='w-full max-w-xs rounded-lg'
                                />
                            </div>

                            <p className='mt-6 max-w-md text-lg leading-relaxed text-brand-text/80 font-sans'>
                                Placeholder podcast description — replace with the clients&apos;s show tagline and summary
                            </p>

                            <p className='mt-8 text-sm uppercase tracking-[0.2em] text-brand-accent font-sans font-semibold'>
                                Subscribe Today
                            </p>

                            <div className='mt-4 flex gap-4'>
                                <a
                                    href={APPLE_URL}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label='Listen on Apple Podcasts'
                                    className='flex h-12 w-12 items-center justify-center rounded-full bg-brand-bg transition-opacity hover:opacity-80'
                                >
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6 text-[#b150e2]'>
                                        <path d='M12 2C6.477 2 2 6.477 2 12c0 3.07 1.386 5.813 3.563 7.645.15.127.35.078.434-.1a5.77 5.77 0 0 1-.247-1.695c0-.575.088-1.13.247-1.655a.272.272 0 0 0-.102-.295A7.96 7.96 0 0 1 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8a7.96 7.96 0 0 1-1.895 5.145.272.272 0 0 0-.102.295c.16.525.247 1.08.247 1.655 0 .585-.088 1.15-.247 1.695.084.178.284.227.434.1C20.614 17.813 22 15.07 22 12c0-5.523-4.477-10-10-10Zm0 4a6 6 0 0 0-4.68 9.74.3.3 0 0 0 .47-.01c.37-.43.8-.8 1.28-1.1a.3.3 0 0 0 .1-.38A3.98 3.98 0 0 1 8 12a4 4 0 1 1 7.83 1.25.3.3 0 0 0 .1.38c.48.3.91.67 1.28 1.1a.3.3 0 0 0 .47.01A6 6 0 0 0 12 6Zm0 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 5.5c-1.38 0-2.5 1.12-2.5 2.5v1.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V18c0-1.38-1.12-2.5-2.5-2.5Z' />
                                    </svg>
                                </a>
                                <a
                                    href={SPOTIFY_URL}
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    aria-label='Listen on Spotify'
                                    className='flex h-12 w-12 items-center justify-center rounded-full bg-brand-bg transition-opacity hover:opacity-80'
                                >
                                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6 text-[#1DB954]'>
                                        <path d='M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4.586 14.424a.623.623 0 0 1-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 1 1-.277-1.216c3.808-.87 7.076-.496 9.712 1.116a.623.623 0 0 1 .207.857Zm1.224-2.722a.78.78 0 0 1-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 0 1-.452-1.493c3.632-1.102 8.147-.568 11.232 1.33a.78.78 0 0 1 .257 1.072Zm.105-2.835C14.692 8.95 9.375 8.775 6.297 9.71a.935.935 0 1 1-.543-1.79c3.532-1.072 9.404-.865 13.115 1.338a.935.935 0 0 1-1.054 1.544l.1.064Z' />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Right — Apple Podcasts Embed */}
                        <div className='flex justify-center lg:justify-end'>
                            <iframe
                                src={APPLE_EMBED_URL}
                                allow='autoplay *; encrypted-media *; fullscreen *; clipboard-write'
                                sandbox='allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation'
                                title='Owl Chrysalis Medicine podcast on Apple Podcasts'
                                className='w-full max-w-[360px] h-[450px] rounded-xl border-0 bg-transparent'
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Book ──────────────────────── */}
            <section id='book' className='py-24 px-6 bg-brand-bg'>
                <div className='mx-auto max-w-5xl'>
                    <h2 className='font-heading text-4xl text-center text-brand-text'>
                        Rethinking Broken
                    </h2>

                    <div className='mt-12 flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-center lg:gap-16'>
                        <img
                            src={bookCover}
                            alt='Rethinking Broken book cover'
                            className='h-80 w-auto rounded-lg shadow-lg'
                        />
                        <div className='max-w-md text-center lg:text-left'>
                            <p className='text-lg leading-relaxed text-brand-text/80 font-sans'>
                                Placeholder description of <em>Rethinking Broken</em> — replace
                                with the book summary or pull quote.
                            </p>
                            <a
                                href='https://rethinkingbroken.com'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='mt-6 inline-block rounded bg-brand-accent px-8 py-3 text-sm font-semibold uppercase tracking-wider text-brand-text transition-opacity hover:opacity-90'
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Coaching ──────────────────────── */}
            <section id='coaching' className='py-24 px-6 bg-brand-surface'>
                <div className='mx-auto max-w-3xl text-center'>
                    <h2 className='font-heading text-4xl text-brand-text'>Coaching</h2>

                    <p className='mt-6 text-lg leading-relaxed text-brand-text/80 font-sans'>
                        Placeholder coaching offer summary — replace with the client&apos;s
                        description of their coaching services, who they help, and what
                        transformation looks like.
                    </p>

                    <a
                        href={CALENDLY_URL}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='mt-8 inline-block rounded bg-brand-accent px-8 py-3 text-sm font-semibold uppercase tracking-wider text-brand-text transition-opacity hover:opacity-90'
                    >
                        Book a Free 15-Min Call
                    </a>
                </div>
            </section>

            {/* ── Articles ──────────────────────── */}
            <section id='articles' className='py-24 px-6 bg-brand-bg'>
                <div className='mx-auto max-w-5xl'>
                    <h2 className='font-heading text-4xl text-center text-brand-text'>
                        Articles
                    </h2>

                    <div className='mt-12 grid gap-8 lg:grid-cols-3'>
                        {latestArticles.map((article) => (
                            <ArticleCard key={article.slug} article={article}/>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── About ──────────────────────── */}
            <section id='about' className='py-24 px-6 bg-brand-surface'>
                <div className='mx-auto max-w-3xl text-center'>
                    <h2 className='font-heading text-4xl text-brand-text'>About</h2>

                    <p className='mt-6 text-lg leading-relaxed text-brand-text/80 font-sans'>
                        Placeholder bio blurb — replace with the client&apos;s short
                        biography, background, credentials, and personal story. Two to three
                        paragraphs works well here.
                    </p>
                </div>
            </section>

            {/* ── Contact ──────────────────────── */}
            <section id='contact' className='py-24 px-6 bg-brand-bg'>
                <div className='mx-auto max-w-xl'>
                    <h2 className='font-heading text-4xl text-center text-brand-text'>
                        Contact
                    </h2>

                    <form
                        className='mt-12 flex flex-col gap-5'
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label className='flex flex-col gap-1'>
                            <span className='text-sm uppercase tracking-wider text-brand-text/60 font-sans'>
                                Name
                            </span>
                            <input
                                type='text'
                                name='name'
                                required
                                className='rounded border border-brand-text/20 bg-brand-surface px-4 py-3 text-brand-text font-sans placeholder:text-brand-text/30 focus:border-brand-accent focus:outline-none'
                            />
                        </label>

                        <label className='flex flex-col gap-1'>
                            <span className='text-sm uppercase tracking-wider text-brand-text/60'>
                                Email
                            </span>
                            <input
                                type='email'
                                name='email'
                                required
                                className='rounded border border-brand-text/20 bg-brand-surface px-4 py-3 text-brand-text font-sans placeholder:text-brand-text/30 focus:border-brand-accent focus:outline-none'
                                placeholder='you@email.com'
                            />
                        </label>

                        <label className='flex flex-col gap-1'>
                            <span className='text-sm uppercase tracking-wider text-brand-text/60 font-sans'>
                                Message
                            </span>
                            <textarea
                                name='message'
                                rows={5}
                                required
                                className='rounded border border-brand-text/20 bg-brand-surface px-4 py-3 text-brand-text font-sans placeholder:text-brand-text/30 focus:border-brand-accent focus:outline-none resize-y'
                                placeholder='How can i help?'
                            />
                        </label>

                        <button
                            type='submit'
                            className='mt-2 self-start rounded bg-brand-accent px-8 py-3 text-sm font-semibold uppercase tracking-wider text-brand-text transition-opacity hover:opacity-90'
                        >
                            Send Message
                        </button>
                    </form>

                    {/* Social links */}
                    {/* <div className='mt-12 flex justify-center gap-6'>
                        <a
                            href='#'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='Facebook'
                            className='text-brand-text/60 transition-colors hover:text-brand-accent'
                        >
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
                                <path d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z' />
                            </svg>
                        </a>
                        <a
                            href='#'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='Instagram'
                            className='text-brand-text/60 transition-colors hover:text-brand-accent'
                        >
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
                                <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z' />
                            </svg>
                        </a>
                        <a
                            href='#'
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='Youtube'
                            className='text-brand-text/60 transition-colors hover:text-brand-accent'
                        >
                            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
                                <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z' />
                            </svg>
                        </a>
                    </div> */}
                </div>
            </section>
        </main>
    );
};

export default Home;