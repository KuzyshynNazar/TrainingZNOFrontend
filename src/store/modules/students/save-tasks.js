import * as types from "./_mutayion-types";
import saveTasksService from '../../../services/students/save-tasks-service';

const state = () => ({
    saveTasks: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    saveTasks: state => state.saveTasks,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async savedTasks(context) {
        await saveTasksService.savedTasks(context)
    },
    /**
     *
     * @param context
     * @param data
     * @returns {Promise<void>}
     */
    async saveTask(context, data) {
        await saveTasksService.saveTask(context, data)
    },
    /**
     *
     * @param context
     * @param taskId
     * @returns {Promise<void>}
     */
    async deleteSavedTask(context, taskId) {
        await saveTasksService.deleteSavedTask(context, taskId)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param saveTasks
     */
    [types.SET_SAVED_TASKS]: (state, saveTasks) => {
        state.saveTasks = saveTasks
    },
    /**
     *
     * @param state
     * @param saveTask
     */
    [types.SAVE_NEW_SAVED_TASK]: (state, saveTask) => {
        state.saveTasks.push(saveTask)
    },

    /**
     *
     * @param state
     * @param taskId
     */
    [types.SET_DELETE_SAVED_TASK]: (state, taskId) => {
        let index = state.saveTasks.findIndex((c) => c.id === taskId);
        if (index > -1) {
            state.saveTasks.splice(index, 1);
        }
    },


    /**
     *
     * @param state
     * @param errors
     */
    [types.BOOKS_APP_ERRORS]: (state, errors) => {
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

