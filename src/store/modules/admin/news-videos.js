import newsVideosService from '../../../services/admin/news-videos-service';
import * as types from "@/store/mutayion-types";

const state = () => ({
    newsVideos: [],
})

const getters = {
    newsVideos: state => state.newsVideos,
};


const actions = {
    /**
     *
     * @param context
     * @param newsVideos
     * @returns {Promise<void>}
     */
    async store(context, newsVideos) {
        await newsVideosService.store(context, newsVideos)
    },
      /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await newsVideosService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param newsVideos
     */
    [types.SAVE_NEW_NEWS_VIDEOS]: (state, newsVideos) => {
        state.newsVideos = newsVideos
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

