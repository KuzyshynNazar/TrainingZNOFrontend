import * as types from "./_mutayion-types";
import testQuestionAnswersService from '../../../services/admin/test-question-answers-service';

const state = () => ({
    testQuestionAnswers: [],
    testQuestionAnswer: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    testQuestionAnswers: state => state.testQuestionAnswers,
    testQuestionAnswer: state => state.testQuestionAnswer,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @param test_question_id
     * @returns {Promise<void>}
     */
    async getAll(context,test_question_id) {
        await testQuestionAnswersService.getAll(context,test_question_id)
    },

    /**
     *
     * @param context
     * @param testQuestion
     * @returns {Promise<void>}
     */
    async store(context, testQuestion) {
        await testQuestionAnswersService.store(context, testQuestion)
    },

    /**
     *
     * @param context
     * @param testQuestion
     * @returns {Promise<void>}
     */
    async update(context, testQuestion) {
        await testQuestionAnswersService.update(context, testQuestion)
    },
    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await testQuestionAnswersService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param testQuestions
     */
    [types.SET_TEST_QUESTION_ANSWERS]: (state, testQuestionAnswers) => {
        state.testQuestionAnswers = testQuestionAnswers
    },


    /**
     *
     * @param state
     * @param testQuestionAnswer
     */
    [types.SAVE_NEW_TEST_QUESTION_ANSWER]: (state, testQuestionAnswer) => {
        state.testQuestionAnswers.unshift(testQuestionAnswer)
        state.testQuestionAnswer = testQuestionAnswer

    },
    /**
     *
     * @param state
     * @param id
     */
    [types.SET_DELETE_TEST_QUESTION_ANSWER]: (state, id) => {
        let index = state.testQuestionAnswers.findIndex((c) => c.id === id);
        if (index > -1) {
            state.testQuestionAnswers.splice(index, 1);
            state.errors = []
        }
    },

    /**
     *
     * @param testQuestionAnswer
     */
    [types.SAVE_UPDATED_TEST_QUESTION_ANSWER]: (state, testQuestionAnswer) => {
        let index = state.testQuestionAnswers.findIndex((c) => c.id === testQuestionAnswer.id);
        if (index > -1) {
            state.testQuestionAnswers.splice(index, 1, testQuestionAnswer);
        }
    },

    /**
     *
     * @param state
     * @param errors
     */
    [types.TEST_QUESTION_ANSWER_ERRORS]: (state, errors) => {
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

