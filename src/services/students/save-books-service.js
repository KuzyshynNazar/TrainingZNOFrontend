import * as types from '../../store/mutayion-types';
const apiSaveBooks = require('../../api/student/save-books');

export default {
    /**
     *
     * @param context
     */
    async  savedBooks(context) {
        await  apiSaveBooks.savedBooks({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_SAVED_BOOKS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    /**
     *
     * @param context
     * @param data
     * @returns {Promise<void>}
     */
    async  saveBook(context, data) {
        await  apiSaveBooks.saveBook(data,{
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`,
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_SAVED_BOOK, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    /**
     *
     * @param context
     * @param bookId
     */
    async deleteSavedBook(context, bookId) {
        await apiSaveBooks.deleteSavedBook( {
            headers: {'Authorization': `Bearer ${context.rootGetters["auth/token"]}` },
            params:{bookId:bookId}
        }).then(() => {
            context.commit(types.SET_DELETE_SAVED_BOOK, bookId);
        }).catch(err => {
            console.log(err)
        })
    }

}
