import * as types from '../../store/mutayion-types';

const apiTestSamples = require('../../api/admin/test-samples');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiTestSamples.index({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_TEST_SAMPLES, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_SAMPLE_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param news
     */
    async store(context, news) {
        await apiTestSamples.create(news, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TEST_SAMPLE_ERRORS, []);
            context.commit(types.SAVE_NEW_TEST_SAMPLE, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_SAMPLE_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async show(context, id) {
        await apiTestSamples.show(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_TEST_SAMPLE, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_SAMPLE_ERRORS, err.response.data.errors);
        });
    },

    /**
     *
     * @param context
     * @param formula
     */
    async update(context, formula) {
        await apiTestSamples.update(formula.id, formula, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TEST_SAMPLE_ERRORS, []);
            context.commit(types.SAVE_UPDATED_TEST_SAMPLE, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_SAMPLE_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async delete(context, id) {
        await apiTestSamples.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            context.commit(types.SET_DELETE_TEST_SAMPLE, id);
        }).catch(err => {
            context.commit(types.TEST_SAMPLE_ERRORS, err.response.data.errors);
        })
    }
}
