import aboutHero from '../assets/about-hero.png';
import usePageTitle from '../hooks/usePageTitle'

const About = () => {
    usePageTitle('About')

    return (
        <main className='min-h-screen bg-brand-bg text-brand-text'>
            {/* ── Bio ── */}
            <section className='px-6 pt-32 pb-20 md:pt-40 md:pb-28 max-w-5xl mx-auto'>
                <div className='flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16'>

                    {/* Left — portrait */}
                    <div className='flex-shrink-0 flex justify-center lg:justify-start'>
                        <img
                            src={aboutHero}
                            alt='Owl Chrysalis Medicine'
                            className='w-72 md:w-80 rounded-lg object-cover'
                        />
                    </div>

                    {/* Right — text */}
                    <div className='flex flex-col gap-6 font-sans text-lg leading-relaxed'>
                        <p>
                            I&rsquo;m Owl &mdash; coach, author, health educator, podcast host,
                            and integrative medicine enthusiast. I help people reach health
                            physically, mentally, and emotionally. Helping others cultivate and
                            restore joy through health is my passion.
                        </p>

                        <p>
                            I&rsquo;m a former Air Force combat medic and nurse with over 13
                            years of diverse clinical experience. After leaving military service,
                            I received advanced training in Emergency Medicine, Osteopathy, and
                            Cranio-Sacral therapy, and went on to study Acupuncture and Chinese
                            Herbology in San Diego. I learned both branches of osteopathy from
                            two incredible D.O.&rsquo;s.
                        </p>

                        <p>
                            I&rsquo;m also a certified IIN Health Coach, and have spent years
                            integrating multiple disciplines &mdash; biomedical, energetic, and
                            somatic &mdash; into a practical, minimally invasive approach to
                            care. My toolkit includes allopathic medicine, acupuncture, Chinese
                            herbology, osteopathy, cranio-sacral therapy, breathwork, cupping,
                            moxibustion, and manual lymph drainage.
                        </p>

                        <p>
                            Each summer I freelance as a physio for circus acrobats at the peak
                            of their careers, and I volunteer serving refugees seeking asylum to
                            the US. My work is rooted in lived experience &mdash; I&rsquo;ve
                            been poor, homeless, worked in hospitals, and trained across both
                            Eastern and Western systems. Today I run two businesses that reflect
                            my core values: honesty, resilience, and community care.
                        </p>

                        <p>
                            I focus on helping people integrate trauma and chronic stress through
                            personalized coaching, Chinese Medicine, and
                            neurobiology-informed tools.
                        </p>

                        <blockquote className='border-l-2 border-brand-accent pl-6 italic text-brand-text/70 mt-2'>
                            Poor health makes paupers of us all.
                            <cite className='block not-italic text-sm mt-2 text-brand-text/50 tracking-wider uppercase'>
                                &mdash; Owl C. Medicine
                            </cite>
                        </blockquote>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;