const axios = require('axios');

const origin = 'http://training-zno/api';
const routes = {
    post: {
        create: `${origin}/test-results`,
    },
};

exports.getRoutes = () => {
    return routes;
};
exports.create = (data, headers) => {
    const url = routes.post.create;
    return axios.post(url, data, headers);
};
