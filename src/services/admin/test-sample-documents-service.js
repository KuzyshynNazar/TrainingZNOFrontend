import * as types from '../../store/modules/admin/_mutayion-types';
const apiTestSampleDocuments = require('../../api/admin/test-sample-documents');

export default {
    /**
     *
     * @param context
     * @param testSampleDocuments
     */
    async store(context, testSampleDocuments) {
        let data=this.data(testSampleDocuments)
        await apiTestSampleDocuments.create(data, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_TEST_SAMPLE_DOCUMENTS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    async delete(context, id) {
        await apiTestSampleDocuments.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            console.log('delete')
        }).catch(err => {
            console.log(err)
        })
    },


    data(data){
        let dataForm = new FormData();
        if(data.documents!==null){
            for (let i = 0; i < data.documents.length; i++) {
                let document = data.documents[i];
                dataForm.append('documents[' + i + ']', document.file);
            }
        }
        dataForm.append('testSampleId', data.testSampleId);
        return dataForm
    },
}
