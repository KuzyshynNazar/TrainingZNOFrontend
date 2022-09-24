import * as types from "./_mutayion-types";
import studentTestsService from '../../../services/students/student-tests-service';

const state = () => ({
    studentTests: [],
    testsCheckedStudent: [],

})

const getters = {
    /**
     *
     * @param state
     */
    studentTests: state => state.studentTests,
    testsCheckedStudent: state => state.testsCheckedStudent,


};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async getStudentTests(context) {
        await studentTestsService.getStudentTests(context)
    },

    async edit(context, data) {
        await studentTestsService.edit(context, data)
    },

    /**
     *
     * @param context
     * @param data
     * @returns {Promise<void>}
     */
    async getTestStudentCheckedByStudentId(context, data) {
        await studentTestsService.getTestStudentCheckedByStudentId(context, data)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param studentTests
     */
    [types.SET_STUDENT_TESTS]: (state, studentTests) => {
        state.studentTests = studentTests
    },

    /**
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

