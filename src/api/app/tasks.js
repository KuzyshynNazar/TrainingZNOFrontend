const axios = require('axios');

const origin = process.env.VUE_APP_API_URL+'/api-app';
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
