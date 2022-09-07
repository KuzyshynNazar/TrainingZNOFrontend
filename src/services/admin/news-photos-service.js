import * as types from '../../store/mutayion-types';
const apiNewsPhotos = require('../../api/admin/news-photos');

export default {
    /**
     *
     * @param context
     * @param newsPhotos
     */
    async store(context, newsPhotos) {
        let data=this.data(newsPhotos)
        await apiNewsPhotos.create(data, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_NEWS_PHOTOS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    async delete(context, id) {
        await apiNewsPhotos.delete(id, {
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
        console.log(data)
        if(data.photos!==null){
            for (let i = 0; i < data.photos.length; i++) {
                let photo = data.photos[i];
                dataForm.append('photos[' + i + ']', photo.file);
            }
        }
        dataForm.append('newsId', data.newsId);
        return dataForm
    },
}
