import * as types from "./_mutayion-types";
import booksService from '../../../services/admin/books-service';

const state = () => ({
    books: [],
    book: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    books: state => state.books,
    book: state => state.book,
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

    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async show(context,id) {
        await booksService.show(context, id)
    },

    /**
     *
     * @param context
     * @param book
     * @returns {Promise<void>}
     */
    async store(context, book) {
        await booksService.store(context, book)
    },

    /**
     *
     * @param context
     * @param book
     * @returns {Promise<void>}
     */
    async update(context, book) {
        await booksService.update(context, book)
    },
    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await booksService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param books
     */
    [types.SET_BOOKS]: (state, books) => {
        state.books = books
    },
    /**
     *
     * @param state
     * @param book
     */
    [types.SET_BOOK]: (state, book) => {
        state.book = book
    },


    /**
     *
     * @param state
     * @param book
     */
    [types.SAVE_NEW_BOOK]: (state, book) => {
        state.books.unshift(book)
        state.book=book
    },
    /**
     *
     * @param state
     * @param id
     */
    [types.SET_DELETE_BOOK]: (state, id) => {
        let index = state.books.findIndex((c) => c.id === id);
        if (index > -1) {
            state.books.splice(index, 1);
        }
    },

    /**
     *
     * @param book
     */
    [types.SAVE_UPDATED_BOOK]: (state, book) => {
        let index = state.books.findIndex((c) => c.id === book.id);
        if (index > -1) {
            state.books.splice(index, 1, book);
        }
    },

    /**
     *
     * @param state
     * @param errors
     */
    [types.BOOK_ERRORS]: (state, errors) => {
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

