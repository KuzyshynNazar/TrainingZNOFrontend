import * as types from '../../mutayion-types';
import newsService from '../../../services/admin/news-service';

const state = () => ({
    news: [],
    oneNews: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    news: state => state.news,
    oneNews: state => state.oneNews,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async getAll(context) {
        await newsService.getAll(context)
    },

    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async show(context,id) {
        await newsService.show(context, id)
    },

    /**
     *
     * @param context
     * @param news
     * @returns {Promise<void>}
     */
    async store(context, news) {
        await newsService.store(context, news)
    },

    /**
     *
     * @param context
     * @param news
     * @returns {Promise<void>}
     */
    async update(context, news) {
        await newsService.update(context, news)
    },
    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await newsService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param news
     */
    [types.SET_NEWS]: (state, news) => {
        state.news = news
    },
    /**
     *
     * @param state
     * @param oneNews
     */
    [types.SET_ONE_NEWS]: (state, oneNews) => {
        state.oneNews = oneNews
    },


    /**
     *
     * @param state
     * @param oneNews
     */
    [types.SAVE_NEW_NEWS]: (state, oneNews) => {
        state.news.unshift(oneNews)
        state.oneNews=oneNews
    },
    /**
     *
     * @param state
     * @param id
     */
    [types.SET_DELETE_NEWS]: (state, id) => {
        let index = state.news.findIndex((c) => c.id === id);
        if (index > -1) {
            state.news.splice(index, 1);
        }
    },

    /**
     *
     * @param oneNews
     * @param student
     */
    [types.SAVE_UPDATED_NEWS]: (state, oneNews) => {
        let index = state.news.findIndex((c) => c.id === oneNews.id);
        if (index > -1) {
            state.news.splice(index, 1, oneNews);
        }
    },

    /**
     *
     * @param state
     * @param errors
     */
    [types.NEWS_ERRORS]: (state, errors) => {
        state.errors = errors
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

