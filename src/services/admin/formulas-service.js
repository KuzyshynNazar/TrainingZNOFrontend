import * as types from '../../store/modules/admin/_mutayion-types';

const apiFormulas = require('../../api/admin/formulas');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiFormulas.index({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_FORMULAS, response.data.data);
        }).catch(err => {
            context.commit(types.FORMULA_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param news
     */
    async store(context, news) {
        await apiFormulas.create(news, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.FORMULA_ERRORS, []);
            context.commit(types.SAVE_NEW_FORMULA, response.data.data);
        }).catch(err => {
            context.commit(types.FORMULA_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async show(context, id) {
        await apiFormulas.show(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_FORMULA, response.data.data);
        }).catch(err => {
            context.commit(types.FORMULA_ERRORS, err.response.data.errors);
        });
    },

    /**
     *
     * @param context
     * @param formula
     */
    async update(context, formula) {
        await apiFormulas.update(formula.id, formula, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.FORMULA_ERRORS, []);
            context.commit(types.SAVE_UPDATED_FORMULA, response.data.data);
        }).catch(err => {
            context.commit(types.FORMULA_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async delete(context, id) {
        await apiFormulas.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            context.commit(types.SET_DELETE_FORMULA, id);
        }).catch(err => {
            context.commit(types.FORMULA_ERRORS, err.response.data.errors);
        })
    }
}
