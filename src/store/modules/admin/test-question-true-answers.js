import * as types from '../../mutayion-types';
import testQuestionTrueAnswersService from '../../../services/admin/test-question-true-answers-service';

const state = () => ({
    testQuestionTrueAnswers: [],
    testQuestionTrueAnswer: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    testQuestionTrueAnswers: state => state.testQuestionTrueAnswers,
    testQuestionTrueAnswer: state => state.testQuestionTrueAnswer,
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
        await testQuestionTrueAnswersService.getAll(context,test_question_id)
    },

    /**
     *
     * @param context
     * @param testQuestionTrueAnswer
     * @returns {Promise<void>}
     */
    async store(context, testQuestionTrueAnswer) {
        await testQuestionTrueAnswersService.store(context, testQuestionTrueAnswer)
    },

    /**
     *
     * @param context
     * @param testQuestionTrueAnswer
     * @returns {Promise<void>}
     */
    async update(context, testQuestionTrueAnswer) {
        await testQuestionTrueAnswersService.update(context, testQuestionTrueAnswer)
    },
    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await testQuestionTrueAnswersService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param testQuestionTrueAnswers
     */
    [types.SET_TEST_QUESTION_TRUE_ANSWERS]: (state, testQuestionTrueAnswers) => {
        state.testQuestionTrueAnswers = testQuestionTrueAnswers
    },


    /**
     *
     * @param state
     * @param testQuestionTrueAnswer
     */
    [types.SAVE_NEW_TEST_QUESTION_TRUE_ANSWER]: (state, testQuestionTrueAnswer) => {
        state.testQuestionTrueAnswers.unshift(testQuestionTrueAnswer)

    },
    /**
     *
     * @param state
     * @param id
     */
    [types.SET_DELETE_TEST_QUESTION_TRUE_ANSWER]: (state, id) => {
        let index = state.testQuestionTrueAnswer.findIndex((c) => c.id === id);
        if (index > -1) {
            state.testQuestionTrueAnswer.splice(index, 1);
            state.errors = []
        }
    },

    /**
     *
     * @param testQuestionTrueAnswer
     */
    [types.SAVE_UPDATED_TEST_QUESTION_TRUE_ANSWER]: (state, testQuestionTrueAnswer) => {
        let index = state.testQuestionTrueAnswers.findIndex((c) => c.id === testQuestionTrueAnswer.id);
        if (index > -1) {
            state.testQuestionTrueAnswers.splice(index, 1, testQuestionTrueAnswer);
        }
    },

    /**
     *
     * @param state
     * @param errors
     */
    [types.TEST_QUESTION_TRUE_ANSWER_ERRORS]: (state, errors) => {
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

