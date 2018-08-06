const https = require('https');

const URL = 'https://www.googletagmanager.com/gtm.js?id=GTM-NL4RMP';

exports.fetchGtmSize = () => {
    return new Promise((resolve, reject) => {
        https.get(URL, resp => {
            let totalBytes = 0;
            resp.on('data', chunk => {
                totalBytes += chunk.length;
            });

            resp.on('end', () => {
                resolve(totalBytes);
            });

        }).on('error', reject);
    });
};
