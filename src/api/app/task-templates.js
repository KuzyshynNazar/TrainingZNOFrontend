const axios = require('axios');

const origin = 'http://training-zno/api-app';
const routes = {
    get: {
        taskTemplates: `${origin}/taskTemplates`,
    },
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.taskTemplates;
    return axios.get(url, headers);
};
