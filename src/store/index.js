import { createStore } from 'vuex'

import auth from './modules/auth'
import students from './modules/admin/students'
import treeCategories from './modules/admin/tree-categories'
import tests from './modules/admin/tests'
import testQuestions from './modules/admin/test-questions'
import testQuestionAnswers from './modules/admin/test-question-answers'
import testQuestionTrueAnswers from './modules/admin/test-question-true-answers'
import testStudents from './modules/admin/test-students'
import news from './modules/admin/news'
import appNews from './modules/app/news'
import questionTypes from './modules/admin/question-types'
import testResults from './modules/admin/test-results'


export default createStore({
  modules: {
    auth,
    students,
    treeCategories,
    tests,
    testQuestions,
    testQuestionAnswers,
    testStudents,
    news,
    appNews,
    questionTypes,
    testQuestionTrueAnswers,
    testResults
  }
})
