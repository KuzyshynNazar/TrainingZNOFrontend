const axios = require('axios');

const origin = 'http://training-zno/api-admin';
const routes = {
    post: {
        create: `${origin}/bookDocuments`,
    },
    delete: {
        destroy: `${origin}/bookDocuments/{id}`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.delete = (id, headers) => {
    const url = routes.delete.destroy.replace('{id}', id);
    return axios.delete(url, headers);
};
exports.create = (data, headers) => {
    const url = routes.post.create;
    return axios.post(url, data, headers);
};