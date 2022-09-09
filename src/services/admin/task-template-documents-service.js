import * as types from '../../store/modules/admin/_mutayion-types';
const apiTaskTemplateDocuments = require('../../api/admin/task-template-documents');

export default {
    /**
     *
     * @param context
     * @param taskTemplateDocuments
     */
    async store(context, taskTemplateDocuments) {
        let data=this.data(taskTemplateDocuments)
        await apiTaskTemplateDocuments.create(data, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_TASK_TEMPLATE_DOCUMENTS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    async delete(context, id) {
        await apiTaskTemplateDocuments.delete(id, {
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
        dataForm.append('taskTemplateId', data.taskTemplateId);
        return dataForm
    },
}
