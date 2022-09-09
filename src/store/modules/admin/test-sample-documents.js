import testSampleDocumentsService from '../../../services/admin/test-sample-documents-service';
import * as types from "./_mutayion-types";

const state = () => ({
    testSampleDocuments: [],
})

const getters = {
    testSampleDocuments: state => state.testSampleDocuments,
};


const actions = {
    /**
     *
     * @param context
     * @param testSampleDocument
     * @returns {Promise<void>}
     */
    async store(context, testSampleDocument) {
        await testSampleDocumentsService.store(context, testSampleDocument)
    },
      /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await testSampleDocumentsService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param testSampleDocuments
     */
    [types.SAVE_NEW_TEST_SAMPLE_DOCUMENTS]: (state, testSampleDocuments) => {
        state.testSampleDocuments = testSampleDocuments

    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

