import * as types from '../../store/mutayion-types';

const apiTestQuestionTrueAnswers = require('../../api/admin/test-question-true-answers');

export default {
    /**
     *
     * @param context
     * @param test_question_id
     * @returns {Promise<void>}
     */
    async  getAll(context, test_question_id) {
        await  apiTestQuestionTrueAnswers.index({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            },
            params:{testQuestionId:test_question_id}
        }).then((response) => {
            context.commit(types.SET_TEST_QUESTION_TRUE_ANSWERS, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_TRUE_ANSWER_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param testQuestionTrueAnswer
     */
    async store(context, testQuestionTrueAnswer) {
        await apiTestQuestionTrueAnswers.create(testQuestionTrueAnswer, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TEST_QUESTION_TRUE_ANSWER_ERRORS, []);
            context.commit(types.SAVE_NEW_TEST_QUESTION_TRUE_ANSWER, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_TRUE_ANSWER_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param testQuestionTrueAnswer
     */
    async update(context, testQuestionTrueAnswer) {
        await apiTestQuestionTrueAnswers.update(testQuestionTrueAnswer.id, testQuestionTrueAnswer, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TEST_QUESTION_TRUE_ANSWER_ERRORS, []);
            context.commit(types.SAVE_UPDATED_TEST_QUESTION_TRUE_ANSWER, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_TRUE_ANSWER_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async delete(context, id) {
        await apiTestQuestionTrueAnswers.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            context.commit(types.SET_DELETE_TEST_QUESTION_TRUE_ANSWER, id);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_TRUE_ANSWER_ERRORS, err.response.data.errors);
        })
    }
}
