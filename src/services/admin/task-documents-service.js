import * as types from '../../store/modules/admin/_mutayion-types';
const apiTaskDocuments = require('../../api/admin/task-documents');

export default {
    /**
     *
     * @param context
     * @param taskDocuments
     */
    async store(context, taskDocuments) {
        let data=this.data(taskDocuments)
        await apiTaskDocuments.create(data, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_TASK_DOCUMENTS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    async delete(context, id) {
        await apiTaskDocuments.delete(id, {
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
        dataForm.append('taskId', data.taskId);
        return dataForm
    },
}
