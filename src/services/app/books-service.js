import * as types from '../../store/modules/app/_mutayion-types';

const apiAppBooks = require('../../api/app/books');

export default {
    /**
     *
     * @param context
     */
    async  getAll(context) {
        await  apiAppBooks.index({
            // headers: {
            //     // 'Authorization': `Bearer ${context.rootGetters["auth/token"]}`,
            //     'Access-Control-Allow-Origin' : '*',
            //     'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            // }
            headers: {'Authorization': `Bearer ${context.rootGetters["auth/token"]}` },
        }).then((response) => {
            context.commit(types.SET_APP_BOOKS, response.data.data);
        }).catch(err => {
            context.commit(types.BOOKS_APP_ERRORS, err.response.data.errors);
        });
    },


}
