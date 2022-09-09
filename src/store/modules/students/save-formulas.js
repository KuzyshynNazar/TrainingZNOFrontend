import * as types from "./_mutayion-types";
import saveFormulasService from '../../../services/students/save-formulas-service';

const state = () => ({
    saveFormulas: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    saveFormulas: state => state.saveFormulas,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async savedFormulas(context) {
        await saveFormulasService.savedFormulas(context)
    },
    /**
     *
     * @param context
     * @param data
     * @returns {Promise<void>}
     */
    async saveFormula(context, data) {
        await saveFormulasService.saveFormula(context, data)
    },
    /**
     *
     * @param context
     * @param formulaId
     * @returns {Promise<void>}
     */
    async deleteSavedFormula(context, formulaId) {
        await saveFormulasService.deleteSavedFormula(context, formulaId)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param saveFormulas
     */
    [types.SET_SAVED_FORMULAS]: (state, saveFormulas) => {
        state.saveFormulas = saveFormulas
    },
    /**
     *
     * @param state
     * @param saveFormula
     */
    [types.SAVE_NEW_SAVED_FORMULA]: (state, saveFormula) => {
        state.saveFormulas.push(saveFormula)
    },

    /**
     *
     * @param state
     * @param formulaId
     */
    [types.SET_DELETE_SAVED_FORMULA]: (state, formulaId) => {
        let index = state.saveFormulas.findIndex((c) => c.id === formulaId);
        if (index > -1) {
            state.saveFormulas.splice(index, 1);
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

