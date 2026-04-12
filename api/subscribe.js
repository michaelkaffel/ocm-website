import { Resend } from 'resend';

/** @type {Resend | null} */
let _resend = null;
const getResend = () => {
    if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
    return _resend;
};

export const config = { runtime: 'edge' };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body, status = 200) => 
    new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });

const handler = async (req) => {
    if (req.method !== 'POST') return json({ error: 'Method not allowed'}, 405);

    let email;
    try {
        ({ email} = await req.json());
    } catch {
        return json({ error: 'Invalid request body'}, 400);
    }

    if (!email || !EMAIL_RE.test(email)) {
        return json({ error: 'A valid email address is required.' }, 400);
    }

    try {
        await getResend().contacts.create({
            email: email.trim().toLowerCase(),
            audienceId: process.env.RESEND_AUDIENCE_ID,
            unsubscribed: false,
        });

        return json({ success: true });
    } catch (err) {
        if (err?.statusCode === 422 || err?.statusCode === 409) {
            return json({ success: true });
        }

        console.error('[subscribe] Resend error:'. err);
        return json({ error: 'Something went wrong. Please try again.' }, 500);
    }
};

export default handler;