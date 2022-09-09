import * as types from "./_mutayion-types";
import questionTypesService from "@/services/admin/question-types-service";

const state = () => ({
    questionTypes: [],
})

const getters = {
    /**
     *
     * @param state
     */
    questionTypes: state => state.questionTypes,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async getAll(context) {
        await questionTypesService.getAll(context)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param questionTypes
     */
    [types.SET_QUESTION_TYPES]: (state, questionTypes) => {
        state.questionTypes = questionTypes
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

