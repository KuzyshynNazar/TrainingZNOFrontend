import * as types from "./_mutayion-types";
import tasksService from '../../../services/app/tasks-service';

const state = () => ({
    tasks: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    tasks: state => state.tasks,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async getAll(context) {
        await tasksService.getAll(context)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param tasks
     */
    [types.SET_APP_TASKS]: (state, tasks) => {
        state.tasks = tasks
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

