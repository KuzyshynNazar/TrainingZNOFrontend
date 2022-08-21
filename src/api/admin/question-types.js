const axios = require('axios');

const origin = 'http://training-zno/api';
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