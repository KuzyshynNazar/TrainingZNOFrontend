import * as types from '../../store/modules/app/_mutayion-types';

const apiAppTasks = require('../../api/app/tasks');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiAppTasks.index({
            headers: {'Authorization': `Bearer ${context.rootGetters["auth/token"]}` },
        }).then((response) => {
            context.commit(types.SET_APP_TASKS, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },


}
