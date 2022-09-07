const axios = require('axios');

const origin = 'http://training-zno/api-admin';
const routes = {
    get: {
        books: `${origin}/books`,
        book: `${origin}/books/{id}`,
    },
    post: {
        create: `${origin}/books`,
    },
    put: {
        update: `${origin}/books/{id}`,
    },
    delete: {
        destroy: `${origin}/books/{id}`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.index = (headers) => {
    const url = routes.get.books;
    return axios.get(url, headers);
};
exports.show = (id, headers) => {
    const url = routes.get.book.replace('{id}', id);
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