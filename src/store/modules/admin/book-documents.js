import bookDocumentsService from '../../../services/admin/book-documents-service';
import * as types from "@/store/mutayion-types";

const state = () => ({
    bookDocuments: [],
})

const getters = {
    bookDocuments: state => state.bookDocuments,
};


const actions = {
    /**
     *
     * @param context
     * @param bookDocuments
     * @returns {Promise<void>}
     */
    async store(context, bookDocuments) {
        await bookDocumentsService.store(context, bookDocuments)
    },
      /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await bookDocumentsService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param bookDocuments
     */
    [types.SAVE_NEW_BOOK_DOCUMENTS]: (state, bookDocuments) => {
        state.bookDocuments = bookDocuments

    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

