import * as types from '../../store/modules/admin/_mutayion-types';
const apiTestQuestionPhotos = require('../../api/admin/test-question-photos');

export default {
    /**
     *
     * @param context
     * @param testQuestionPhotos
     */
    async store(context, testQuestionPhotos) {
        let data=this.data(testQuestionPhotos)
        await apiTestQuestionPhotos.create(data, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_TEST_QUESTION_PHOTOS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    async delete(context, id) {
        await apiTestQuestionPhotos.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            console.log('delete')
        }).catch(err => {
            context.commit(types.TEST_QUESTION_ERRORS, err.response.data.errors);
        })
    },


    data(data){
        let dataForm = new FormData();
        if(data.photos!==undefined){
            for (let i = 0; i < data.photos.length; i++) {
                let photo = data.photos[i];
                dataForm.append('photos[' + i + ']', photo.file);
            }
        }
        dataForm.append('testQuestionId', data.testQuestionId);
        return dataForm
    },
}
