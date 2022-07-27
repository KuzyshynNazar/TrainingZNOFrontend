const axios = require('axios');

const origin = 'http://training-zno/api';
const routes = {
    post: {
        loginAdmin: `${origin}/login-admin`,
        loginStudent: `${origin}/login-student`,

    },
    get:{
        logoutAdmin: `${origin}/logout-admin`,
        logoutStudent: `${origin}/logout-student`,
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.loginAdmin = (credentials) => {
    const url = routes.post.loginAdmin;
    return axios.post(url, credentials);
};
exports.loginStudent = (credentials) => {
    const url = routes.post.loginStudent;
    return axios.post(url, credentials);
};

exports.logoutAdmin = (header) => {
    const url = routes.get.logoutAdmin;
    return axios.get(url, header);
};

exports.logoutStudent = (header) => {
    const url = routes.get.logoutStudent;
    return axios.get(url, header);
};

