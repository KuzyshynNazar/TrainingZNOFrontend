const axios = require('axios');

const origin = 'http://training-zno/api-admin';
const routes = {
    get: {
        news: `${origin}/news`,
        oneNews: `${origin}/news/{id}`,
    },
    post: {
        create: `${origin}/news`,
    },
    put: {
        update: `${origin}/news/{id}`,
    },
    delete: {
        destroy: `${origin}/news/{id}`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.news;
    return axios.get(url, headers);
};
exports.show = (id, headers) => {
    const url = routes.get.oneNews.replace('{id}', id);
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