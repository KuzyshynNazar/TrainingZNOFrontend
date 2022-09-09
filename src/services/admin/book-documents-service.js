import * as types from '../../store/modules/admin/_mutayion-types';
const apiBookDocuments = require('../../api/admin/book-documents');

export default {
    /**
     *
     * @param context
     * @param bookDocuments
     */
    async store(context, bookDocuments) {
        let data=this.data(bookDocuments)
        await apiBookDocuments.create(data, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_BOOK_DOCUMENTS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    async delete(context, id) {
        await apiBookDocuments.delete(id, {
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
        dataForm.append('bookId', data.bookId);
        return dataForm
    },
}
