import * as types from '../../store/mutayion-types';
const apiNewsDocuments = require('../../api/admin/news-documents');

export default {
    /**
     *
     * @param context
     * @param newsDocuments
     */
    async store(context, newsDocuments) {
        let data=this.data(newsDocuments)
        await apiNewsDocuments.create(data, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_NEWS_DOCUMENTS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    async delete(context, id) {
        await apiNewsDocuments.delete(id, {
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
        dataForm.append('newsId', data.newsId);
        return dataForm
    },
}
