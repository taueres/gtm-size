const startTime = new Date().getTime();
const { fetchGtmSize } = require('./request-size');
const { saveSize } = require('./storage');

const requestAndSave = async type => {
    console.log(`${type} -> Fetching GTM container\'s size...`);

    const size = await fetchGtmSize(type);

    console.log(`  ${type} -> Done! Size is ${size} byte${ size > 0 ? 's' : ''}`);
    console.log(`${type} -> Saving size to influxDB...`);

    await saveSize(size, type);

    console.log(`  ${type} -> Done! Saved successfully.`);
};

exports.run = async () => {
    await Promise.all([
        requestAndSave('plain'),
        requestAndSave('gzip')
    ]);

    const finalTime = new Date().getTime();
    console.log(`Overall execution time: ${ finalTime - startTime } ms.`);
};
