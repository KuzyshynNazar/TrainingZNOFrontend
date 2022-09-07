import * as types from '../../mutayion-types';
import formulasService from '../../../services/app/formulas-service';

const state = () => ({
    formulas: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    formulas: state => state.formulas,
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
}

const mutations = {
    /**
     *
     * @param state
     * @param books
     */
    [types.SET_APP_FORMULAS]: (state, formulas) => {
        state.formulas = formulas
    },


    /**
     *
     * @param state
     * @param errors
     */
    [types.FORMULAS_APP_ERRORS]: (state, errors) => {
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

