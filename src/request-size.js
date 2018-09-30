const https = require('https');

const getRequestOptions = type => {
    const acceptEncoding = type === 'plain'
        ? 'identity'
        : 'gzip';

    return {
        hostname: 'www.googletagmanager.com',
        path: '/gtm.js?id=GTM-NL4RMP',
        headers: {
            'Accept-Encoding': acceptEncoding
        }
    };
};

exports.fetchGtmSize = type => {
    return new Promise((resolve, reject) => {
        https.get(
            getRequestOptions(type),
            resp => {
                let totalBytes = 0;
                resp.on('data', chunk => {
                    totalBytes += chunk.length;
                });

                resp.on('end', () => {
                    resolve(totalBytes);
                });
            }
        ).on('error', reject);
    });
};
