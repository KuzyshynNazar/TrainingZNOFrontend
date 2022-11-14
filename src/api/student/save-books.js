const axios = require('axios');

const origin = process.env.VUE_APP_API_URL+'/api-student';
const routes = {
    get: {
        savedBooks: `${origin}/studentBooks`,
    },
    post: {
        create: `${origin}/studentBooks`,
    },
    delete: {
        destroy: `${origin}/studentBooks`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.savedBooks = (headers) => {
    const url = routes.get.savedBooks;
    return axios.get(url, headers);
};
exports.saveBook = (data, headers) => {
    const url = routes.post.create;
    return axios.post(url, data, headers);
};

exports.deleteSavedBook = (headers) => {
    const url = routes.delete.destroy;
    return axios.delete(url, headers);
};
