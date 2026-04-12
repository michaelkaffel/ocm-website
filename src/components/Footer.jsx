import SubscribeForm from './SubscribeForm';

const Footer = () => (
    <footer className='border-t border-brand-border bg-brand-surface'>
        <div className='mt-10 w-full'>
            <div className='w-[50%] mx-auto'>
                <h3 className='text-white text-center font-semibold mb-3 text-sm uppercase tracking-widest'>
                    Get notified when new articles drop!
                </h3>
                <SubscribeForm />
            </div>
        </div>


        <div className='max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6'>

            <span className='font-heading text-sm tracking-widest2 uppercase text-brand-muted'>
                Owl C Medicine
            </span>

            <div className='flex items-center gap-6'>
                <a
                    href='https://www.facebook.com/owlchrysalismedicine/'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='Facebook'
                    className='text-brand-muted hover:text-brand-accent transition-colors duration-200'
                >
                    <svg width='18' height='18' viewBox='0 0 24 24' fill='currentColor'>
                        <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
                    </svg>
                </a>
                <a
                    href='https://www.instagram.com/owlcmedicine/'
                    target='_blank'
                    rel='noreferrer'
                    aria-label='Instagram'
                    className='text-brand-muted hover:text-brand-accent transition-colors duration-200'
                >
                    <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                        <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
                        <circle cx='12' cy='12' r='4' />
                        <circle cx='17.5' cy='6.5' r='1' fill='currentColor' stroke='none' />
                    </svg>
                </a>
                <a
                    href='https://www.youtube.com/@OwlCMedicine'
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label='Youtube'
                    className='text-brand-text/60 transition-colors hover:text-brand-accent'
                >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-6 w-6'>
                        <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z' />
                    </svg>
                </a>
            </div>

            <div className='flex flex-col text-brand-faint text-center text-xs md:text-right'>
                <p className=' tracking-wide'>
                    © {new Date().getFullYear()} Owl Chrysalis Medicine
                </p>
                <p className='ml-2'>
                    Built by{' '}
                    <a
                        href='https://michaelkaffel.com'
                        target='_blank' rel='noreferrer'
                        className='hover:text-brand-accent underline'
                    >
                        Michael Kaffel
                    </a>
                </p>
                <p className='ml-2'>
                    Photos by{' '}
                    <a
                        href='https://www.instagram.com/teren_o/'
                        target='_blank' rel='noreferrer'
                        className='hover:text-brand-accent underline'
                    >
                        Teren Oddo
                    </a>

                </p>
            </div>


        </div>
    </footer>
)

export default Footer;