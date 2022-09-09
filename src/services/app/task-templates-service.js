import * as types from '../../store/modules/app/_mutayion-types';

const apiAppTaskTemplates = require('../../api/app/task-templates');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiAppTaskTemplates.index({
            headers: {'Authorization': `Bearer ${context.rootGetters["auth/token"]}` },
        }).then((response) => {
            context.commit(types.SET_APP_TASK_TEMPLATES, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },


}
