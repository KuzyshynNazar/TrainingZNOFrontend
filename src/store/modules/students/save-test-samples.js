import * as types from '../../mutayion-types';
import saveTestSamplesService from '../../../services/students/save-test-samples-service';

const state = () => ({
    saveTestSamples: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    saveTestSamples: state => state.saveTestSamples,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async savedTestSamples(context) {
        await saveTestSamplesService.savedTestSamples(context)
    },
    /**
     *
     * @param context
     * @param data
     * @returns {Promise<void>}
     */
    async saveTestSample(context, data) {
        await saveTestSamplesService.saveTestSample(context, data)
    },
    /**
     *
     * @param context
     * @param testSampleId
     * @returns {Promise<void>}
     */
    async deleteSavedTestSample(context, testSampleId) {
        await saveTestSamplesService.deleteSavedTestSample(context, testSampleId)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param saveTestSamples
     */
    [types.SET_SAVED_TEST_SAMPLES]: (state, saveTestSamples) => {
        state.saveTestSamples = saveTestSamples
    },
    /**
     *
     * @param state
     * @param saveTestSample
     */
    [types.SAVE_NEW_SAVED_TEST_SAMPLE]: (state, saveTestSample) => {
        state.saveTestSamples.push(saveTestSample)
    },

    /**
     *
     * @param state
     * @param testSampleId
     */
    [types.SET_DELETE_SAVED_FORMULA]: (state, testSampleId) => {
        let index = state.saveTestSamples.findIndex((c) => c.id === testSampleId);
        if (index > -1) {
            state.saveTestSamples.splice(index, 1);
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

