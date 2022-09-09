import * as types from '../../store/modules/admin/_mutayion-types';

const apiTestQuestions = require('../../api/admin/test-questions');

export default {
    /**
     *
     * @param context
     * @param test_id
     * @returns {Promise<void>}
     */
    async  getAll(context,test_id) {
        await  apiTestQuestions.index({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            },
            params:{testId:test_id}
        }).then((response) => {
            context.commit(types.SET_TEST_QUESTIONS, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ERRORS, err.response.data.errors);
        });
    },
    async  show(context,test_question_id) {
        await  apiTestQuestions.show(test_question_id,{
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            },
        }).then((response) => {
            context.commit(types.SET_TEST_QUESTION, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ERRORS, err.response.data.errors);
        });
    },

    /**
     *
     * @param context
     * @param testQuestion
     */
    async store(context, testQuestion) {
        // let data=this.data(testQuestion)
        await apiTestQuestions.create(testQuestion, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`,
                "Content-Type": "multipart/form-data",
            }
        }).then((response) => {
            context.commit(types.TEST_QUESTION_ERRORS, []);
            context.commit(types.SAVE_NEW_TEST_QUESTION, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param testQuestion
     */
    async update(context, testQuestion) {
        // console.log(testQuestion)
        // let data=this.dataEdit(testQuestion)
        await apiTestQuestions.update(testQuestion.id, testQuestion, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TEST_QUESTION_ERRORS, []);
            context.commit(types.SAVE_UPDATED_TEST_QUESTION, response.data.data);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async delete(context, id) {
        await apiTestQuestions.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            context.commit(types.SET_DELETE_TEST_QUESTION, id);
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ERRORS, err.response.data.errors);
        })
    },

    // data(data){
    //     let dataForm = new FormData();
    //     if(data.photos!==undefined){
    //         for (let i = 0; i < data.photos.length; i++) {
    //             let photo = data.photos[i];
    //             dataForm.append('photos[' + i + ']', photo.file);
    //         }
    //     }
    //     dataForm.append('question', data.question);
    //     dataForm.append('status', data.status);
    //     dataForm.append('test_id', data.test_id);
    //     dataForm.append('question_type_id', data.question_type_id);
    //     dataForm.append('points', data.points);
    //     return dataForm
    // },
    // dataEdit(data){
    //     let dataForm = new FormData();
    //     if(data.file!==undefined){
    //         for (let i = 0; i < data.file.length; i++) {
    //             let photo = data.file[i];
    //             dataForm.append('photos[' + i + ']', photo.file);
    //         }
    //     }
    //     dataForm.append('test_id', data.test_id);
    //     dataForm.append('question', data.question);
    //     dataForm.append('status', data.status);
    //     dataForm.append('question_type_id', data.question_type_id);
    //     dataForm.append('points', data.points);
    //     return dataForm
    // },
}
