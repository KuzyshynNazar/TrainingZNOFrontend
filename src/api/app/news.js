const axios = require('axios');

const origin = 'http://training-zno/api';
const routes = {
    get: {
        news: `${origin}/get-all-news`,
    },
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.news;
    return axios.get(url, headers);
};
