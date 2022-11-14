const axios = require('axios');

const origin = process.env.VUE_APP_API_URL+'/api-student';
const routes = {
    get: {
        testResults : `${origin}/test-results`,
    },
    post: {
        create: `${origin}/test-results`,
    },
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.testResults;
    return axios.get(url, headers);
};
exports.create = (data, headers) => {
    const url = routes.post.create;
    return axios.post(url, data, headers);
};
