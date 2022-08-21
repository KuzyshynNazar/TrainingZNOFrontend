import * as types from '../../mutayion-types';
import newsService from '../../../services/app/news-service';

const state = () => ({
    appNews: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    appNews: state => state.appNews,
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
}

const mutations = {
    /**
     *
     * @param state
     * @param appNews
     */
    [types.SET_APP_NEWS]: (state, appNews) => {
        state.appNews = appNews
    },


    /**
     *
     * @param state
     * @param errors
     */
    [types.NEWS_APP_ERRORS]: (state, errors) => {
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

