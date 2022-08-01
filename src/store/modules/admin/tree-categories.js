import * as types from '../../mutayion-types';
import treeCategoriesService from '../../../services/admin/tree-gategories-service';

const state = () => ({
    treeCategories: [],
    categoryAndTests: [],
    errors: [],
})

const getters = {
    /**
     *
     * @param state
     */
    treeCategories: state => state.treeCategories,
    categoryAndTests: state => state.categoryAndTests,
    errors: state => state.errors,

};


const actions = {
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async getAll(context) {
        await treeCategoriesService.getAll(context)
    },
    /**
     *
     * @param context
     * @returns {Promise<void>}
     */
    async getAllCategoryAndTests(context) {
        await treeCategoriesService.getAllCategoryAndTests(context)
    },

    /**
     *
     * @param context
     * @param treeCategory
     * @returns {Promise<void>}
     */
    async store(context, treeCategory) {
        await treeCategoriesService.store(context, treeCategory)
    },

    /**
     *
     * @param context
     * @param treeCategory
     * @returns {Promise<void>}
     */
    async update(context, treeCategory) {
        await treeCategoriesService.update(context, treeCategory)
    },
    /**
     *
     * @param context
     * @param id
     * @returns {Promise<void>}
     */
    async delete(context, id) {
        await treeCategoriesService.delete(context, id)
    },
}

const mutations = {
    /**
     *
     * @param state
     * @param treeCategories
     */
    [types.SET_TREE_CATEGORIES]: (state, treeCategories) => {
        state.treeCategories = treeCategories
    },
    /**
     *
     * @param state
     * @param treeCategories
     */
    [types.SET_CATEGORY_AND_TESTS]: (state, categoryAndTests) => {
        state.categoryAndTests = categoryAndTests
    },


    /**
     *
     * @param state
     * @param treeCategory
     */
    [types.SAVE_NEW_TREE_CATEGORY]: (state, treeCategory) => {
            state.treeCategories.push(treeCategory)
    },
    /**
     *
     * @param state
     * @param id
     */
    [types.SET_DELETE_TREE_CATEGORY]: (state, id) => {
        let index = state.treeCategories.findIndex((c) => c.id === id);
        if (index > -1) {
            state.treeCategories.splice(index, 1);
            state.errors=[]
        }
    },

    /**
     *
     * @param state
     * @param student
     */
    [types.SAVE_UPDATED_TREE_CATEGORY]: (state, student) => {
        let index = state.treeCategories.findIndex((c) => c.id === student.id);
        if (index > -1) {
            state.treeCategories.splice(index, 1, student);
        }
    },

    [types.TREE_CATEGORY_ERRORS]: (state, errors) => {
        state.errors = errors
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

