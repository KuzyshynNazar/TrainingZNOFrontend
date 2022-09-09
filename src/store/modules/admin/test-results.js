import * as types from "./_mutayion-types";
import testResultService from '../../../services/students/test-results-service';

const state = () => ({
    testResult: [],
})

const getters = {
    /**
     *
     * @param state
     */
    testResult: state => state.testResult,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @param testResult
     * @returns {Promise<void>}
     */
    async store(context, testResult) {
        console.log(testResult)
        await testResultService.store(context, testResult)
    },


}

const mutations = {
    /**
     *
     * @param state
     * @param testResult
     */
    [types.SAVE_NEW_TEST_RESULT]: (state, testResult) => {
        state.testResult = testResult
    },


};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

