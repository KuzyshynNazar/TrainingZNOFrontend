const axios = require('axios');

const origin = 'http://training-zno/api-admin';
const routes = {
    get: {
        formulas: `${origin}/formulas`,
        formula: `${origin}/formulas/{id}`,
    },
    post: {
        create: `${origin}/formulas`,
    },
    put: {
        update: `${origin}/formulas/{id}`,
    },
    delete: {
        destroy: `${origin}/formulas/{id}`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.formulas;
    return axios.get(url, headers);
};
exports.show = (id, headers) => {
    const url = routes.get.formula.replace('{id}', id);
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