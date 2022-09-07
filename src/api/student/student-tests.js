const axios = require('axios');

const origin = 'http://training-zno/api-student';
const routes = {
    get: {
        studentTests : `${origin}/studentTests`,
    },
    put: {
        update: `${origin}/studentTests/{id}`,
    },
};

exports.getRoutes = () => {
    return routes;
};
exports.studentTests = (headers) => {
    const url = routes.get.studentTests;
    return axios.get(url, headers);
};
exports.update = (id, data, headers) => {
    const url = routes.put.update.replace('{id}', id);
    return axios.put(url, data, headers);
};