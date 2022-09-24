import * as types from '../../store/modules/students/_mutayion-types';
const apiStudentTests = require('../../api/student/student-tests');

export default {
    /**
     *
     * @param context
     */
    async getStudentTests(context) {
        await apiStudentTests.studentTests({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_STUDENT_TESTS, response.data.data);
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
    async edit(context, data) {
        await apiStudentTests.update(data.id, data, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            console.log(response.data.data)
            // context.commit(types.SET_STUDENT_TESTS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },


    /**
     *
     * @param context
     * @param data
     */
    async getTestStudentCheckedByStudentId(context,data) {
        await apiStudentTests.getTestStudentCheckedByStudentId( {
            headers: { 'Authorization': `Bearer ${context.rootGetters["auth/token"]}`},
            params:{studentId:data.studentId}
        }).then((response) => {
            context.commit(types.SET_TESTS_CHECKED_STUDENT, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
}
