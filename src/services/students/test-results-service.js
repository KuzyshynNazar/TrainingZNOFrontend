import * as types from '../../store/modules/students/_mutayion-types';

const apiTestResult = require('../../api/student/test-result');

export default {
    /**
     *
     * @param context
     * @param testId
     */
    async getTestResults(context, testId) {
        await apiTestResult.index( {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`,
                'Content-Type': 'application/json'
            },
            params:{
                testId:testId
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_TEST_RESULT, response.data.data);
        }).catch(err => {
            console.log(err.response.data.errors)
        });
    },
     /**
     *
     * @param context
     * @param testQuestion
     */
    async store(context, testQuestion) {
        await apiTestResult.create(testQuestion, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`,
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_TEST_RESULT, response.data.data);
        }).catch(err => {
            console.log(err.response.data.errors)
        });
    },

}
