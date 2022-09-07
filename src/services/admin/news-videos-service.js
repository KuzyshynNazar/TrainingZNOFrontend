import * as types from '../../store/mutayion-types';
const apiNewsVideos = require('../../api/admin/news-videos');

export default {
    /**
     *
     * @param context
     * @param newsVideos
     */
    async store(context, newsVideos) {
        let data=this.data(newsVideos)
        await apiNewsVideos.create(data, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_NEWS_VIDEOS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    async delete(context, id) {
        await apiNewsVideos.delete(id, {
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
        if(data.videos!==null){
            for (let i = 0; i < data.videos.length; i++) {
                let video = data.videos[i];
                dataForm.append('videos[' + i + ']', video.file);
            }
        }
        dataForm.append('newsId', data.newsId);
        return dataForm
    },
}
