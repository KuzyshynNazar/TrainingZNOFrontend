import * as types from '../../store/modules/admin/_mutayion-types';

const apiTestQuestionAnswers = require('../../api/admin/test-question-answers');

export default {
    /**
     *
     * @param context
     * @param test_question_id
     * @returns {Promise<void>}
     */
    async  getAll(context, test_question_id) {
        await  apiTestQuestionAnswers.index({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            },
            params:{testQuestionId:test_question_id}
        }).then((response) => {
            context.commit(types.SET_TEST_QUESTION_ANSWERS, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ANSWER_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param testQuestionAnswer
     */
    async store(context, testQuestionAnswer) {
        await apiTestQuestionAnswers.create(testQuestionAnswer, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TEST_QUESTION_ANSWER_ERRORS, []);
            context.commit(types.SAVE_NEW_TEST_QUESTION_ANSWER, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ANSWER_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param testQuestionAnswer
     */
    async update(context, testQuestionAnswer) {
        await apiTestQuestionAnswers.update(testQuestionAnswer.id, testQuestionAnswer, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TEST_QUESTION_ANSWER_ERRORS, []);
            context.commit(types.SAVE_UPDATED_TEST_QUESTION_ANSWER, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ANSWER_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async delete(context, id) {
        await apiTestQuestionAnswers.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            context.commit(types.SET_DELETE_TEST_QUESTION_ANSWER, id);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ANSWER_ERRORS, err.response.data.errors);
        })
    }
}
