const axios = require('axios');

const origin = process.env.VUE_APP_API_URL+'/api-admin';
const routes = {
    get: {
        testQuestions: `${origin}/testQuestions`,
        testQuestion: `${origin}/testQuestions/{id}`,
    },
    post: {
        create: `${origin}/testQuestions`,
    },
    put: {
        update: `${origin}/testQuestions/{id}`,
    },
    delete: {
        destroy: `${origin}/testQuestions/{id}`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.testQuestions;
    return axios.get(url, headers);
};
exports.show = (id, headers) => {
    const url = routes.get.testQuestion.replace('{id}', id);
    return axios.get(url, headers);
};
exports.create = (data, headers) => {
    const url = routes.post.create;
    return axios.post(url, data, headers);
};
exports.update = (id, data, headers) => {
    const url = routes.put.update.replace('{id}', id);
    return axios.put(url, data, headers);
};
exports.delete = (id, headers) => {
    const url = routes.delete.destroy.replace('{id}', id);
    return axios.delete(url, headers);
};