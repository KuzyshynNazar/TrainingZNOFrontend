const axios = require('axios');

const origin = 'http://training-zno/api';
const routes = {
    post: {
        create: `${origin}/testStudents`,
    },
    put: {
        update: `${origin}/testStudents`,
    },
    delete: {
        destroy: `${origin}/testStudents`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.create = (data, headers) => {
    const url = routes.post.create;
    return axios.post(url, data, headers);
};
exports.update = (data, headers) => {
    const url = routes.put.update;
    return axios.put(url, data, headers);
};
exports.delete = (headers) => {
    const url = routes.delete.destroy;
    return axios.delete(url, headers);
};