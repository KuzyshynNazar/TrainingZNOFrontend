const axios = require('axios');

const origin = process.env.VUE_APP_API_URL+'/api-admin';
const routes = {
    get: {
        getTestStudentByTestIdByStudentId: `${origin}/get-test-students-by-studentId-and-testId`,
        getTestStudentByStudentId: `${origin}/get-test-students-by-studentId`,
        getTestStudentCheckedByStudentId: `${origin}/get-test-students-checked-by-studentId`,
    },
    post: {
        create: `${origin}/testStudents`,
    },
    put: {
        update: `${origin}/testStudents`,
        checked: `${origin}/checkedTestStudents/{id}`
    },
    delete: {
        destroy: `${origin}/testStudents`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.getTestStudentByTestIdByStudentId = (headers) => {
    const url = routes.get.getTestStudentByTestIdByStudentId;
    return axios.get(url, headers);
};
exports.getTestStudentByStudentId = (headers) => {
    const url = routes.get.getTestStudentByStudentId;
    return axios.get(url, headers);
};
exports.getTestStudentCheckedByStudentId = (headers) => {
    const url = routes.get.getTestStudentCheckedByStudentId;
    return axios.get(url, headers);
};
exports.create = (data, headers) => {
    const url = routes.post.create;
    return axios.post(url, data, headers);
};
exports.update = (data, headers) => {
    const url = routes.put.update;
    return axios.put(url, data, headers);
};
exports.checked = (id, data, headers) => {
    const url = routes.put.checked.replace('{id}', id);
    return axios.put(url, data, headers);
};
exports.delete = (headers) => {
    const url = routes.delete.destroy;
    return axios.delete(url, headers);
};