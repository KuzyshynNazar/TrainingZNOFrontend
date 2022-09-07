import * as types from '../../store/mutayion-types';

const apiTestStudents = require('../../api/admin/test-students');

export default {
    /**
     *
     * @param context
     * @param testStudents
     */
    async store(context, testStudents) {
        await apiTestStudents.create(testStudents, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_TEST_STUDENTS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },

    /**
     *
     * @param context
     * @param data
     */
    async getTestStudentByTestIdByStudentId(context,data) {
        await apiTestStudents.getTestStudentByTestIdByStudentId( {
            headers: { 'Authorization': `Bearer ${context.rootGetters["auth/token"]}`},
            params:{testId:data.testId, studentId:data.studentId}
        }).then((response) => {
            context.commit(types.SET_TEST_STUDENT, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },

    /**
     *
     * @param context
     * @param data
     */
    async getTestStudentByStudentId(context,data) {
        await apiTestStudents.getTestStudentByStudentId( {
            headers: { 'Authorization': `Bearer ${context.rootGetters["auth/token"]}`},
            params:{studentId:data.studentId}
        }).then((response) => {
            context.commit(types.SET_TESTS_STUDENT, response.data.data);
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
        await apiTestStudents.getTestStudentCheckedByStudentId( {
            headers: { 'Authorization': `Bearer ${context.rootGetters["auth/token"]}`},
            params:{studentId:data.studentId}
        }).then((response) => {
            context.commit(types.SET_TESTS_CHECKED_STUDENT, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },

    /**
     *
     * @param context
     * @param testStudents
     */
    async update(context, testStudents) {
        await apiTestStudents.update(testStudents, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_TEST_STUDENTS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    /**
     *
     * @param context
     * @param data
     */
    async checked(context,  data) {
        await apiTestStudents.checked(data.id,data, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            console.log(response.data.data)
            // context.commit(types.SAVE_NEW_TEST_STUDENTS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    /**
     *
     * @param context
     * @param testStudents
     */
    async delete(context, testStudents) {
        await apiTestStudents.delete( {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            },
            params:{
                test_id:testStudents.test_id
            }
        }).then((res) => {
            console.log(res)
            // context.commit(types.SET_DELETE_STUDENT, id);
        }).catch(err => {
            console.log(err)
            // context.commit(types.STUDENT_ERRORS, err.response.data.errors);
        })
    }
}
