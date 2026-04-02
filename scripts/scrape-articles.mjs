/**
 * Scrapes articles from the Wix blog and outputs markdown files
 * with frontmatter into src/content/articles/
 *
 * Usage: node scripts/scrape-articles.mjs
 * Requires: npm install cheerio
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';

const OUTPUT_DIR = path.resolve('src/content/articles');

const articles = [
    {
        url: 'https://www.owlchrysalismedicine.com/post/on-the-non-linearity-of-grief',
        thumbnail: 'https://static.wixstatic.com/media/50feef_d0223889a23d4433999bfb7bfa954189~mv2.png',
        readTime: '6 min read',
        category: '',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/pathological-normativity-theory-a-new-framework-for-understanding-neurodiversity',
        thumbnail: '',
        readTime: '10 min read',
        category: '',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/the-silent-nightmare-of-women-with-adhd',
        thumbnail: 'https://static.wixstatic.com/media/50feef_aeb2b9cc1ae34a6bba4ffca5846d78e8~mv2.png',
        readTime: '12 min read',
        category: '',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/the-chronic-stress-adapted-mind-understanding-inattentive-adhd-avoidant-attachment-and-dissociati',
        thumbnail: 'https://static.wixstatic.com/media/50feef_1f93e54c2bd140699364fcffebc51cdd~mv2.png',
        readTime: '12 min read',
        category: '',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/why-you-might-want-to-be-a-crappy-meditator',
        thumbnail: 'https://static.wixstatic.com/media/11062b_8652cbafe56e445aa66870338829591e~mv2.jpg',
        readTime: '6 min read',
        category: 'Mindfulness',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/satisfythebeast',
        thumbnail: 'https://static.wixstatic.com/media/nsplsh_4270482d2d7570526c4373~mv2_d_1982_2973_s_2.jpg',
        readTime: '6 min read',
        category: '',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/proximal-abandonment-the-modern-mental-health-dilemma',
        thumbnail: 'https://static.wixstatic.com/media/nsplsh_bd7a1c488f7d4195873547fbe1e4784e~mv2.jpg',
        readTime: '8 min read',
        category: 'mental health',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/putting-work-back-in-reward-for-a-better-life',
        thumbnail: 'https://static.wixstatic.com/media/11062b_77b9163a304d4b80bbfb184acd51443c~mv2.jpg',
        readTime: '9 min read',
        category: 'dopamine',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/addiction-is-supplementation-not-self-medication',
        thumbnail: 'https://static.wixstatic.com/media/nsplsh_90ab0637fad644faa2c961ce26ae1338~mv2.jpg',
        readTime: '7 min read',
        category: 'addiction',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/all-excuses-are-valid-but-don-t-get-results',
        thumbnail: 'https://static.wixstatic.com/media/11062b_83d0d117e4054bcab53dc1ac33aac610~mv2.jpg',
        readTime: '5 min read',
        category: 'excuses',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/free-costs-focus',
        thumbnail: 'https://static.wixstatic.com/media/11062b_702aa61483f74d28a8835f37022071af~mv2.jpg',
        readTime: '4 min read',
        category: '',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/conservatives-are-born-liberals-are-made',
        thumbnail: 'https://static.wixstatic.com/media/0a8802f2cb234551bc855be44c0f34de.jpg',
        readTime: '5 min read',
        category: '',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/the-neurobiology-of-fuck-it',
        thumbnail: 'https://static.wixstatic.com/media/11062b_4d7e9215d20a40159c6f78f78817520e~mv2.jpg',
        readTime: '5 min read',
        category: '',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/rats-who-love-pain',
        thumbnail: 'https://static.wixstatic.com/media/11062b_fed48495cb5241b7a59ab9981a0242cf~mv2.jpg',
        readTime: '4 min read',
        category: '',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/finish-line-freak-out',
        thumbnail: 'https://static.wixstatic.com/media/11062b_2774e9d666c84ff59c157e2f26ff326d~mv2.jpg',
        readTime: '4 min read',
        category: '',
    },
    {
        url: 'https://www.owlchrysalismedicine.com/post/the-attachment-authenticity-war',
        thumbnail: 'https://static.wixstatic.com/media/11062b_48e258f2eea64a309fe372a2567324e0~mv2.jpg',
        readTime: '13 min read',
        category: '',
    },
];

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

const slugify = (url) => url.split('/post/')[1];

const fetchArticle = async ({ url, thumbnail, readTime, category }) => {
    console.log(`Fetching: ${url}`);
    const res = await fetch(url);
    const html = await res.text();
    const $ = cheerio.load(html);

    // Wix blog post title
    const title =
        $('h1').first().text().trim() ||
        $('[data-hook="blog-post-title"]').text().trim();

    // Wix blog post date
    const date =
        $('[data-hook="time-ago"]').text().trim() ||
        $('time').attr('datetime') ||
        '';

    // Wix blog post body — try common selectors
    let body = '';
    const contentSelectors = [
        '[data-hook="post-body"]',
        '[data-id="rich-content-viewer"]',
        '.post-content__body',
        'article',
    ];

    for (const sel of contentSelectors) {
        const el = $(sel);
        if (el.length) {
            // Convert paragraphs to markdown-ish text
            body = el
                .find('p, h2, h3, blockquote, li')
                .map((_, el) => {
                    const tag = $(el).prop('tagName').toLowerCase();
                    const text = $(el).text().trim();
                    if (!text) return '';
                    if (tag === 'h2') return `## ${text}`;
                    if (tag === 'h3') return `### ${text}`;
                    if (tag === 'blockquote') return `> ${text}`;
                    if (tag === 'li') return `- ${text}`;
                    return text;
                })
                .get()
                .filter(Boolean)
                .join('\n\n');
            break;
        }
    }

    const slug = slugify(url);

    const frontmatter = [
        '---',
        `title: "${title.replace(/"/g, '\\"')}"`,
        `slug: "${slug}"`,
        `date: "${date}"`,
        `category: "${category}"`,
        `readTime: "${readTime}"`,
        `thumbnail: "${thumbnail}"`,
        '---',
    ].join('\n');

    return { slug, content: `${frontmatter}\n\n${body}` };
};

const main = async () => {
    if (!existsSync(OUTPUT_DIR)) {
        mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    for (const article of articles) {
        try {
            const { slug, content } = await fetchArticle(article);
            const filepath = path.join(OUTPUT_DIR, `${slug}.md`);
            writeFileSync(filepath, content, 'utf-8');
            console.log(`  ✓ ${slug}.md`);
        } catch (err) {
            console.error(`  ✗ Failed: ${article.url} — ${err.message}`);
        }
        await delay(1000); // polite 1s delay between requests
    }

    console.log(`\nDone! ${articles.length} articles written to ${OUTPUT_DIR}`);
};

main();