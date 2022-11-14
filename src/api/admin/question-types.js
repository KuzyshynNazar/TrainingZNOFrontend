const axios = require('axios');

const origin = process.env.VUE_APP_API_URL+'/api-admin';
const routes = {
    get: {
        questionTypes: `${origin}/question-types`,
    },
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.questionTypes;
    return axios.get(url, headers);
};