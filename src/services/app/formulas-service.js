import * as types from '../../store/modules/app/_mutayion-types';

const apiAppFormulas = require('../../api/app/formulas');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiAppFormulas.index({
            // headers: {
            //     // 'Authorization': `Bearer ${context.rootGetters["auth/token"]}`,
            //     'Access-Control-Allow-Origin' : '*',
            //     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            // }
            headers: {'Authorization': `Bearer ${context.rootGetters["auth/token"]}` },
        }).then((response) => {
            context.commit(types.SET_APP_FORMULAS, response.data.data);
        }).catch(err => {
            context.commit(types.FORMULAS_APP_ERRORS, err.response.data.errors);
        });
    },


}
