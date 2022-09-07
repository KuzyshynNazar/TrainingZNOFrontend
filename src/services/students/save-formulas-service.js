import * as types from '../../store/mutayion-types';
const apiSaveFormulas = require('../../api/student/save-formulas');

export default {
    /**
     *
     * @param context
     */
    async  savedFormulas(context) {
        await  apiSaveFormulas.savedFormulas({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_SAVED_FORMULAS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    /**
     *
     * @param context
     * @param data
     * @returns {Promise<void>}
     */
    async  saveFormula(context, data) {
        await  apiSaveFormulas.saveFormula(data,{
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`,
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_SAVED_FORMULA, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    /**
     *
     * @param context
     * @param formulaId
     */
    async deleteSavedFormula(context, formulaId) {
        await apiSaveFormulas.deleteSavedFormula( {
            headers: {'Authorization': `Bearer ${context.rootGetters["auth/token"]}` },
            params:{formulaId:formulaId}
        }).then(() => {
            context.commit(types.SET_DELETE_SAVED_FORMULA, formulaId);
        }).catch(err => {
            console.log(err)
        })
    }

}
