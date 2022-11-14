const axios = require('axios');

const origin = process.env.VUE_APP_API_URL+'/api-student';
const routes = {
    get: {
        savedFormulas: `${origin}/studentFormulas`,
    },
    post: {
        create: `${origin}/studentFormulas`,
    },
    delete: {
        destroy: `${origin}/studentFormulas`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.savedFormulas = (headers) => {
    const url = routes.get.savedFormulas;
    return axios.get(url, headers);
};
exports.saveFormula = (data, headers) => {
    const url = routes.post.create;
    return axios.post(url, data, headers);
};

exports.deleteSavedFormula = (headers) => {
    const url = routes.delete.destroy;
    return axios.delete(url, headers);
};
