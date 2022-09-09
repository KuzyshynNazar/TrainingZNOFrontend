import * as types from "./_mutayion-types";
import taskTemplatesService from '../../../services/app/task-templates-service';

const state = () => ({
    taskTemplates: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    taskTemplates: state => state.taskTemplates,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async getAll(context) {
        await taskTemplatesService.getAll(context)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param taskTemplates
     */
    [types.SET_APP_TASK_TEMPLATES]: (state, taskTemplates) => {
        state.taskTemplates = taskTemplates
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

