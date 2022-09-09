import * as types from "./_mutayion-types";
import saveBooksService from '../../../services/students/save-books-service';

const state = () => ({
    saveBooks: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    saveBooks: state => state.saveBooks,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async savedBooks(context) {
        await saveBooksService.savedBooks(context)
    },
    /**
     *
     * @param context
     * @param data
     * @returns {Promise<void>}
     */
    async saveBook(context, data) {
        await saveBooksService.saveBook(context, data)
    },
    /**
     *
     * @param context
     * @param bookId
     * @returns {Promise<void>}
     */
    async deleteSavedBook(context, bookId) {
        await saveBooksService.deleteSavedBook(context, bookId)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param saveBooks
     */
    [types.SET_SAVED_BOOKS]: (state, saveBooks) => {
        state.saveBooks = saveBooks
    },
    /**
     *
     * @param state
     * @param saveBook
     */
    [types.SAVE_NEW_SAVED_BOOK]: (state, saveBook) => {
        state.saveBooks.push(saveBook)
    },

    /**
     *
     * @param state
     * @param bookId
     */
    [types.SET_DELETE_SAVED_BOOK]: (state, bookId) => {
        let index = state.saveBooks.findIndex((c) => c.id === bookId);
        if (index > -1) {
            state.saveBooks.splice(index, 1);
        }
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

