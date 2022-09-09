import formulaDocumentsService from '../../../services/admin/formula-documents-service';
import * as types from "./_mutayion-types";

const state = () => ({
    formulaDocuments: [],
})

const getters = {
    formulaDocuments: state => state.formulaDocuments,
};


const actions = {
    /**
     *
     * @param context
     * @param formulaDocuments
     * @returns {Promise<void>}
     */
    async store(context, formulaDocuments) {
        await formulaDocumentsService.store(context, formulaDocuments)
    },
      /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await formulaDocumentsService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param formulaDocuments
     */
    [types.SAVE_NEW_FORMULA_DOCUMENTS]: (state, formulaDocuments) => {
        state.formulaDocuments = formulaDocuments

    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

