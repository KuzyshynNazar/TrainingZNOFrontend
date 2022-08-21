import * as types from '../../store/mutayion-types';

const apiQuestionTypes = require('../../api/admin/question-types');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiQuestionTypes.index({
            headers: {
                'Authorization': `Bearer ${context.rootGetters["auth/token"]}`
            }
        }).then((response) => {
            context.commit(types.SET_QUESTION_TYPES, response.data.data);
        }).catch(err => {
            console.log(err)
        });
    },
}
