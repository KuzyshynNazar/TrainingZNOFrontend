import * as types from "./_mutayion-types";
import saveTaskTemplatesService from '../../../services/students/save-task-templates-service';

const state = () => ({
    saveTaskTemplates: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    saveTaskTemplates: state => state.saveTaskTemplates,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async savedTaskTemplates(context) {
        await saveTaskTemplatesService.savedTaskTemplates(context)
    },
    /**
     *
     * @param context
     * @param data
     * @returns {Promise<void>}
     */
    async saveTaskTemplate(context, data) {
        await saveTaskTemplatesService.saveTaskTemplate(context, data)
    },
    /**
     *
     * @param context
     * @param taskTemplateId
     * @returns {Promise<void>}
     */
    async deleteSavedTaskTemplate(context, taskTemplateId) {
        await saveTaskTemplatesService.deleteSavedTaskTemplate(context, taskTemplateId)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param saveTaskTemplates
     */
    [types.SET_SAVED_TASK_TEMPLATES]: (state, saveTaskTemplates) => {
        state.saveTaskTemplates = saveTaskTemplates
    },
    /**
     *
     * @param state
     * @param saveTaskTemplate
     */
    [types.SAVE_NEW_SAVED_TASK_TEMPLATE]: (state, saveTaskTemplate) => {
        state.saveTaskTemplates.push(saveTaskTemplate)
    },

    /**
     *
     * @param state
     * @param taskTemplateId
     */
    [types.SET_DELETE_SAVED_TASK_TEMPLATE]: (state, taskTemplateId) => {
        let index = state.saveTaskTemplates.findIndex((c) => c.id === taskTemplateId);
        if (index > -1) {
            state.saveTaskTemplates.splice(index, 1);
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

