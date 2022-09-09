import * as types from "./_mutayion-types";
import testQuestionsService from '../../../services/admin/test-questions-service';

const state = () => ({
    testQuestions: [],
    testQuestion: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    testQuestions: state => state.testQuestions,
    testQuestion: state => state.testQuestion,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @param test_id
     * @returns {Promise<void>}
     */
    async getAll(context,test_id) {
        await testQuestionsService.getAll(context, test_id)
    },

    /**
     *
     * @param context
     * @param test_question_id
     * @returns {Promise<void>}
     */
    async show(context,test_question_id) {
        await testQuestionsService.show(context, test_question_id)
    },

    /**
     *
     * @param context
     * @param testQuestion
     * @returns {Promise<void>}
     */
    async store(context, testQuestion) {
        await testQuestionsService.store(context, testQuestion)
    },

    /**
     *
     * @param context
     * @param testQuestion
     * @returns {Promise<void>}
     */
    async update(context, testQuestion) {
        await testQuestionsService.update(context, testQuestion)
    },
    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await testQuestionsService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param testQuestions
     */
    [types.SET_TEST_QUESTIONS]: (state, testQuestions) => {
        state.testQuestions = testQuestions
    },

    /**
     *
     * @param state
     * @param testQuestion
     */
    [types.SET_TEST_QUESTION]: (state, testQuestion) => {
        state.testQuestion = testQuestion
    },
    /**
     *
     * @param state
     * @param testQuestion
     */
    [types.SAVE_NEW_TEST_QUESTION]: (state, testQuestion) => {
        state.testQuestions.push(testQuestion)
        state.testQuestion = testQuestion

    },
    /**
     *
     * @param state
     * @param id
     */
    [types.SET_DELETE_TEST_QUESTION]: (state, id) => {
        let index = state.testQuestions.findIndex((c) => c.id === id);
        if (index > -1) {
            state.testQuestions.splice(index, 1);
            state.errors = []
        }
    },

    /**
     *
     * @param testQuestion
     */
    [types.SAVE_UPDATED_TEST_QUESTION]: (state, testQuestion) => {
        let index = state.testQuestions.findIndex((c) => c.id === testQuestion.id);
        if (index > -1) {
            state.testQuestions.splice(index, 1, testQuestion);
        }
    },

    /**
     *
     * @param state
     * @param errors
     */
    [types.TEST_QUESTION_ERRORS]: (state, errors) => {
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

