import { createStore } from 'vuex'

import auth from './modules/auth'
import students from './modules/admin/students'
import treeCategories from './modules/admin/tree-categories'
import tests from './modules/admin/tests'
import testQuestions from './modules/admin/test-questions'
import testQuestionPhotos from './modules/admin/test-question-photos'
import testQuestionAnswers from './modules/admin/test-question-answers'
import testQuestionTrueAnswers from './modules/admin/test-question-true-answers'
import testStudents from './modules/admin/test-students'
import news from './modules/admin/news'
import newsPhotos from './modules/admin/news-photos'
import newsDocuments from './modules/admin/news-documents'
import newsVideos from './modules/admin/news-videos'
import books from './modules/admin/books'
import bookDocuments from './modules/admin/book-documents'
import formulas from './modules/admin/formulas'
import formulaDocuments from './modules/admin/formula-documents'
import appNews from './modules/app/news'
import appBooks from './modules/app/books'
import appFormulas from './modules/app/formulas'
import questionTypes from './modules/admin/question-types'
import testResults from './modules/students/test-results'
import studentTests from './modules/students/student-tests'
import saveBooks from './modules/students/save-books'
import saveFormulas from './modules/students/save-formulas'


export default createStore({
  modules: {
    auth,
    students,
    treeCategories,
    tests,
    testQuestions,
    testQuestionPhotos,
    testQuestionAnswers,
    testStudents,
    news,
    newsPhotos,
    newsDocuments,
    newsVideos,
    books,
    bookDocuments,
    formulas,
    formulaDocuments,
    appNews,
    appBooks,
    appFormulas,
    questionTypes,
    testQuestionTrueAnswers,
    testResults,
    studentTests,
    saveBooks,
    saveFormulas,
  }
})
