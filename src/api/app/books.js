const axios = require('axios');

const origin = 'http://training-zno/api-app';
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
