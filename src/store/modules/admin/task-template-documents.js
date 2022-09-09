import taskTemplateDocumentsService from '../../../services/admin/task-template-documents-service';
import * as types from "./_mutayion-types";

const state = () => ({
    taskTemplateDocuments: [],
})

const getters = {
    taskTemplateDocuments: state => state.taskTemplateDocuments,
};


const actions = {
    /**
     *
     * @param context
     * @param taskTemplateDocument
     * @returns {Promise<void>}
     */
    async store(context, taskTemplateDocument) {
        await taskTemplateDocumentsService.store(context, taskTemplateDocument)
    },
      /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await taskTemplateDocumentsService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param taskTemplateDocuments
     */
    [types.SAVE_NEW_TASK_TEMPLATE_DOCUMENTS]: (state, taskTemplateDocuments) => {
        state.taskTemplateDocuments = taskTemplateDocuments

    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

