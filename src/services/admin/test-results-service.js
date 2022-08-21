import * as types from '../../store/mutayion-types';

const apiTestResult = require('../../api/admin/test-result');

export default {
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
