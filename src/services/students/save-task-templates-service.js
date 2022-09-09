import * as types from '../../store/modules/students/_mutayion-types';
const apiSaveTaskTemplates = require('../../api/student/save-task-templates');

export default {
    /**
     *
     * @param context
     */
    async  savedTaskTemplates(context) {
        await  apiSaveTaskTemplates.savedTaskTemplates({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_SAVED_TASK_TEMPLATES, response.data.data);
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
    async  saveTaskTemplate(context, data) {
        await  apiSaveTaskTemplates.saveTaskTemplate(data,{
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`,
            }
        }).then((response) => {
            context.commit(types.SAVE_NEW_SAVED_TASK_TEMPLATE, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
    /**
     *
     * @param context
     * @param taskTemplateId
     */
    async deleteSavedTaskTemplate(context, taskTemplateId) {
        await apiSaveTaskTemplates.deleteSavedTaskTemplate( {
            headers: {'Authorization': `Bearer ${context.rootGetters["auth/token"]}` },
            params:{taskTemplateId:taskTemplateId}
        }).then(() => {
            context.commit(types.SET_DELETE_SAVED_TASK_TEMPLATE, taskTemplateId);
        }).catch(err => {
            console.log(err)
        })
    }

}
