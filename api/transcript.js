export const config = { runtime: 'edge' };

const handler = async (req) => {
    const {searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
        return new Response(JSON.stringify({ error: 'url param required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        })
    };

    try {
        const res = await fetch(url);
        const data = await res.json();
        return new Response(JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, s-maxage=86400',
                'Access-Control-Allow-Origin': '*',
            }
        })
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json'}
        })
    }
};

export default handler;