import * as types from '../../store/modules/app/_mutayion-types';

const apiAppNews = require('../../api/app/news');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiAppNews.index({
            // headers: {
            //     // 'Authorization': `Bearer ${context.rootGetters["auth/token"]}`,
            //     'Access-Control-Allow-Origin' : '*',
            //     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            // }
            headers: {'Authorization': `Bearer ${context.rootGetters["auth/token"]}` },
        }).then((response) => {
            context.commit(types.SET_APP_NEWS, response.data.data);
        }).catch(err => {
            context.commit(types.NEWS_APP_ERRORS, err.response.data.errors);
        });
    },


}
