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
        }),
    });

    const data = await response.json();

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