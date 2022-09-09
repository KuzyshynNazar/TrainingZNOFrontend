import * as types from "./_mutayion-types";
import testSamplesService from '../../../services/admin/test-samples-service';

const state = () => ({
    testSamples: [],
    testSample: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    testSamples: state => state.testSamples,
    testSample: state => state.testSample,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async getAll(context) {
        await testSamplesService.getAll(context)
    },

    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async show(context,id) {
        await testSamplesService.show(context, id)
    },

    /**
     *
     * @param context
     * @param testSample
     * @returns {Promise<void>}
     */
    async store(context, testSample) {
        await testSamplesService.store(context, testSample)
    },

    /**
     *
     * @param context
     * @param testSample
     * @returns {Promise<void>}
     */
    async update(context, testSample) {
        await testSamplesService.update(context, testSample)
    },
    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await testSamplesService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param testSamples
     */
    [types.SET_TEST_SAMPLES]: (state, testSamples) => {
        state.testSamples = testSamples
    },
    /**
     *
     * @param state
     * @param testSample
     */
    [types.SET_TEST_SAMPLE]: (state, testSample) => {
        state.testSample = testSample
    },


    /**
     *
     * @param state
     * @param testSample
     */
    [types.SAVE_NEW_TEST_SAMPLE]: (state, testSample) => {
        state.testSamples.unshift(testSample)
        state.testSample=testSample
    },
    /**
     *
     * @param state
     * @param id
     */
    [types.SET_DELETE_TEST_SAMPLE]: (state, id) => {
        let index = state.testSamples.findIndex((c) => c.id === id);
        if (index > -1) {
            state.testSamples.splice(index, 1);
        }
    },

    /**
     *
     * @param testSample
     */
    [types.SAVE_UPDATED_TEST_SAMPLE]: (state, testSample) => {
        let index = state.testSamples.findIndex((c) => c.id === testSample.id);
        if (index > -1) {
            state.testSamples.splice(index, 1, testSample);
        }
    },

    /**
     *
     * @param state
     * @param errors
     */
    [types.TEST_SAMPLE_ERRORS]: (state, errors) => {
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

