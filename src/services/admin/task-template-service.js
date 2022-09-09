import * as types from '../../store/modules/admin/_mutayion-types';

const apiTaskTemplates = require('../../api/admin/task-templates');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiTaskTemplates.index({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_TASK_TEMPLATES, response.data.data);
        }).catch(err => {
            context.commit(types.TASK_TEMPLATE_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param news
     */
    async store(context, news) {
        await apiTaskTemplates.create(news, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TASK_TEMPLATE_ERRORS, []);
            context.commit(types.SAVE_NEW_TASK_TEMPLATE, response.data.data);
        }).catch(err => {
            context.commit(types.TASK_TEMPLATE_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async show(context, id) {
        await apiTaskTemplates.show(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_TASK_TEMPLATE, response.data.data);
        }).catch(err => {
            context.commit(types.TASK_TEMPLATE_ERRORS, err.response.data.errors);
        });
    },

    /**
     *
     * @param context
     * @param formula
     */
    async update(context, formula) {
        await apiTaskTemplates.update(formula.id, formula, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TASK_TEMPLATE_ERRORS, []);
            context.commit(types.SAVE_UPDATED_TASK_TEMPLATE, response.data.data);
        }).catch(err => {
            context.commit(types.TASK_TEMPLATE_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async delete(context, id) {
        await apiTaskTemplates.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            context.commit(types.SET_DELETE_TASK_TEMPLATE, id);
        }).catch(err => {
            context.commit(types.TASK_TEMPLATE_ERRORS, err.response.data.errors);
        })
    }
}
