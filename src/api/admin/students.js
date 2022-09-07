const axios = require('axios');

const origin = 'http://training-zno/api-admin';
const routes = {
    get: {
        students: `${origin}/students`,
        student: `${origin}/students/{id}`,
        studentTestResult: `${origin}/get-test-result`,
    },
    post: {
        create: `${origin}/students`,
    },
    put: {
        update: `${origin}/students/{id}`,
    },
    delete: {
        destroy: `${origin}/students/{id}`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.students;
    return axios.get(url, headers);
};
exports.getStudentTestResult = (headers) => {
    const url = routes.get.studentTestResult;
    return axios.get(url, headers);
};
exports.show = (id, headers) => {
    const url = routes.get.student.replace('{id}', id);
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