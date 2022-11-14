const axios = require('axios');

const origin = process.env.VUE_APP_API_URL+'/api-admin';
const origin1 = process.env.VUE_APP_API_URL+'/api-student';
const routes = {
    post: {
        loginAdmin: `${origin}/login-admin`,
        loginStudent: `${origin1}/login-student`,

    },
    get:{
        logoutAdmin: `${origin}/logout-admin`,
        logoutStudent: `${origin1}/logout-student`,
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

