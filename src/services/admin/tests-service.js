import * as types from '../../store/mutayion-types';

const apiTests = require('../../api/admin/tests');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiTests.index({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_TESTS, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param test
     */
    async store(context, test) {
        await apiTests.create(test, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TEST_ERRORS, []);
            context.commit(types.SAVE_NEW_TEST, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async show(context, id) {
        await apiTests.show(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_TEST, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_ERRORS, err.response.data.errors);
        });
    },

    /**
     *
     * @param context
     * @param test
     */
    async update(context, test) {
        await apiTests.update(test.id, test, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TEST_ERRORS, []);
            context.commit(types.SAVE_UPDATED_TEST, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async delete(context, id) {
        await apiTests.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            context.commit(types.SET_DELETE_TEST, id);
        }).catch(err => {
            context.commit(types.TEST_ERRORS, err.response.data.errors);
        })
    }
}
