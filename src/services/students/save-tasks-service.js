import * as types from '../../store/modules/students/_mutayion-types';
const apiSaveTasks = require('../../api/student/save-tasks');

export default {
    /**
     *
     * @param context
     */
    async  savedTasks(context) {
        await  apiSaveTasks.savedTasks({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_SAVED_TASKS, response.data.data);
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
    async  saveTask(context, data) {
        await  apiSaveTasks.saveTask(data,{
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`,
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_SAVED_TASK, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    /**
     *
     * @param context
     * @param taskId
     */
    async deleteSavedTask(context, taskId) {
        await apiSaveTasks.deleteSavedTask( {
            headers: {'Authorization': `Bearer ${context.rootGetters["auth/token"]}` },
            params:{taskId:taskId}
        }).then(() => {
            context.commit(types.SET_DELETE_SAVED_TASK, taskId);
        }).catch(err => {
            console.log(err)
        })
    }

}
