import * as types from "./_mutayion-types";
import testStudentService from '../../../services/admin/test-students-service';

const state = () => ({
    testStudents: [],
    testStudent: [],
    testsCheckedStudent: [],
})

const getters = {
    /**
     *
     * @param state
     */
    testStudents: state => state.testStudents,
    testStudent: state => state.testStudent,
    testsCheckedStudent: state => state.testsCheckedStudent,

};


const actions = {
    /**
     *
     * @param context
     * @param data
     * @returns {Promise<void>}
     */
    async getTestStudentByTestIdByStudentId(context, data) {
        await testStudentService.getTestStudentByTestIdByStudentId(context, data)
    },

    /**
     *
     * @param context
     * @param data
     * @returns {Promise<void>}
     */
    async getTestStudentByStudentId(context, data) {
        await testStudentService.getTestStudentByStudentId(context, data)
    },
    /**
     *
     * @param context
     * @param data
     * @returns {Promise<void>}
     */
    async getTestStudentCheckedByStudentId(context, data) {
        await testStudentService.getTestStudentCheckedByStudentId(context, data)
    },

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
     * @param data
     * @returns {Promise<void>}
     */
    async checked(context, data) {
        await testStudentService.checked(context, data)
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
    /**
     *
     * @param state
     * @param testStudents
     */
    [types.SET_TEST_STUDENT]: (state, testStudent) => {
        state.testStudent = testStudent
    },

    /**
     *
     * @param state
     * @param testStudents
     */
    [types.SET_TESTS_STUDENT]: (state, testStudents) => {
        state.testStudents = testStudents
    }, /**
     *
     * @param state
     * @param testsCheckedStudent
     */
    [types.SET_TESTS_CHECKED_STUDENT]: (state, testsCheckedStudent) => {
        state.testsCheckedStudent = testsCheckedStudent
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

