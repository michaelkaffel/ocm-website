import { useState } from 'react';

const ShareButtons = ({ title, slug }) => {
    const [copied, setCopied]  = useState(false);
    const url = `https://owlchrysalismedicine.com/articles/${slug}`;
    const encoded = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.log(err, err.message)
        }
    };

    return (
        <div className='flex items-center gap-4'>
            <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encoded}`}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Share on Facebook'
                className='text-brand-text/50 transition-colors hover:text-brand-text'
            >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-5 w-5'>
                    <path d='M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12Z' />
                </svg>
            </a>
            <a
                href={`https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Share on X'
                className='text-brand-text/50 transition-colors hover:text-brand-text'
            >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-5 w-5'>
                    <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
            </a>
            <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`}
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Share on LinkedIn'
                className='text-brand-text/50 transition-colors hover:text-brand-text'
            >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='h-5 w-5'>
                    <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                </svg>
            </a>
            <button
                onClick={handleCopy}
                aria-label='Copy Link'
                className='text-brand-text/50 transition-colors hover:text-brand-text'
            >
                {copied ? (
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='h-5 w-5'>
                        <polyline points='20 6 9 17 4 12'/>
                    </svg>
                ) : (
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='h-5 w-5'>
                        <path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
                        <path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default ShareButtons;