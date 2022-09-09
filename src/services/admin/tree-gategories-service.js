import * as types from '../../store/modules/admin/_mutayion-types';

const apiTreeCategories = require('../../api/admin/treeCategories');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiTreeCategories.index({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_TREE_CATEGORIES, response.data.data);
        }).catch(err => {
            context.commit(types.TREE_CATEGORY_ERRORS, err.response.data.errors);
        });
    },

    /**
     *
     * @param context
     */
    async  getAllCategoryAndTests(context) {
        await  apiTreeCategories.categoryTests({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_CATEGORY_AND_TESTS, response.data.data);
        }).catch(err => {
            context.commit(types.TREE_CATEGORY_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param student
     */
    async store(context, student) {
        await apiTreeCategories.create(student, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TREE_CATEGORY_ERRORS, []);
            context.commit(types.SAVE_NEW_TREE_CATEGORY, response.data.data);
        }).catch(err => {
            context.commit(types.TREE_CATEGORY_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param student
     */
    async update(context, student) {
        await apiTreeCategories.update(student.id, student, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.TREE_CATEGORY_ERRORS, []);
            context.commit(types.SAVE_UPDATED_TREE_CATEGORY, response.data.data);
        }).catch(err => {
            context.commit(types.TREE_CATEGORY_ERRORS, err.response.data.errors);
        });
    },
    /**
     *
     * @param context
     * @param id
     */
    async delete(context, id) {
        await apiTreeCategories.delete(id, {
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then(() => {
            context.commit(types.SET_DELETE_TREE_CATEGORY, id);
        }).catch(err => {
            context.commit(types.TREE_CATEGORY_ERRORS, err.response.data.errors);
        })
    }
}
