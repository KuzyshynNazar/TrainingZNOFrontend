import * as types from '../../store/mutayion-types';

const apiBooks = require('../../api/admin/books');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiBooks.index({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_BOOKS, response.data.data);
        }).catch(err => {
            context.commit(types.BOOK_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param news
     */
    async store(context, news) {
        await apiBooks.create(news, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.BOOK_ERRORS, []);
            context.commit(types.SAVE_NEW_BOOK, response.data.data);
        }).catch(err => {
            context.commit(types.BOOK_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async show(context, id) {
        await apiBooks.show(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_BOOK, response.data.data);
        }).catch(err => {
            context.commit(types.BOOK_ERRORS, err.response.data.errors);
        });
    },

    /**
     *
     * @param context
     * @param book
     */
    async update(context, book) {
        await apiBooks.update(book.id, book, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.BOOK_ERRORS, []);
            context.commit(types.SAVE_UPDATED_BOOK, response.data.data);
        }).catch(err => {
            context.commit(types.BOOK_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async delete(context, id) {
        await apiBooks.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            context.commit(types.SET_DELETE_BOOK, id);
        }).catch(err => {
            context.commit(types.BOOK_ERRORS, err.response.data.errors);
        })
    }
}
