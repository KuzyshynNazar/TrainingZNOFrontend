const axios = require('axios');

const origin = 'http://training-zno/api-student';
const routes = {
    get: {
        savedTestSamples: `${origin}/studentTestSamples`,
    },
    post: {
        create: `${origin}/studentTestSamples`,
    },
    delete: {
        destroy: `${origin}/studentTestSamples`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.savedTestSamples = (headers) => {
    const url = routes.get.savedTestSamples;
    return axios.get(url, headers);
};
exports.saveTestSample = (data, headers) => {
    const url = routes.post.create;
    return axios.post(url, data, headers);
};

exports.deleteSavedTestSample = (headers) => {
    const url = routes.delete.destroy;
    return axios.delete(url, headers);
};
