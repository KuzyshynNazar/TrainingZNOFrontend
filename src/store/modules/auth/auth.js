import * as types from './_mutayion-types';
import apiAuth from "../../../api/auth"


const state = {
    token: window.localStorage.getItem('token') || '',
    user: JSON.parse(window.localStorage.getItem('user')) || {},
    message: '',
    errors: []
};


const getters = {
    token: state => state.token,
    user: state => state.user,
    message: state => state.message,
    isAuthorized: state => state.token && Object.keys(state.user).length > 0,
    isAdmin: state => state.user.isAdmin,
    isCustomer: state => state.user.isCustomer,
    errors: state => state.errors,
};
const actions = {
    async loginAdmin(context, data) {
        await apiAuth.loginAdmin(data)
            .then((response) => {
                context.commit(types.SET_TOKEN, response.data.data.token);
                context.commit(types.SET_USER, response.data.data);
            })
            .catch(err => {
                context.commit(types.AUTH_ERRORS, JSON.parse(err.request.response));
            });
    },
    async loginStudent(context, data) {
        await apiAuth.loginStudent(data)
            .then((response) => {
                context.commit(types.SET_TOKEN, response.data.data.token);
                context.commit(types.SET_USER, response.data.data);
            })
            .catch(err => {
                context.commit(types.AUTH_ERRORS, JSON.parse(err.request.response));
            });
    },
    async logoutAdmin(context) {
        await apiAuth.logoutAdmin({
            headers: {'Authorization': `Bearer ${context.getters.token}`}
        }).then(() => {
            context.commit(types.REMOVE_TOKEN);
            context.commit(types.REMOVE_USER);
        })
    },
    async logoutStudent(context) {
        await apiAuth.logoutStudent({
            headers: {'Authorization': `Bearer ${context.getters.token}`}
        }).then(() => {
            context.commit(types.REMOVE_TOKEN);
            context.commit(types.REMOVE_USER);
        })
    },


    async setUser(context, user) {
        await new Promise((resolve) => {
            context.commit(types.SET_USER, user);
            resolve()
        })
    },
    async setErrors(context, errors) {
        await new Promise(() => {
            context.commit(types.AUTH_ERRORS, errors);
        })
    }
};


const mutations = {
    [types.SET_TOKEN]: (state, token) => {
        window.localStorage.setItem('token', token)
        state.token = token
    },
    [types.SET_USER]: (state, user) => {
        window.localStorage.setItem('user', JSON.stringify(user));
        state.user = user
    },

    [types.AUTH_ERRORS]: (state, errors) => {
        state.errors = errors
    },

    [types.SET_MESSAGE]: (state, message) => {
        state.message = message
    },
    [types.REMOVE_TOKEN]: (state) => {
        window.localStorage.removeItem('token');
        state.token = ''
    },
    [types.REMOVE_USER]: (state) => {
        window.localStorage.removeItem('user');
        state.user = {}
    },
};


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

