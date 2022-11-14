const axios = require('axios');

const origin = process.env.VUE_APP_API_URL+'/api-student';
const routes = {
    get: {
        savedTaskTemplates: `${origin}/studentTaskTemplates`,
    },
    post: {
        create: `${origin}/studentTaskTemplates`,
    },
    delete: {
        destroy: `${origin}/studentTaskTemplates`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.savedTaskTemplates = (headers) => {
    const url = routes.get.savedTaskTemplates;
    return axios.get(url, headers);
};
exports.saveTaskTemplate = (data, headers) => {
    const url = routes.post.create;
    return axios.post(url, data, headers);
};

exports.deleteSavedTaskTemplate = (headers) => {
    const url = routes.delete.destroy;
    return axios.delete(url, headers);
};
