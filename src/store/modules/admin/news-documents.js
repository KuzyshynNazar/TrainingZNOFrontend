import newsDocumentsService from '../../../services/admin/news-documents-service';
import * as types from "./_mutayion-types";

const state = () => ({
    newsDocuments: [],
})

const getters = {
    newsDocuments: state => state.newsDocuments,
};


const actions = {
    /**
     *
     * @param context
     * @param newsDocuments
     * @returns {Promise<void>}
     */
    async store(context, newsDocuments) {
        await newsDocumentsService.store(context, newsDocuments)
    },
      /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await newsDocumentsService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param newsDocuments
     */
    [types.SAVE_NEW_NEWS_DOCUMENTS]: (state, newsDocuments) => {
        state.newsDocuments = newsDocuments
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

