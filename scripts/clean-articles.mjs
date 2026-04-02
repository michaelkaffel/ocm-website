/**
 * Cleans up scraped article markdown files in src/content/articles/
 *
 * Fixes:
 *  1. Splits concatenated date field into date + updatedDate
 *  2. Removes duplicate metadata lines at the start of body
 *  3. Removes bleed-over "next post" content at the end
 *  4. Removes trailing category tag lines
 *  5. Trims excess whitespace
 *
 * Usage: node scripts/clean-articles.mjs
 */

import { readdirSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';

const ARTICLES_DIR = path.resolve('src/content/articles');

// Known categories from the Wix site (used to strip trailing tag lines)
const CATEGORIES = [
    'mental health',
    'childhood trauma',
    'abandonment',
    'mindfulness',
    'meditation',
    'dopamine',
    'lifestyle',
    'addiction',
    'self medication',
    'excuses',
    'vision',
];

// Bleed-over text that Wix appends from the next/related post
const BLEED_MARKERS = [
    'Why "neuro-typical" is the most misleading word',
    'Why \u201cneuro-typical\u201d is the most misleading word',
];

const splitDate = (raw) => {
    // Pattern: "Sep 1, 2021Jan 26, 2023" or "Oct 23, 2021Jan 1, 2023"
    // Match the first full date, then the second
    const match = raw.match(
        /^([A-Z][a-z]{2}\s+\d{1,2},\s*\d{4})([A-Z][a-z]{2}\s+\d{1,2},\s*\d{4})$/
    );
    if (match) {
        return { date: match[1].trim(), updatedDate: match[2].trim() };
    }
    // Single date or already clean
    return { date: raw.trim(), updatedDate: '' };
};

const cleanBody = (body) => {
    let lines = body.split('\n');

    // 1. Remove leading metadata lines
    //    Patterns: "- Sep 1, 2021", "- 8 min read", "Updated: Jan 26, 2023"
    const metaPatterns = [
        /^-\s+[A-Z][a-z]{2}\s+\d{1,2},\s*\d{4}/, // - Sep 1, 2021
        /^-\s+\d+\s+min\s+read/i,                   // - 4 min read
        /^Updated:\s+/i,                              // Updated: Jan 26, 2023
    ];

    // Strip leading lines that match metadata patterns (including blank lines between them)
    while (lines.length > 0) {
        const trimmed = lines[0].trim();
        if (trimmed === '') {
            lines.shift();
            continue;
        }
        if (metaPatterns.some((p) => p.test(trimmed))) {
            lines.shift();
            continue;
        }
        break;
    }

    // 2. Remove bleed-over content from end
    let joined = lines.join('\n');
    for (const marker of BLEED_MARKERS) {
        const idx = joined.indexOf(marker);
        if (idx !== -1) {
            joined = joined.substring(0, idx);
        }
    }
    lines = joined.split('\n');

    // 3. Remove trailing category tag lines and blank lines
    while (lines.length > 0) {
        const trimmed = lines[lines.length - 1].trim();
        if (trimmed === '') {
            lines.pop();
            continue;
        }
        // Check for "- category" or "Related to:" lines
        if (/^-\s+/.test(trimmed)) {
            const tag = trimmed.replace(/^-\s+/, '').toLowerCase();
            if (CATEGORIES.includes(tag)) {
                lines.pop();
                continue;
            }
        }
        if (/^Related to:/i.test(trimmed)) {
            lines.pop();
            continue;
        }
        // Also strip bare URLs at the end (e.g., Harvard PDF link)
        if (/^https?:\/\//.test(trimmed)) {
            lines.pop();
            continue;
        }
        break;
    }

    // 4. Collapse 3+ consecutive blank lines into 2
    const result = lines
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

    return result;
};

const processFile = (filepath) => {
    const raw = readFileSync(filepath, 'utf-8');

    // Split frontmatter from body
    const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!fmMatch) {
        console.warn(`  ⚠ No frontmatter found, skipping: ${filepath}`);
        return;
    }

    const frontmatterRaw = fmMatch[1];
    const bodyRaw = fmMatch[2];

    // Parse frontmatter fields
    const fields = {};
    for (const line of frontmatterRaw.split('\n')) {
        const m = line.match(/^(\w+):\s*"(.*)"$/);
        if (m) fields[m[1]] = m[2];
    }

    // Fix date
    const { date, updatedDate } = splitDate(fields.date || '');
    fields.date = date;
    fields.updatedDate = updatedDate;

    // Clean body
    const cleanedBody = cleanBody(bodyRaw);

    // Rebuild file
    const newFrontmatter = [
        '---',
        `title: "${fields.title || ''}"`,
        `slug: "${fields.slug || ''}"`,
        `date: "${fields.date}"`,
        `updatedDate: "${fields.updatedDate}"`,
        `category: "${fields.category || ''}"`,
        `readTime: "${fields.readTime || ''}"`,
        `thumbnail: "${fields.thumbnail || ''}"`,
        '---',
    ].join('\n');

    const output = `${newFrontmatter}\n\n${cleanedBody}\n`;
    writeFileSync(filepath, output, 'utf-8');
};

// Main
const files = readdirSync(ARTICLES_DIR).filter((f) => f.endsWith('.md'));
console.log(`Cleaning ${files.length} articles in ${ARTICLES_DIR}\n`);

for (const file of files) {
    const filepath = path.join(ARTICLES_DIR, file);
    try {
        processFile(filepath);
        console.log(`  ✓ ${file}`);
    } catch (err) {
        console.error(`  ✗ ${file} — ${err.message}`);
    }
}

console.log('\nDone!');