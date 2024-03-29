const axios = require('axios');

const origin = process.env.VUE_APP_API_URL+'/api-admin';
const routes = {
    get: {
        treeCategories: `${origin}/treeCategories`,
        categoryTests: `${origin}/get-category-and-tests`,
        treeCategory: `${origin}/treeCategories/{id}`,
    },
    post: {
        create: `${origin}/treeCategories`,
    },
    put: {
        update: `${origin}/treeCategories/{id}`,
    },
    delete: {
        destroy: `${origin}/treeCategories/{id}`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.treeCategories;
    return axios.get(url, headers);
};
exports.categoryTests = (headers) => {
    const url = routes.get.categoryTests;
    return axios.get(url, headers);
};
exports.show = (id, headers) => {
    const url = routes.get.treeCategory.replace('{id}', id);
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