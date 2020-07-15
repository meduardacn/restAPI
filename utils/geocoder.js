const NodeGeocoder = require('node-geocoder');
const config = require('../config');

const options = {
    provider: config.GEOCODER_PROVIDER,
    httpAdapter: 'https',
    apiKey: config.GEOCODER_API_KEY,
    formatter: null
};

module.exports = NodeGeocoder(options);