const axios = require('axios');

const origin = 'http://training-zno/api-app';
const routes = {
    get: {
        tasks: `${origin}/tasks`,
    },
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.tasks;
    return axios.get(url, headers);
};
