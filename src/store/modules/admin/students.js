import * as types from '../../mutayion-types';
import studentService from '../../../services/admin/students-service';

const state = () => ({
    students: [],
    studentsTestResult: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    students: state => state.students,
    studentsTestResult: state => state.studentsTestResult,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async getAll(context) {
        await studentService.getAll(context)
    },

    /**
     *
     * @param context
     * @param data
     * @returns {Promise<void>}
     */
    async getStudentTestResult(context, data) {
        await studentService.getStudentTestResult(context, data)
    },


    /**
     *
     * @param context
     * @param student
     * @returns {Promise<void>}
     */
    async store(context, student) {
        await studentService.store(context, student)
    },

    /**
     *
     * @param context
     * @param student
     * @returns {Promise<void>}
     */
    async update(context, student) {
        await studentService.update(context, student)
    },
    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await studentService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param students
     */
    [types.SET_STUDENTS]: (state, students) => {
        state.students = students
    },


    /**
     *
     * @param state
     * @param studentsTestResult
     */
    [types.SET_STUDENT_TEST_RESULT]: (state, studentsTestResult) => {
        state.studentsTestResult = studentsTestResult
    },



    /**
     *
     * @param state
     * @param student
     */
    [types.SAVE_NEW_STUDENT]: (state, student) => {
        state.students.unshift(student)

    },
    /**
     *
     * @param state
     * @param id
     */
    [types.SET_DELETE_STUDENT]: (state, id) => {
        let index = state.students.findIndex((c) => c.id === id);
        if (index > -1) {
            state.students.splice(index, 1);
            state.errors=[]
        }
    },

    /**
     *
     * @param state
     * @param student
     */
    [types.SAVE_UPDATED_STUDENT]: (state, student) => {
        let index = state.students.findIndex((c) => c.id === student.id);
        if (index > -1) {
            state.students.splice(index, 1, student);
        }
    },

    [types.STUDENT_ERRORS]: (state, errors) => {
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

