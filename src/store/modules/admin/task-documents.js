import taskDocumentsService from '../../../services/admin/task-documents-service';
import * as types from "./_mutayion-types";

const state = () => ({
    taskDocuments: [],
})

const getters = {
    taskDocuments: state => state.taskDocuments,
};


const actions = {
    /**
     *
     * @param context
     * @param taskDocument
     * @returns {Promise<void>}
     */
    async store(context, taskDocument) {
        await taskDocumentsService.store(context, taskDocument)
    },
      /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await taskDocumentsService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param taskDocuments
     */
    [types.SAVE_NEW_TASK_DOCUMENTS]: (state, taskDocuments) => {
        state.taskDocuments = taskDocuments

    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

