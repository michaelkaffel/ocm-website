
const handler = async (req, res) => {
    const { code } = req.query;

    if (!code) {
        const params = new URLSearchParams({
            client_id: process.env.GITHUB_CLIENT_ID,
            scope: 'repo,user',
            redirect_uri: 'https://ocm-website-three.vercel.app/api/auth/callback'
        });
        return res.redirect(
            `https://github.com/login/oauth/authorize?${params}`
        )
    }
}

export default handler