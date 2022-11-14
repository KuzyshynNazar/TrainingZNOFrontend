const axios = require('axios');

const origin = process.env.VUE_APP_API_URL+'/api-student';
const routes = {
    get: {
        savedTasks: `${origin}/studentTasks`,
    },
    post: {
        create: `${origin}/studentTasks`,
    },
    delete: {
        destroy: `${origin}/studentTasks`
    }
};

exports.getRoutes = () => {
    return routes;
};
exports.savedTasks = (headers) => {
    const url = routes.get.savedTasks;
    return axios.get(url, headers);
};
exports.saveTask = (data, headers) => {
    const url = routes.post.create;
    return axios.post(url, data, headers);
};

exports.deleteSavedTask = (headers) => {
    const url = routes.delete.destroy;
    return axios.delete(url, headers);
};
