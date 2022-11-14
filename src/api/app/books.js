const axios = require('axios');

const origin = process.env.VUE_APP_API_URL+'/api-app';
const routes = {
    get: {
        books: `${origin}/books`,
    },
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.books;
    return axios.get(url, headers);
};
