import * as types from '../../store/modules/admin/_mutayion-types';

const apiTasks = require('../../api/admin/tasks');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiTasks.index({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_TASKS, response.data.data);
        }).catch(err => {
            context.commit(types.TASK_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param news
     */
    async store(context, news) {
        await apiTasks.create(news, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TASK_ERRORS, []);
            context.commit(types.SAVE_NEW_TASK, response.data.data);
        }).catch(err => {
            context.commit(types.TASK_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async show(context, id) {
        await apiTasks.show(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_TASK, response.data.data);
        }).catch(err => {
            context.commit(types.TASK_ERRORS, err.response.data.errors);
        });
    },

    /**
     *
     * @param context
     * @param formula
     */
    async update(context, formula) {
        await apiTasks.update(formula.id, formula, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TASK_ERRORS, []);
            context.commit(types.SAVE_UPDATED_TASK, response.data.data);
        }).catch(err => {
            context.commit(types.TASK_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async delete(context, id) {
        await apiTasks.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            context.commit(types.SET_DELETE_TASK, id);
        }).catch(err => {
            context.commit(types.TASK_ERRORS, err.response.data.errors);
        })
    }
}
