import * as types from '../../mutayion-types';
import formulasService from '../../../services/admin/formulas-service';

const state = () => ({
    formulas: [],
    formula: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    formulas: state => state.formulas,
    formula: state => state.formula,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async getAll(context) {
        await formulasService.getAll(context)
    },

    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async show(context,id) {
        await formulasService.show(context, id)
    },

    /**
     *
     * @param context
     * @param formula
     * @returns {Promise<void>}
     */
    async store(context, formula) {
        await formulasService.store(context, formula)
    },

    /**
     *
     * @param context
     * @param formula
     * @returns {Promise<void>}
     */
    async update(context, formula) {
        await formulasService.update(context, formula)
    },
    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await formulasService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param formulas
     */
    [types.SET_FORMULAS]: (state, formulas) => {
        state.formulas = formulas
    },
    /**
     *
     * @param state
     * @param formula
     */
    [types.SET_FORMULA]: (state, formula) => {
        state.formula = formula
    },


    /**
     *
     * @param state
     * @param formula
     */
    [types.SAVE_NEW_FORMULA]: (state, formula) => {
        state.formulas.unshift(formula)
        state.formula=formula
    },
    /**
     *
     * @param state
     * @param id
     */
    [types.SET_DELETE_FORMULA]: (state, id) => {
        let index = state.formulas.findIndex((c) => c.id === id);
        if (index > -1) {
            state.formulas.splice(index, 1);
        }
    },

    /**
     *
     * @param formula
     */
    [types.SAVE_UPDATED_FORMULA]: (state, formula) => {
        let index = state.formulas.findIndex((c) => c.id === formula.id);
        if (index > -1) {
            state.formulas.splice(index, 1, formula);
        }
    },

    /**
     *
     * @param state
     * @param errors
     */
    [types.FORMULA_ERRORS]: (state, errors) => {
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

