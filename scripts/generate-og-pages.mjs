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
const RSS_URL = 'https://feeds.buzzsprout.com/1877201.rss';

// ——— Helpers ———

const toSlug = (title) => 
    title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|$/g, '');

const decodedEntities = (str) => 
    str
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');


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

// ——— HTML injection ———

const injectOgTags = (html, { title, description, image, url, type = 'website' }) => {
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
    result = result.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>\n?/g, '')

    const safeTitle = title.replace(/[""\u201C\u201D]/g, '&quot;');
    const safeDesc = description.replace(/[""\u201C\u201D]/g, '&quot;');

    // Inject fresh tags before </head>
    const ogBlock = `
    <link rel="canonical" href="${url}" />
    <meta name="description" content="${safeDesc}" />
    <meta property="og:title" content="${safeTitle}" />
    <meta property="og:description" content="${safeDesc}" />
    <meta property="og:image" content="${image}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:site_name" content="${SITE_NAME}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${safeTitle}" />
    <meta name="twitter:description" content="${safeDesc}" />
    <meta name="twitter:image" content="${image}" />
  `;

    result = result.replace('</head>', `${ogBlock}\n  </head>`);
    return result;

};

// Subdirectory pages (about, coaching, articles/:slug, etc.)

const writePage = (routePath, ogData) => {
    const dir = path.join(distDir, routePath);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(
        path.join(dir, 'index.html'),
        injectOgTags(templateHtml, ogData)
    );
};

// ——— RSS fetch ———

const fetchEpisodes = async () => {
    const res = await fetch(RSS_URL);
    const xml = await res.text();
    const episodes = [];

    const items = xml.match(/<item>([\s\S]*?)<\/item>/g) || [];
    items.forEach((item) => {
        const titleMatch =
            item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
            item.match(/<title>(.*?)<\/title>/);
        const descMatch = 
            item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/) ||
            item.match(/<description>([\s\S]*?)<\/description>/);
        const imageMatch = item.match(/itunes:image\s+href="([^"]+)"/);

        if (!titleMatch?.[1]) return;

        const title = decodedEntities(titleMatch[1].trim());
        const slug = toSlug(title);
        const rawDesc = descMatch
            ? descMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim()
            : '';
        const description = rawDesc.length > 160 ? rawDesc.slice(0, 157) + '...' : rawDesc;
        const image = imageMatch ? imageMatch[1] : DEFAULT_IMAGE;

        episodes.push({ title, slug, description, image });
    });

    return episodes;
};

const buildSitemap = (urls) => {
    const entries = urls.map(({ loc, priority }) => `
    <url>
        <loc>${loc}</loc>
        <changefreq>weekly</changefreq>
        <priority>${priority}</priority>
    </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`;
};

// ——— Main ———

const sitemapUrls = [];
let count = 0;

// Home — overwrite dist/index.html in place (it IS the template, can't use writePage)
fs.writeFileSync(
    path.join(distDir, 'index.html'),
    injectOgTags(templateHtml, {
        title: 'Home',
        description: 'Transformational health coaching and the Speak Plainly Podcast.',
        image: DEFAULT_IMAGE,
        url: SITE_URL,
        type: 'website',
    })
);
sitemapUrls.push({ loc: SITE_URL, priority: '1.0' });
count++;


// ——— Static Pages ———

const staticPages = [
    {
        route: 'coaching',
        title: 'Coaching',
        description: 'Book a free 15-minute discovery call to explore transformational coaching.',
        priority: '0.9',
    },
    {
        route: 'about',
        title: 'About',
        description: 'Learn about Owl Chrysalis Medicine and the work of transformational coaching.',
        priority: '0.8',
    },
    {
        route: 'articles',
        title: 'Articles',
        description: 'Essays on grief, identity, self-awareness, and the human experience.',
        priority: '0.8',
    },
    {
        route: 'podcast',
        title: 'Podcast',
        description: 'The Speak Plainly Podcast — honest conversations about mental health, neurodivergence, and healing.',
        priority: '0.8',
    },
    {
        route: 'contact',
        title: 'Contact',
        description: 'Get in touch with Owl Chrysalis Medicine.',
        priority: '0.7',
    },
];

staticPages.forEach(({ route, title, description, priority }) => {
    writePage(route, {
        title,
        description,
        image: DEFAULT_IMAGE,
        url: `${SITE_URL}/${route}`,
        type: 'website',
    });
    sitemapUrls.push({ loc: `${SITE_URL}/${route}`, priority});
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
        type: 'article',
    });
    sitemapUrls.push({ loc: `${SITE_URL}/articles/${fm.slug}`, priority: '0.7' });
    count++;
});

// Podcast episode pages

const episodes = await fetchEpisodes();
episodes.forEach(({ title, slug, description, image }) => {
    writePage(`podcast/${slug}`, {
        title,
        description,
        image,
        url: `${SITE_URL}/podcast/${slug}`,
        type: 'website',
    });
    sitemapUrls.push({ loc: `${SITE_URL}/podcast/${slug}`, priority: '0.6' });
    count ++
})

// Sitemap
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemap(sitemapUrls));

console.log(`✓ Generated ${count} pages with meta/canonical tags`);
console.log(`✓ sitemap.xml written with ${sitemapUrls.length} URLs`);