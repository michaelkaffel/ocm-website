const handler = async (req, res) => {
    const { code } = req.query;

    const response = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: 'https://ocm-website-three.vercel.app/api/auth/callback'
        }),
    });

    const data = await response.json();
    console.log('github oauth response keys:', Object.keys(data));
    console.log('has token:', !!data.access_token);

    if (data.error) {
        return res.status(400).send(`
            <script>
            window.opener.postMessage(
            'authorization:github:error:${data.error}',
            '*'
            );
            window.close();
            </script>
            `);
    }

    return res.status(200).send(`
         <script>
         if (window.opener) {
         window.opener.postMessage(
         'authorization:github:success:${JSON.stringify({ token: data.access_token, provider: 'github' })}',
         '*'
         );
        setTimeout(() => window.close(), 1500);
         } else {
            document.write('<p>Auth complete. You may close this tab.</p>');
            }
         
         
         </script>
    `);
}

export default handler;