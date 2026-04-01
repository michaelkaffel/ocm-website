/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                brand: {
                    bg:         'var(--color-bg)',
                    surface:    'var(--color-surface)',
                    border:     'var(--color-border)',
                    accent:     'var(--color-accent)',
                    'accent-hover': 'var(--color-accent-hover)',
                    text:       'var(--color-text)',
                    muted:      'var(--color-muted)',
                    faint:      'var(--color-faint)'
                },
            },
            fontFamily: {
                heading: 'var(--font-heading)',
                body:    'var(--font-body)',
            },
            letterSpacing: {
                widest2: '0.2em',
            },
        },
    },
    plugins: [],
}

