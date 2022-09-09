import { createStore } from 'vuex'

/**
 * Store Admin
 */
import auth from './modules/auth/auth'
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
import testSamples from './modules/admin/test-samples'
import testSampleDocuments from './modules/admin/test-sample-documents'
import taskTemplates from './modules/admin/task-templates'
import taskTemplateDocuments from './modules/admin/task-template-documents'
import questionTypes from './modules/admin/question-types'

/**
 * Store App
 */
import appNews from './modules/app/news'
import appBooks from './modules/app/books'
import appFormulas from './modules/app/formulas'
import appTestSamples from './modules/app/test-samples'
import appTaskTemplates from './modules/app/task-templates'

/**
 * Store Student
 */
import testResults from './modules/students/test-results'
import studentTests from './modules/students/student-tests'
import saveBooks from './modules/students/save-books'
import saveFormulas from './modules/students/save-formulas'
import saveTestSamples from './modules/students/save-test-samples'
import saveTaskTemplates from './modules/students/save-task-templates'

export default createStore({
  modules: {
    /**
     * Auth
     */
    auth,

    /**
     * Admin
     */
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
    testSamples,
    testSampleDocuments,
    taskTemplates,
    taskTemplateDocuments,
    questionTypes,
    testQuestionTrueAnswers,

    /**
     * App
     */
    appNews,
    appBooks,
    appFormulas,
    appTestSamples,
    appTaskTemplates,

    /**
     * Student
     */
    testResults,
    studentTests,
    saveBooks,
    saveFormulas,
    saveTestSamples,
    saveTaskTemplates,
  }
})
