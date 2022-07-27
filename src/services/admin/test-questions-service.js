import * as types from '../../store/mutayion-types';

const apiTestQuestions = require('../../api/admin/test-questions');

export default {
    /**
     *
     * @param context
     * @param test_id
     * @returns {Promise<void>}
     */
    async  getAll(context,test_id) {
        await  apiTestQuestions.index({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            },
            params:{testId:test_id}
        }).then((response) => {
            context.commit(types.SET_TEST_QUESTIONS, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ERRORS, err.response.data.errors);
        });
    },
    async  show(context,test_question_id) {
        await  apiTestQuestions.show(test_question_id,{
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            },
        }).then((response) => {
            context.commit(types.SET_TEST_QUESTION, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ERRORS, err.response.data.errors);
        });
    },

    /**
     *
     * @param context
     * @param testQuestion
     */
    async store(context, testQuestion) {
        await apiTestQuestions.create(testQuestion, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TEST_QUESTION_ERRORS, []);
            context.commit(types.SAVE_NEW_TEST_QUESTION, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param testQuestion
     */
    async update(context, testQuestion) {
        await apiTestQuestions.update(testQuestion.id, testQuestion, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TEST_QUESTION_ERRORS, []);
            context.commit(types.SAVE_UPDATED_TEST_QUESTION, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async delete(context, id) {
        await apiTestQuestions.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            context.commit(types.SET_DELETE_TEST_QUESTION, id);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ERRORS, err.response.data.errors);
        })
    }
}
