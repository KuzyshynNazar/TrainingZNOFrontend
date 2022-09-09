import * as types from "./_mutayion-types";
import testSamplesService from '../../../services/app/test-samples-service';

const state = () => ({
    testSamples: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    testSamples: state => state.testSamples,
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
}

const mutations = {
    /**
     *
     * @param state
     * @param testSamples
     */
    [types.SET_APP_TEST_SAMPLES]: (state, testSamples) => {
        state.testSamples = testSamples
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

