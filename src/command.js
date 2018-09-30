exports.run = async () => {
    const startTime = new Date().getTime();

    const { fetchGtmSize } = require('./request-size');
    const { saveSize } = require('./storage');

    console.log('Fetching GTM container\'s size...');

    const size = await fetchGtmSize();

    console.log(`  Done! Size is ${size} byte${ size > 0 ? 's' : ''}`);
    console.log('Saving size to influxDB...');

    await saveSize(size);

    console.log('  Done! Saved successfully.');
    const finalTime = new Date().getTime();
    console.log(`Overall execution time: ${ finalTime - startTime } ms.`);
};
