import * as types from "./_mutayion-types";
import taskTemplatesService from '../../../services/admin/task-template-service';

const state = () => ({
    taskTemplates: [],
    taskTemplate: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    taskTemplates: state => state.taskTemplates,
    taskTemplate: state => state.taskTemplate,
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

    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async show(context,id) {
        await taskTemplatesService.show(context, id)
    },

    /**
     *
     * @param context
     * @param taskTemplate
     * @returns {Promise<void>}
     */
    async store(context, taskTemplate) {
        await taskTemplatesService.store(context, taskTemplate)
    },

    /**
     *
     * @param context
     * @param taskTemplate
     * @returns {Promise<void>}
     */
    async update(context, taskTemplate) {
        await taskTemplatesService.update(context, taskTemplate)
    },
    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await taskTemplatesService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param taskTemplates
     */
    [types.SET_TASK_TEMPLATES]: (state, taskTemplates) => {
        state.taskTemplates = taskTemplates
    },
    /**
     *
     * @param state
     * @param taskTemplate
     */
    [types.SET_TASK_TEMPLATE]: (state, taskTemplate) => {
        state.taskTemplate = taskTemplate
    },


    /**
     *
     * @param state
     * @param taskTemplate
     */
    [types.SAVE_NEW_TASK_TEMPLATE]: (state, taskTemplate) => {
        state.taskTemplates.unshift(taskTemplate)
        state.taskTemplate=taskTemplate
    },
    /**
     *
     * @param state
     * @param id
     */
    [types.SET_DELETE_TASK_TEMPLATE]: (state, id) => {
        let index = state.taskTemplates.findIndex((c) => c.id === id);
        if (index > -1) {
            state.taskTemplates.splice(index, 1);
        }
    },

    /**
     *
     * @param taskTemplate
     */
    [types.SAVE_UPDATED_TASK_TEMPLATE]: (state, taskTemplate) => {
        let index = state.taskTemplates.findIndex((c) => c.id === taskTemplate.id);
        if (index > -1) {
            state.taskTemplates.splice(index, 1, taskTemplate);
        }
    },

    /**
     *
     * @param state
     * @param errors
     */
    [types.TASK_TEMPLATE_ERRORS]: (state, errors) => {
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

