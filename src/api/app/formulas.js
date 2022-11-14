const axios = require('axios');

const origin = process.env.VUE_APP_API_URL+'/api-app';
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
