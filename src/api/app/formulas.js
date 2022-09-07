const axios = require('axios');

const origin = 'http://training-zno/api-app';
const routes = {
    get: {
        formulas: `${origin}/formulas`,
    },
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.formulas;
    return axios.get(url, headers);
};
