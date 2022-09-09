import * as types from '../../store/modules/admin/_mutayion-types';
const apiFormulaDocuments = require('../../api/admin/formula-documents');

export default {
    /**
     *
     * @param context
     * @param formulaDocuments
     */
    async store(context, formulaDocuments) {
        let data=this.data(formulaDocuments)
        await apiFormulaDocuments.create(data, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_FORMULA_DOCUMENTS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    async delete(context, id) {
        await apiFormulaDocuments.delete(id, {
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
        dataForm.append('formulaId', data.formulaId);
        return dataForm
    },
}
