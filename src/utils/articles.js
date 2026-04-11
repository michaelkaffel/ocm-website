const articleFiles = import.meta.glob('/src/content/articles/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
});

const parseFrontmatter = (raw) => {
    const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!match) return { meta: {}, body: '' };

    const meta = {};
    for (const line of match[1].split('\n')) {
        const m = line.match(/^(\w+):\s*"?(.*?)"?\s*$/);
        if (m) meta[m[1]] = m[2];
    }

    return { meta, body: match[2].trim() };
};

const parseDate = (dateStr) => {
    if (!dateStr) return 0;
    return new Date(dateStr).getTime() || 0;
};

export const getAllArticles = () => {
    return Object.entries(articleFiles)
        .map(([filepath, raw]) => {
            const { meta } = parseFrontmatter(raw);
            return {
                ...meta,
                slug: meta.slug || filepath.split('/').pop().replace('.md', ''),
            };
        })
        .sort((a, b) => parseDate(b.date) - parseDate(a.date));
};

export const getArticleBySlug = (slug) => {
    const entry = Object.entries(articleFiles).find(([filepath]) => 
        filepath.endsWith(`/${slug}.md`)
    );
    if (!entry) return null;
    const { meta, body } = parseFrontmatter(entry[1]);
    return { ...meta, slug, body };
};