import * as types from '../../mutayion-types';
import testStudentService from '../../../services/admin/test-students-service';

const state = () => ({
    testStudents: [],
})

const getters = {
    /**
     *
     * @param state
     */
    testStudents: state => state.testStudents,

};


const actions = {
    /**
     *
     * @param context
     * @param testStudents
     * @returns {Promise<void>}
     */
    async store(context, testStudents) {
        await testStudentService.store(context, testStudents)
    },

    /**
     *
     * @param context
     * @param testStudents
     * @returns {Promise<void>}
     */
    async update(context, testStudents) {
        await testStudentService.update(context, testStudents)
    },
    /**
     *
     * @param context
     * @param testStudents
     * @returns {Promise<void>}
     */
    async delete(context, testStudents) {
        await testStudentService.delete(context, testStudents)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param testStudents
     */
    [types.SAVE_NEW_TEST_STUDENTS]: (state, testStudents) => {
        state.testStudents = testStudents
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

