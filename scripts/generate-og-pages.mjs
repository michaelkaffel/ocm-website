import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const articlesDir = path.resolve(__dirname, '../src/content/articles');
const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

const SITE_URL = 'https://owlchrysalismedicine.com';
const SITE_NAME = 'Owl Chrysalis Medicine';
const DEFAULT_IMAGE = `${SITE_URL}/images/og-default.png`;

// ——— Helpers ———

const parseFrontmatter = (content) => {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return null;

    const fm = {};

    match[1].split('\n').forEach((line) => {
        const i = line.indexOf(':');
        if (i === -1) return;
        fm[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
    });
    return fm;
};

const extractDescription = (content) => {
    const body = content.replace(/^---\n[\s\S]*?\n---\n*/, '');
    const plain = body
        .replace(/#{1,6}\s+/g, '')
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
        .replace(/\n+/g, ' ')
        .trim();
    return plain.length > 160 ? plain.slice(0, 157) + '...' : plain;
};

const resolveImage = (thumbnail) => {
    if (!thumbnail) return DEFAULT_IMAGE;
    if (thumbnail.startsWith('http')) return thumbnail;
    return `${SITE_URL}${thumbnail.startsWith('/') ? '' : '/'}${thumbnail}`
};

const injectOgTags = (html, { title, description, image, url }) => {
    let result = html;

    // Replace <title>
    result = result.replace(
        /<title>[^<]*<\/title>/,
        `<title>${title} | ${SITE_NAME}</title>`
    )

    // Remove existing og: and twitter: meta tags
    result = result.replace(
        /<meta\s+property="og:[^"]*"\s+content="[^"]*"\s*\/?>\n?/g,
        ''
    );
    result = result.replace(
        /<meta\s+name="twitter:[^"]*"\s+content="[^"]*"\s*\/?>\n?/g,
        ''
    );
    result = result.replace(
        /<meta\s+name="description"\s+content="[^"]*"\s*\/?>\n?/g,
        ''
    );

    const safeTitle = title.replace(/[""\u201C\u201D]/g, '&quot;');
    const safeDesc = description.replace(/[""\u201C\u201D]/g, '&quot;');

    // Inject fresh tags before </head>
    const ogBlock = `
    <meta name="description" content="${safeDesc}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${image}" />
  `;

    result = result.replace('</head>', `${ogBlock}\n  </head>`);
    return result;

};

const writePage = (routePath, ogData) => {
    const dir = path.join(distDir, routePath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
        path.join(dir, 'index.html'),
        injectOgTags(templateHtml, ogData)
    );
};

// ——— Static Pages ———

const staticPages = [
    {
        route: 'about',
        title: 'About',
        description: 'Learn about Owl Chrysalis Medicine and the work of transformational coaching.',
    },
    {
        route: 'coaching',
        title: 'Coaching',
        description: 'Book a free 15-minute discovery call to explore transformational coaching.',
    },
    {
        route: 'articles',
        title: 'Articles',
        description: 'Essays on grief, identity, self-awareness, and the human experience.',
    },
];

let count = 0;

staticPages.forEach(({ route, title, description }) => {
    writePage(route, {
        title,
        description,
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/${route}`,
    });
    count++;
});

// ——— Article Pages ———

const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith('.md'));

files.forEach((file) => {
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
    const fm = parseFrontmatter(content);
    if (!fm?.slug) return;

    writePage(`articles/${fm.slug}`, {
        title: fm.title || '',
        description: extractDescription(content),
        image: resolveImage(fm.thumbnail),
        url: `${SITE_URL}/articles/${fm.slug}`,
    });
    count++;
});

console.log(`Generated ${count} OG-injected pages in dist/`);