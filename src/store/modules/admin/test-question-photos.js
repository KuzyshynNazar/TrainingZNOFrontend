import testQuestionPhotosService from '../../../services/admin/test-question-photos-service';
import * as types from "./_mutayion-types";

const state = () => ({
    testQuestionPhotos: [],
})

const getters = {
    testQuestionPhotos: state => state.testQuestionPhotos,
};


const actions = {
    /**
     *
     * @param context
     * @param testQuestionPhotos
     * @returns {Promise<void>}
     */
    async store(context, testQuestionPhotos) {
        await testQuestionPhotosService.store(context, testQuestionPhotos)
    },
      /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await testQuestionPhotosService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param testQuestionPhotos
     */
    [types.SAVE_NEW_TEST_QUESTION_PHOTOS]: (state, testQuestionPhotos) => {
        state.testQuestionPhotos = testQuestionPhotos
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

