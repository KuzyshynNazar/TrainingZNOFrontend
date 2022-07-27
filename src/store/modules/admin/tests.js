import * as types from '../../mutayion-types';
import testService from '../../../services/admin/tests-service';

const state = () => ({
    tests: [],
    test: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    tests: state => state.tests,
    test: state => state.test,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async getAll(context) {
        await testService.getAll(context)
    },

    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async show(context,id) {
        await testService.show(context, id)
    },

    /**
     *
     * @param context
     * @param test
     * @returns {Promise<void>}
     */
    async store(context, test) {
        await testService.store(context, test)
    },

    /**
     *
     * @param context
     * @param test
     * @returns {Promise<void>}
     */
    async update(context, test) {
        await testService.update(context, test)
    },
    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await testService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param tests
     */
    [types.SET_TESTS]: (state, tests) => {
        state.tests = tests
    },
    /**
     *
     * @param state
     * @param test
     */
    [types.SET_TEST]: (state, test) => {
        state.test = test
    },


    /**
     *
     * @param state
     * @param test
     */
    [types.SAVE_NEW_TEST]: (state, test) => {
        state.tests.unshift(test)
        state.test = test

    },
    /**
     *
     * @param state
     * @param id
     */
    [types.SET_DELETE_TEST]: (state, id) => {
        let index = state.tests.findIndex((c) => c.id === id);
        if (index > -1) {
            state.tests.splice(index, 1);
            state.errors = []
        }
    },

    /**
     *
     * @param tests
     * @param student
     */
    [types.SAVE_UPDATED_TEST]: (state, tests) => {
        let index = state.tests.findIndex((c) => c.id === tests.id);
        if (index > -1) {
            state.tests.splice(index, 1, tests);
        }
    },

    /**
     *
     * @param state
     * @param errors
     */
    [types.TEST_ERRORS]: (state, errors) => {
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

