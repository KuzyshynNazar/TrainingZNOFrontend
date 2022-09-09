import * as types from '../../store/modules/admin/_mutayion-types';

const apiNews = require('../../api/admin/news');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiNews.index({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_NEWS, response.data.data);
        }).catch(err => {
            context.commit(types.NEWS_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param news
     */
    async store(context, news) {
        await apiNews.create(news, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.NEWS_ERRORS, []);
            context.commit(types.SAVE_NEW_NEWS, response.data.data);
        }).catch(err => {
            context.commit(types.NEWS_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async show(context, id) {
        await apiNews.show(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_ONE_NEWS, response.data.data);
        }).catch(err => {
            context.commit(types.NEWS_ERRORS, err.response.data.errors);
        });
    },

    /**
     *
     * @param context
     * @param news
     */
    async update(context, news) {
        await apiNews.update(news.id, news, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.NEWS_ERRORS, []);
            context.commit(types.SAVE_UPDATED_NEWS, response.data.data);
        }).catch(err => {
            context.commit(types.NEWS_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async delete(context, id) {
        await apiNews.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            context.commit(types.SET_DELETE_NEWS, id);
        }).catch(err => {
            context.commit(types.NEWS_ERRORS, err.response.data.errors);
        })
    }
}
