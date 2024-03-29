import * as types from '../../store/modules/admin/_mutayion-types';

const apiStudents = require('../../api/admin/students');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiStudents.index({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_STUDENTS, response.data.data);
        }).catch(err => {
            context.commit(types.STUDENT_ERRORS, err.response.data.errors);
        });
    },

    /**
     *
     * @param context
     * @param data
     * @returns {Promise<void>}
     */
    async  getStudentTestResult(context, data) {
        await  apiStudents.getStudentTestResult({
            headers: {'Authorization': `Bearer ${context.rootGetters["auth/token"]}`},
            params:{studentId:data.studentId, testId:data.testId}
        }).then((response) => {
            context.commit(types.SET_STUDENT_TEST_RESULT, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },

    /**
     *
     * @param context
     * @param student
     */
    async store(context, student) {
        await apiStudents.create(student, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.STUDENT_ERRORS, []);
            context.commit(types.SAVE_NEW_STUDENT, response.data.data);
        }).catch(err => {
            context.commit(types.STUDENT_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param student
     */
    async update(context, student) {
        await apiStudents.update(student.id, student, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.STUDENT_ERRORS, []);
            context.commit(types.SAVE_UPDATED_STUDENT, response.data.data);
        }).catch(err => {
            context.commit(types.STUDENT_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async delete(context, id) {
        await apiStudents.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            context.commit(types.SET_DELETE_STUDENT, id);
        }).catch(err => {
            context.commit(types.STUDENT_ERRORS, err.response.data.errors);
        })
    }
}
