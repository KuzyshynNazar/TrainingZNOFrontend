const axios = require('axios');

const origin = 'http://training-zno/api-app';
const routes = {
    get: {
        testSamples: `${origin}/testSamples`,
    },
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.testSamples;
    return axios.get(url, headers);
};
