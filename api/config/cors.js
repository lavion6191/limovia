/*
*   config/cors.js

    CORS Options: Controls which origins can access this server and whether credentials are allowed.
    For local development, allow localhost. In production, configure based on actual domains.

*   Reference: MDN Web Docs - https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
*/

require('dotenv').config({ path: 'config/.env' });

module.exports = {
    origin: [
        new RegExp(`http://localhost:${process.env.FRONTEND_PORT_DEV}`),
        new RegExp(`http://localhost:${process.env.FRONTEND_PORT_DEV_PROD}`),
        new RegExp(`^https?://([a-z0-9-]+\\.)?limovia\\.se(:\\d{1,5})?$`),
        new RegExp(`https://dev\\.((api\\.)?invalsia\\.com)(:\\d{1,5})?$`)
    ],
    credentials: true,
    onError: function(err, req, res) {
        console.error('CORS error:', err);
        res.status(500).send({ error: 'CORS error' });
    },
};
