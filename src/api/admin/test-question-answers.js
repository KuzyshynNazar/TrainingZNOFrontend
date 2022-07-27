const axios = require('axios');

const origin = 'http://training-zno/api';
const routes = {
    get: {
        testQuestionAnswers: `${origin}/testQuestionAnswers`,
        testQuestionAnswer: `${origin}/testQuestionAnswers/{id}`,
    },
    post: {
        create: `${origin}/testQuestionAnswers`,
    },
    put: {
        update: `${origin}/testQuestionAnswers/{id}`,
    },
    delete: {
        destroy: `${origin}/testQuestionAnswers/{id}`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.testQuestionAnswers;
    return axios.get(url, headers);
};
exports.show = (id, headers) => {
    const url = routes.get.testQuestionAnswer.replace('{id}', id);
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