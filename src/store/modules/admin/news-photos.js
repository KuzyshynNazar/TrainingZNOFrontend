import newsPhotosService from '../../../services/admin/news-photos-service';
import * as types from "@/store/mutayion-types";

const state = () => ({
    newsPhotos: [],
})

const getters = {
    newsPhotos: state => state.newsPhotos,
};


const actions = {
    /**
     *
     * @param context
     * @param newsPhotos
     * @returns {Promise<void>}
     */
    async store(context, newsPhotos) {
        await newsPhotosService.store(context, newsPhotos)
    },
      /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await newsPhotosService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param newsPhotos
     */
    [types.SAVE_NEW_NEWS_PHOTOS]: (state, newsPhotos) => {
        state.newsPhotos = newsPhotos
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

