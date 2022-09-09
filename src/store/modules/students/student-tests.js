import * as types from "./_mutayion-types";
import studentTestsService from '../../../services/students/student-tests-service';

const state = () => ({
    studentTests: [],
})

const getters = {
    /**
     *
     * @param state
     */
    studentTests: state => state.studentTests,

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
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

