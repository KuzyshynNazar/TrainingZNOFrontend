import * as types from '../../store/mutayion-types';

const apiAppTestSamples = require('../../api/app/test-samples');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiAppTestSamples.index({
            headers: {'Authorization': `Bearer ${context.rootGetters["auth/token"]}` },
        }).then((response) => {
            context.commit(types.SET_APP_TEST_SAMPLES, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },


}
