import { createStore } from 'vuex'

import auth from './modules/auth'
import students from './modules/admin/students'
import treeCategories from './modules/admin/tree-categories'
import tests from './modules/admin/tests'
import testQuestions from './modules/admin/test-questions'
import testQuestionAnswers from './modules/admin/test-question-answers'


export default createStore({
  modules: {
    auth,
    students,
    treeCategories,
    tests,
    testQuestions,
    testQuestionAnswers
  }
})
