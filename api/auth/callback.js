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
            redirect_uri: 'https://owlchrysalismedicine.com/api/auth/callback'
        }),
    });

    const data = await response.json();

    if (data.error) {
        return res.status(400).send(`<!DOCTYPE html>
            <html><body><script>
                if (window.opener) {
                    window.opener.postMessage("authorization:github:error:${data.error}", "*");
                }
                window.close();
            </script></body></html>
            `);
    }

    const content = JSON.stringify({ token: data.access_token, provider: 'github' });

    return res.status(200).send(`<!DOCTYPE html>
        <html><body><script>
            (function() {
                function receiveMessage(e) {
                    window.opener.postMessage(
                        'authorization:github:success:${content}',
                        e.origin
                    );
                    window.removeEventListener("message", receiveMessage);
                }
                window.addEventListener("message", receiveMessage, false);
                window.opener.postMessage("authorizing:github", "*"); 
            })();
            </script></body></html>
        `);
}

export default handler;