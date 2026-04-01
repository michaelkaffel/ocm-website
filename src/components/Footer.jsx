const Footer = () => (
    <footer className='border-t border-brand-border bg-brand-surface'>
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
                        <rect x='2' y='2' width='20' height='20' rx='5' ry='5'/>
                        <circle cx='12' cy='12' r='4'/>
                        <circle cx='17.5' cy='6.5' r='1' fill='currentColor' stroke='none' />
                    </svg>
                </a>
            </div>

            <p className='text-brand-faint text-xs tracking-wide'>
                © {new Date().getFullYear()} Owl Chrysalis Medicine
            </p>
        </div>
    </footer>
)

export default Footer;