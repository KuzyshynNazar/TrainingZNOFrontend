import * as types from "./_mutayion-types";
import tasksService from '../../../services/admin/task-service';

const state = () => ({
    tasks: [],
    task: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    tasks: state => state.tasks,
    task: state => state.task,
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

    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async show(context,id) {
        await tasksService.show(context, id)
    },

    /**
     *
     * @param context
     * @param task
     * @returns {Promise<void>}
     */
    async store(context, task) {
        await tasksService.store(context, task)
    },

    /**
     *
     * @param context
     * @param task
     * @returns {Promise<void>}
     */
    async update(context, task) {
        await tasksService.update(context, task)
    },
    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await tasksService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param tasks
     */
    [types.SET_TASKS]: (state, tasks) => {
        state.tasks = tasks
    },
    /**
     *
     * @param state
     * @param task
     */
    [types.SET_TASK]: (state, task) => {
        state.task = task
    },


    /**
     *
     * @param state
     * @param task
     */
    [types.SAVE_NEW_TASK]: (state, task) => {
        state.tasks.unshift(task)
        state.task=task
    },
    /**
     *
     * @param state
     * @param id
     */
    [types.SET_DELETE_TASK]: (state, id) => {
        let index = state.tasks.findIndex((c) => c.id === id);
        if (index > -1) {
            state.tasks.splice(index, 1);
        }
    },

    /**
     *
     * @param task
     */
    [types.SAVE_UPDATED_TASK]: (state, task) => {
        let index = state.tasks.findIndex((c) => c.id === task.id);
        if (index > -1) {
            state.tasks.splice(index, 1, task);
        }
    },

    /**
     *
     * @param state
     * @param errors
     */
    [types.TASK_ERRORS]: (state, errors) => {
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

