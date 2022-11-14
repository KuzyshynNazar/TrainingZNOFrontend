const axios = require('axios');

const origin = process.env.VUE_APP_API_URL+'/api-admin';
const routes = {
    post: {
        create: `${origin}/formulaDocuments`,
    },
    delete: {
        destroy: `${origin}/formulaDocuments/{id}`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.delete = (id, headers) => {
    const url = routes.delete.destroy.replace('{id}', id);
    return axios.delete(url, headers);
};
exports.create = (data, headers) => {
    const url = routes.post.create;
    return axios.post(url, data, headers);
};