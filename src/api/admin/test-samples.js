const axios = require('axios');

const origin = 'http://training-zno/api-admin';
const routes = {
    get: {
        testSamples: `${origin}/testSamples`,
        testSample: `${origin}/testSamples/{id}`,
    },
    post: {
        create: `${origin}/testSamples`,
    },
    put: {
        update: `${origin}/testSamples/{id}`,
    },
    delete: {
        destroy: `${origin}/testSamples/{id}`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.testSamples;
    return axios.get(url, headers);
};
exports.show = (id, headers) => {
    const url = routes.get.testSample.replace('{id}', id);
    return axios.get(url, headers);
};
exports.create = (data, headers) => {
    const url = routes.post.create;
    return axios.post(url, data, headers);
};
exports.update = (id, data, headers) => {
    const url = routes.put.update.replace('{id}', id);
    return axios.put(url, data, headers);
};
exports.delete = (id, headers) => {
    const url = routes.delete.destroy.replace('{id}', id);
    return axios.delete(url, headers);
};