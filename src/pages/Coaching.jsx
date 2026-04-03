import coachingHero from '../assets/coaching-hero.png'
import usePageTitle from '../hooks/usePageTitle';

const CALENDLY_URL = 'https://calendly.com/owlmedicine/15min';

const Coaching = () => {
    usePageTitle('Coaching');

    return (
        <main className='min-h-screen bg-brand-bg text-brand-text'>
            {/* —— Hero —— */}

            <section className='relative flex min-h-screen flex-col lg:flex-row lg:items-center overflow-hiddenbg-brand-bg'>
                <div className='relative z-10 w-full px-6 pt-32 pb-8 lg:w-1/2 lg:pt-40 lg:pb-12 lg:pr-8'>
                    <h1 className='font-heading text-5xl leading-tight sm:text-6xl lg:text-7xl text-brand-accent'>
                        Trust &amp; Accountability
                    </h1>

                    <p className='mt-6 max-w-lg text-lg leading-relaxed text-brand-text/80 font-sans'>
                        I use my extensive and diverse background to show people that the
                        natural state of the human body is health. Let me be a partner on your
                        health journey.
                    </p>
                </div>

                <div className='mt-auto flex items-end justify-center lg:bottom-0 lg:right-0 lg:h-full lg:w-1/2 lg:justify-end'>
                    <img 
                        src={coachingHero}
                        alt='Coaching with Owl Chrysalis Medicine'
                        className='h-auto w-full max-w-md lg:max-w-lg lg:h-[90%] object-contain object-bottom'
                    />
                </div>

            </section>

            {/* ── What I Can Do For You ── */}
            <section className='px-6 py-16 md:py-20 max-w-3xl mx-auto'>
                <h2 className='font-heading text-3xl md:text-4xl text-brand-accent mb-6'>
                    What I Can Do for You
                </h2>

                <p className='font-sans text-lg leading-relaxed mb-6'>
                    My specialty as a health coach is finding alternative, minimally
                    invasive and creative ways to accomplish the goals you and your
                    provider have agreed to be best for you.
                </p>

                <p className='font-sans text-lg leading-relaxed mb-6'>
                    I use my 13 years of diverse experience, knowledge and expertise to
                    help you pick a path that will work best for you to achieve your health
                    goals and beyond.
                </p>

                <p className='font-sans text-lg leading-relaxed mb-6'>
                    Whether you want to recover from a surgery, prevent a surgery, lose
                    weight, control pre-diabetes or build physical therapy programs after
                    insurance cuts you off &mdash; let me help you achieve your health
                    goals.
                </p>
            </section>

            {/* ── What Is a Health Coach? ── */}
            <section className='px-6 py-16 md:py-20 max-w-3xl mx-auto'>
                <h2 className='font-heading text-3xl md:text-4xl text-brand-accent mb-6'>
                    What Is a Health Coach
                </h2>

                <p className='font-sans text-lg leading-relaxed mb-6'>
                    A health coach fills in the gaps between what happens at the
                    doctor&rsquo;s office and real life. Think of your coach as a partner
                    for your health. We help clients find practical ways to achieve the
                    goals you&rsquo;ve created with your provider.
                </p>

                <h3 className='font-heading text-2xl md:text-3xl text-brand-accent mb-4'>
                    Who Hires Coaches?
                </h3>

                <p className='font-sans text-lg leading-relaxed'>
                    Everybody does! I&rsquo;ve helped everyone from personal trainers to
                    corporate executives, flight attendants, photographers, private
                    contractors, auto-mechanics, retirees, single parents and hopefully
                    you lead healthier lives.
                </p>
            </section>

            {/* ── Why I Became a Coach ── */}
            <section className='px-6 py-16 md:py-20 max-w-3xl mx-auto'>
                <h2 className='font-heading text-3xl md:text-4xl text-brand-accent mb-6'>
                    Why I Became a Coach
                </h2>

                <p className='font-sans text-lg leading-relaxed mb-6'>
                    Doctor visits are getting shorter and shorter, leaving less and less
                    time for providers to explain hospital policies, procedures, standards
                    of practice, alternative options or the logic behind any of these
                    things. That&rsquo;s where a coach comes in.
                </p>

                <p className='font-sans text-lg leading-relaxed'>
                    As a coach, I take the time to explain what your provider may have left
                    out, skipped over or just not had time to explain &mdash; so you can
                    make informed decisions for yourself. I often play medical jargon
                    translator and patient advocate.
                </p>
            </section>

            {/* ── What I Help Clients Do ── */}
            <section className='px-6 py-16 md:py-20 max-w-3xl mx-auto'>
                <h2 className='font-heading text-3xl md:text-4xl text-brand-accent mb-6'>
                    What I Help Clients Do
                </h2>

                <p className='font-sans text-lg leading-relaxed'>
                    I&rsquo;ve helped clients prep for gastric sleeve surgery, pursue safe
                    medical tourism for affordable care abroad, learn to cope with their
                    ADHD, control type 2 diabetes, avoid &ldquo;unavoidable&rdquo;
                    surgeries and seek out second and third opinions.
                </p>
            </section>

            {/* ── CTA ── */}
            <section className='px-6 py-20 md:py-28 max-w-3xl mx-auto text-center'>
                <h2 className='font-heading text-3xl md:text-4xl text-brand-accent mb-6'>
                    I Can Help You
                </h2>

                <p className='font-sans text-lg leading-relaxed mb-10'>
                    If you want an experienced medical professional you can trust by your
                    side every step of the way &mdash; if you could use some
                    accountability with your health goals &mdash; book your free 15-minute
                    health history. I offer this no-cost consultation to evaluate if health
                    coaching is the right fit for you. No strings attached.
                </p>

                <a
                    href={CALENDLY_URL}
                    target='_blank'
                    rel='nopener noreferrer'
                    className='inline-block bg-brand-accent text-brand-text font-heading text-xl
                                tracking-widest2 uppercase px-10 py-4 rounded
                                hover:brightness-110 transition-all duration-300'
                >
                    Book Your Free Call
                </a>
            </section>
        </main >
    );
};
export default Coaching;