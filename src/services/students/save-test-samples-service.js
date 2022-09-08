import * as types from '../../store/mutayion-types';
const apiSaveTestSamples = require('../../api/student/save-test-samples');

export default {
    /**
     *
     * @param context
     */
    async  savedTestSamples(context) {
        await  apiSaveTestSamples.savedTestSamples({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_SAVED_TEST_SAMPLES, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    /**
     *
     * @param context
     * @param data
     * @returns {Promise<void>}
     */
    async  saveTestSample(context, data) {
        await  apiSaveTestSamples.saveTestSample(data,{
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`,
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_SAVED_TEST_SAMPLE, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    /**
     *
     * @param context
     * @param testSampleId
     */
    async deleteSavedTestSample(context, testSampleId) {
        await apiSaveTestSamples.deleteSavedTestSample( {
            headers: {'Authorization': `Bearer ${context.rootGetters["auth/token"]}` },
            params:{testSampleId:testSampleId}
        }).then(() => {
            context.commit(types.SET_DELETE_SAVED_TEST_SAMPLE, testSampleId);
        }).catch(err => {
            console.log(err)
        })
    }

}
