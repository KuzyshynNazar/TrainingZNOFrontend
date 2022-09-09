import * as types from "./_mutayion-types";
import booksService from '../../../services/app/books-service';

const state = () => ({
    books: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    books: state => state.books,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async getAll(context) {
        await booksService.getAll(context)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param books
     */
    [types.SET_APP_BOOKS]: (state, books) => {
        state.books = books
    },


    /**
     *
     * @param state
     * @param errors
     */
    [types.BOOKS_APP_ERRORS]: (state, errors) => {
        state.errors = errors
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

