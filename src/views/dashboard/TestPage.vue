<template>
  <div>
    <w-toolbar vertical fixed left style="height: calc(100vh - 40px); top:40px"
               bg-color="grey-dark5"
               color="white">
      <w-tooltip right>
        <template #activator="{ on }">
          <w-icon v-on="on" md @click="openCreateTestDialog">mdi mdi-account-multiple-plus</w-icon>
        </template>
        Створити тест
      </w-tooltip>
      <w-tooltip right>
        <template #activator="{ on }">
          <w-icon v-on="on" md @click="openTestStudentsDialog" class="mt2">mdi mdi-account-school</w-icon>
        </template>
        Тести і студенти
      </w-tooltip>

    </w-toolbar>
    <w-flex column fill-height style="margin-left: 36px;" class="pa1">
      <w-card shadow style="height: calc(100vh - 50px)">
        <w-input
            color="grey-dark5"
            v-model="keywordTest"
            placeholder="Пошук"
            inner-icon-left="wi-search"
            class="mb3">
        </w-input>
        <w-table
            :headers="tableHeaderTest"
            :items="tests"
            fixed-headers
            :filter="keywordFilterTest(keywordTest)"
            style="width: 100%"
        >
          <template #item="{ item, classes, index  }">
            <tr :class="classes">
              <td>
                <div class="ml2">{{ index }}</div>
              </td>
              <td>{{ item.categoryName }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>
                <w-icon>{{ item.status ? 'mdi mdi-plus' : 'mdi mdi-minus' }}</w-icon>
              </td>
              <td style="text-align: right">
                <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer;"
                        @click="openShowTestStudentsDialog(item)">
                  mdi mdi-account-school
                </w-icon>
                <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer;"
                        @click="openShowTestDialog(item)">
                  mdi mdi-eye
                </w-icon>
                <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer"
                        @click="openCreateTestQuestionsDialog(item)">
                  mdi mdi-plus
                </w-icon>
                <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer"
                        @click="openEditTestDialog(item)">
                  mdi mdi-pencil
                </w-icon>
                <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer"
                        @click="openDeleteTestDialog(item)">
                  mdi mdi-delete
                </w-icon>
              </td>
            </tr>
          </template>
        </w-table>
        <!--        <MathLiveInput :config="config" v-model="formula" v-on:input="input"></MathLiveInput>-->
        <!--        <div>{{formula}}</div>-->
        <!--        <math-jax :latex="this.formula"></math-jax>-->
        <!--        <ckeditor-->
        <!--            :editor="editor"-->
        <!--            v-model="editorData"-->
        <!--            :config="editorConfig"-->
        <!--        ></ckeditor>-->
        <!--        <div v-html="editorData"></div>-->


        <!--        <br>-->
        <!--        <br>-->
        <!--        <br>-->
        <!--        <textarea v-model="formula" />-->
        <!--        <vue-mathjax :formula="formula"/>-->
      </w-card>
    </w-flex>
    <!--    Test Modal Start     -->
    <w-dialog title="Створити тест"
              width="1200px"
              title-class="grey-dark5--bg white"
              v-model="showCreateTestDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showCreateTestDialog=false"></w-button>
      <w-flex fill-height>
        <w-card class="grow mr3" title="Відображення дерева категорії" shadow style="width: 40%">
          <div style="width:100%; height: calc(100vh - 300px); overflow: auto;">
            <Tree :value="treeCategories">
              <template v-slot="{node,  path, tree}">
                <w-flex justify-space-between align-center>
                  <w-flex align-center>
                    <div class="mr2">
                      <w-button bg-color="grey-dark5"
                                color="white" v-if="node.children.length!==0" @click="tree.toggleFold(node, path)" tile
                                class="mr2" xs>
                        <w-icon xs>
                          {{ node.$folded ? 'mdi mdi-plus' : 'mdi mdi-minus' }}
                        </w-icon>
                      </w-button>

                      <w-button bg-color="grey-dark5"
                                color="white" v-else tile class="mr2" xs>
                        <w-icon xs>

                        </w-icon>
                      </w-button>
                      <w-radio v-if="node.children.length!==0" disabled color="grey-dark5"
                               class="mr2" name="name"
                               @change="parentCategory(node)">
                      </w-radio>
                      <w-radio v-else color="grey-dark5"
                               class="mr2" name="name"
                               @change="parentCategory(node)">
                      </w-radio>
                    </div>
                    <div class="mr2">
                      {{ node.text }}
                    </div>
                  </w-flex>
                </w-flex>
              </template>
            </Tree>
          </div>
        </w-card>
        <w-card class="mr3" title="Форма створення тесту" style="width: 60%">
          <div class="mb4">
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTests.name" label="Назва"></w-input>
            <span v-if="errors && errors.name" style="font-size: 10px; color: red">{{ errors.name[0] }}</span>
          </div>
          <div class="mb4">
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTests.description"
                     label="Опис"></w-input>
            <span v-if="errors && errors.description" style="font-size: 10px; color: red">{{
                errors.description[0]
              }}</span>
          </div>
          <div class="mb4">
            <w-checkbox color="grey-dark5" label-color="grey-dark5" v-model="inputsTests.status" label="Статус">
              {{ inputsTests.status ? 'Відображати' : 'Не відображати' }}
            </w-checkbox>
          </div>
          <w-flex>
            <w-button bg-color="grey-dark5"
                      color="white" @click="createTest" class="mt3 grow">Створити тест
            </w-button>
          </w-flex>
        </w-card>
      </w-flex>
    </w-dialog>
    <w-dialog v-model="showCreateTestQuestionsDialog"
              title-class="grey-dark5--bg white"
              width="90vw"
    >
      <template #title>
        <div>
          {{ `Показати Питання Тесту студента ${tableItemTest.name}` }}
        </div>
      </template>
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showCreateTestQuestionsDialog=false"></w-button>
      <w-card shadow>
        <w-flex column justify-start style="height: 80vh">
          <div class="d-flex justify-space-between align-center mb3">
            <div style="width: 85%">
              <w-input outline style="width: 100%"
                       v-model="keywordTestQuestion"
                       placeholder="Пошук"
                       inner-icon-left="wi-search"
              >
              </w-input>
            </div>
            <div class="text-right" style="width: 15%">
              <w-button bg-color="grey-dark5"
                        color="white"
                        class="grow"
                        text
                        tile
                        @click="openCreateTestQuestionDialog">
                <w-icon class="mr2">mdi mdi-plus-circle-outline</w-icon>
                Створити питання
              </w-button>
            </div>
          </div>

          <w-table
              :headers="tableHeaderTestQuestion"
              :items="testQuestions"
              fixed-headers
              :filter="keywordFilterTestQuestion(keywordTestQuestion)"
              style="width: 100%"
          >
            <template #item="{ item, classes,index  }">
              <tr :class="classes">
                <td>
                  <div class="ml2">{{ index }}</div>
                </td>
                <td v-html="item.question"></td>
                <td>
                  <w-icon>{{ item.status ? 'mdi mdi-plus' : 'mdi mdi-minus' }}</w-icon>
                </td>
                <td style="text-align: right">
                  <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer;"
                          @click="openShowTestQuestionDialog(item)">
                    mdi mdi-eye
                  </w-icon>
                  <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer"
                          @click="openCreateTestQuestionAnswersDialog(item)">
                    mdi mdi-plus
                  </w-icon>
                  <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer"
                          @click="openEditTestQuestionDialog(item)">
                    mdi mdi-pencil
                  </w-icon>
                  <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer"
                          @click="openDeleteTestQuestionDialog(item)">
                    mdi mdi-delete
                  </w-icon>
                </td>
              </tr>
            </template>
          </w-table>
        </w-flex>
      </w-card>

    </w-dialog>
    <w-dialog title="Показати Тест"
              title-class="grey-dark5--bg white"
              width="95vw"
              v-model="showShowTestDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showShowTestDialog=false"></w-button>
      <w-flex style="height: 85vh">
        <w-card class="grow mr3" title="Основна інформація" style="width: 40%" shadow>
          <w-flex column>
            <w-flex justify-space-between align-start class="mb1 pa1">
              <div>
                Назва тесту:
              </div>
              <div>
                {{ test.name }}
              </div>
            </w-flex>
            <w-flex justify-space-between align-start class="mb1 pa1">
              <div>
                Категорія тесту:
              </div>
              <div>
                {{ test.categoryName }}
              </div>
            </w-flex>
            <w-flex justify-space-between align-start class="mb1 pa1">
              <div>
                Опис тесту::
              </div>
              <div>
                {{ test.description }}
              </div>
            </w-flex>
            <w-flex justify-space-between align-start class="mb1 pa1">
              <div>
                Кількість запитань:
              </div>
              <div>
                {{ test.questions ? test.questions.length : '' }}
              </div>
            </w-flex>
          </w-flex>
        </w-card>
        <w-card :title="test.name" style="width: 60%" shadow>
          <w-flex column class="pl2">
            <div v-for="(value, index) in test.questions" :key="index" class="align-center mb2">
              <div class="w-flex align-center mb1">
                <div class="mr2">{{ index + 1 }}.</div>
                <div v-html="value.question"></div>
              </div>
              <div class="w-flex column align-start pl6 mb1">
                <div v-for="(value, index) in value.answers" :key="index" class="d-flex align-center pa1">
                  <div>
                    <w-icon>mdi mdi-minus</w-icon>
                  </div>
                  <div class="ml2" v-html="value.answer"></div>
                </div>
              </div>
            </div>
          </w-flex>
        </w-card>
      </w-flex>

    </w-dialog>
    <w-dialog title="Показати студентів даного тесту"
              title-class="grey-dark5--bg white"
              width="95vw"
              v-model="showShowTestStudentsDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showShowTestStudentsDialog=false"></w-button>
      <w-flex style="height: 85vh">
<!--        <w-card class="grow mr3"  style="width: 40%" shadow>-->
<!--{{test.students}}-->
<!--        </w-card>-->
        <w-card  style="width: 100%" shadow>
          <w-table
              :headers="tableHeaderStudentT.filter(header => !header.hidden)"
              :items="test.students"
              :selectable-rows="true"
              @update:selected-rows="this.inputsUpdateTestStudents.student_ids=$event"
          >
          </w-table>
          <w-flex  justify-center class="mt2 ">
            <w-button :disabled="inputsUpdateTestStudents.student_ids.length===0"
                class="mr3"
                      lg
                      shadow
                      bg-color="grey-dark5"
                      color="white"
                      @click="updateTestFotStudents(test.id)">Оновити список студентів
            </w-button>
            <w-button
                      lg
                      shadow
                      bg-color="grey-dark5"
                      color="white"
                      @click="deleteTestFotStudents(test.id)">Видалити студентів із тесту
            </w-button>
          </w-flex>
        </w-card>
      </w-flex>

    </w-dialog>
    <w-dialog title="Видалити тест"
              width="600px"
              title-class="grey-dark5--bg white"
              v-model="showDeleteTestDialog"
    >
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showDeleteTestDialog=false">
      </w-button>
      Ви хочеревидалити студента <strong>{{ inputsStudent.name }}</strong>?

      <w-flex align-center justify-center>
        <w-button bg-color="grey-dark5"
                  color="white"
                  width="50px"
                  @click="destroyTest" class="mt3 mr5">Так
        </w-button>
        <w-button bg-color="grey-dark5" width="50px"
                  color="white" @click="showDeleteTestDialog=false" class="mt3">Ні
        </w-button>
      </w-flex>
    </w-dialog>
    <w-dialog title="Редагувати тест"
              width="80vw"
              title-class="grey-dark5--bg white"
              v-model="showEditTestDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showEditTestDialog=false"></w-button>
      <w-flex fill-height>
        <w-card class="grow mr3" title="Відображення дерева категорії" shadow style="width: 40%">
          <div style="width:100%; height: calc(100vh - 300px); overflow: auto;">
            <Tree :value="treeCategories">
              <template v-slot="{node,  path, tree}">
                <w-flex justify-space-between align-center>
                  <w-flex align-center>
                    <div class="mr2">
                      <w-button bg-color="grey-dark5"
                                color="white" v-if="node.children.length!==0" @click="tree.toggleFold(node, path)" tile
                                class="mr2" xs>
                        <w-icon xs>
                          {{ node.$folded ? 'mdi mdi-plus' : 'mdi mdi-minus' }}
                        </w-icon>
                      </w-button>

                      <w-button bg-color="grey-dark5"
                                color="white" v-else tile class="mr2" xs>
                        <w-icon xs>

                        </w-icon>
                      </w-button>
                      <w-radio v-if="node.children.length!==0" v-model="isParentCategory" item-value-key="id"
                               item-label-key="text" :return-value="node.id" disabled color="grey-dark5"
                               class="mr2" name="name"
                      >
                      </w-radio>
                      <w-radio v-else :items="treeCategories" v-model="isParentCategory" item-value-key="id"
                               item-label-key="text" :return-value="node.id"
                               color="grey-dark5"
                               class="mr2"
                      >
                      </w-radio>
                    </div>
                    <div class="mr2">
                      {{ node.text }}
                    </div>
                  </w-flex>
                </w-flex>
              </template>
            </Tree>
          </div>
        </w-card>
        <w-card title="Форма створення тесту" shadow style="width: 60%">
          <div class="mb4">
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTests.name" label="Назва"></w-input>
            <span v-if="errors && errors.name" style="font-size: 10px; color: red">{{ errors.name[0] }}</span>
          </div>
          <div class="mb4">
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTests.description"
                     label="Опис"></w-input>
            <span v-if="errors && errors.description" style="font-size: 10px; color: red">{{
                errors.description[0]
              }}</span>
          </div>
          <div class="mb4">
            <w-checkbox color="grey-dark5" label-color="grey-dark5" v-model="inputsTests.status" label="Статус">
              {{ inputsTests.status ? 'Відображати' : 'Не відображати' }}
            </w-checkbox>
          </div>
          <w-flex>
            <w-button bg-color="grey-dark5"
                      color="white" @click="editTest" class="mt3 grow">Редагувати тест
            </w-button>
          </w-flex>
        </w-card>
      </w-flex>
    </w-dialog>
    <!--    Test Modal End     -->

    <!--    Test Question Modal Start     -->
    <w-dialog title="Створити питання"
              width="75vw"
              title-class="grey-dark5--bg white"
              v-model="showCreateTestQuestionDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showCreateTestQuestionDialog=false"></w-button>
      <w-flex fill-height>
        <w-card style="width: 100%" shadow>
          <div class="mb4">
            <ckeditor
                :editor="testQuestionEditor.editor"
                v-model="inputsTestQuestions.question"
                :config="testQuestionEditor.editorConfig"
            ></ckeditor>
            <!--            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTestQuestions.question"-->
            <!--                     label="Назва"></w-input>-->
            <!--            <span v-if="errors && errors.question" style="font-size: 10px; color: red">{{ errors.question[0] }}</span>-->
          </div>
          <div class="mb4">
            <w-checkbox color="grey-dark5" label-color="grey-dark5" v-model="inputsTestQuestions.status" label="Статус">
              {{ inputsTestQuestions.status ? 'Відображати' : 'Не відображати' }}
            </w-checkbox>
          </div>
          <w-flex>
            <w-button bg-color="grey-dark5"
                      color="white" @click="createTestQuestion" class="mt3 grow">Створити питання
            </w-button>
          </w-flex>
        </w-card>
      </w-flex>
    </w-dialog>
    <w-dialog title="Показати питання"
              width="75vw"
              title-class="grey-dark5--bg white"
              v-model="showShowTestQuestionDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showShowTestQuestionDialog=false"></w-button>
      <w-card shadow>
        <template #title>
          <div v-html="testQuestion.question"></div>
        </template>
        <w-flex>
          <div class="mr3">
            Вшдповіді:
          </div>
          <div style="display: flex; flex-direction: column">
            <div v-for="(value, index) in testQuestion.answers" :key="index" v-html="value.answer" class="mb2"></div>
          </div>

        </w-flex>
      </w-card>

    </w-dialog>
    <w-dialog title="Видалити питання"
              width="400px"
              title-class="grey-dark5--bg white"
              v-model="showDeleteTestQuestionDialog"
    >
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showDeleteTestQuestionDialog=false">
      </w-button>
      Ви хочеревидалити питання?

      <w-flex align-center justify-center>
        <w-button bg-color="grey-dark5"
                  color="white"
                  width="50px"
                  @click="destroyTestQuestion" class="mt3 mr5">Так
        </w-button>
        <w-button bg-color="grey-dark5" width="50px"
                  color="white" @click="showDeleteTestQuestionDialog=false" class="mt3">Ні
        </w-button>
      </w-flex>
    </w-dialog>
    <w-dialog title="Редагувати питання"
              width="75vw"
              title-class="grey-dark5--bg white"
              v-model="showEditTestQuestionDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showEditTestQuestionDialog=false"></w-button>
      <w-flex fill-height>
        <w-card style="width: 100%" shadow>
          <div class="mb4">
            <ckeditor
                :editor="testQuestionEditor.editor"
                v-model="inputsTestQuestions.question"
                :config="testQuestionEditor.editorConfig"
            ></ckeditor>
            <!--            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTestQuestions.question"-->
            <!--                     label="Назва"></w-input>-->
            <!--            <span v-if="errors && errors.question" style="font-size: 10px; color: red">{{ errors.question[0] }}</span>-->
          </div>
          <div class="mb4">
            <w-checkbox color="grey-dark5" label-color="grey-dark5" v-model="inputsTestQuestions.status" label="Статус">
              {{ inputsTestQuestions.status ? 'Відображати' : 'Не відображати' }}
            </w-checkbox>
          </div>
          <w-flex>
            <w-button bg-color="grey-dark5"
                      color="white" @click="editTestQuestion" class="mt3 grow">Оновити питання
            </w-button>
          </w-flex>
        </w-card>
      </w-flex>

    </w-dialog>
    <w-dialog v-model="showCreateTestQuestionAnswersDialog"
              title-class="grey-dark5--bg white"
              width="90vw"
    >
      <template #title>
        <div v-html="tableItemTestQuestion.question"></div>
      </template>
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showCreateTestQuestionAnswersDialog=false"></w-button>
      <w-card shadow>
        <div class="d-flex justify-start  mb3" style="height: 80vh; flex-direction: column">
          <div class="text-right mb2">
            <w-button bg-color="grey-dark5"
                      color="white"
                      text
                      tile
                      @click="openCreateTestQuestionAnswerDialog">
              <w-icon class="pr2">mdi mdi-plus-circle-outline</w-icon>
              Створити відповідь
            </w-button>
          </div>


          <w-table
              :headers="tableHeaderTestQuestionAnswer"
              :items="testQuestionAnswers"
              fixed-headers
              style="width: 100%"
          >
            <template #item="{ item, classes,index  }">
              <tr :class="classes">
                <td>
                  <div class="ml2">{{ index }}</div>
                </td>
                <td v-html="item.answer"></td>
                <td style="text-align: right">
                  <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer"
                          @click="openEditTestQuestionAnswerDialog(item)">
                    mdi mdi-pencil
                  </w-icon>
                  <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer"
                          @click="openDeleteTestQuestionAnswerDialog(item)">
                    mdi mdi-delete
                  </w-icon>
                </td>
              </tr>
            </template>

          </w-table>
        </div>
      </w-card>

    </w-dialog>
    <!--    Test Question Modal End     -->

    <!--    Test Question Answer Modal Start     -->
    <w-dialog title="Створити відповідь"
              width="75vw"
              v-model="showCreateTestQuestionAnswerDialog"
              title-class="grey-dark5--bg white">

      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showCreateTestQuestionAnswerDialog=false"></w-button>
      <w-flex fill-height>
        <w-card style="width: 100%" shadow>
          <div class="mb4">
            <ckeditor :editor="testQuestionAnswerEditor.editor"
                      v-model="inputsTestQuestionAnswers.answer"
                      :config="testQuestionAnswerEditor.editorConfig"
            ></ckeditor>
            <!--            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTestQuestionAnswers.answer"-->
            <!--                     label="Назва"></w-input>-->
            <!--            <span v-if="errors && errors.answer " style="font-size: 10px; color: red">{{ errors.answer [0] }}</span>-->
          </div>
          <w-flex>
            <w-button bg-color="grey-dark5"
                      color="white" @click="createTestQuestionAnswer" class="mt3 grow">Створити відповідь
            </w-button>
          </w-flex>
        </w-card>
      </w-flex>
    </w-dialog>
    <w-dialog title="Видалити відповідь"
              width="400px"
              title-class="grey-dark5--bg white"
              v-model="showDeleteTestQuestionAnswerDialog"
    >
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showDeleteTestQuestionAnswerDialog=false">
      </w-button>
      Ви хочеревидалити відповідь?

      <w-flex align-center justify-center>
        <w-button bg-color="grey-dark5"
                  color="white"
                  width="50px"
                  @click="destroyTestQuestionAnswer" class="mt3 mr5">Так
        </w-button>
        <w-button bg-color="grey-dark5" width="50px"
                  color="white" @click="showDeleteTestQuestionAnswerDialog=false" class="mt3">Ні
        </w-button>
      </w-flex>
    </w-dialog>
    <w-dialog title="Редагувати відповідь"
              width="75vw"
              title-class="grey-dark5--bg white"
              v-model="showEditTestQuestionAnswerDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showEditTestQuestionAnswerDialog=false"></w-button>
      <w-flex fill-height>
        <w-card style="width: 100%" shadow>
          <div class="mb4">
            <ckeditor :editor="testQuestionAnswerEditor.editor"
                      v-model="inputsTestQuestionAnswers.answer"
                      :config="testQuestionAnswerEditor.editorConfig"
            ></ckeditor>
            <!--            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTestQuestionAnswers.answer"-->
            <!--                     label="Назва"></w-input>-->
            <!--            <span v-if="errors && errors.answer " style="font-size: 10px; color: red">{{ errors.answer [0] }}</span>-->
          </div>
          <w-flex>
            <w-button bg-color="grey-dark5"
                      color="white" @click="editTestQuestionAnswer" class="mt3 grow">Редагувати відповідь
            </w-button>
          </w-flex>
        </w-card>
      </w-flex>


    </w-dialog>
    <!--    Test Question Answer Modal End     -->
    <w-dialog title="Прив'язати тест до студентів"
              title-class="grey-dark5--bg white"
              width="75vw"
              v-model="showCreateTestStudentsDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showCreateTestStudentsDialog=false"></w-button>
      <w-flex style="height: 75vh">
        <w-card class="grow mr3" title="Тести" style="width: 50%" shadow>
          <w-flex column>
            <w-input
                v-model="keywordTestS"
                placeholder="Пошук тесту"
                inner-icon-left="wi-search"
                color="grey-dark5"
                class="mb3">
            </w-input>
            <w-table
                :headers="tableHeaderTestS.filter(header => !header.hidden)"
                :items="tests"
                :selectable-rows="1"
                :filter="keywordFilterTestS(keywordTestS)"
                @row-select="testRadio($event)">
            </w-table>
          </w-flex>
        </w-card>
        <w-card title="Студенти" style="width: 50%" shadow>
          <w-flex column>
            <w-input
                v-model="keywordStudentT"
                placeholder="Пошук студентів"
                inner-icon-left="wi-search"
                color="grey-dark5"
                class="mb3">
            </w-input>
            <w-table
                :headers="tableHeaderStudentT.filter(header => !header.hidden)"

                :items="students"
                :selectable-rows="true"
                :filter="keywordFilterStudentT(keywordStudentT)"
                @update:selected-rows="this.inputsTestStudents.student_ids=$event">
            </w-table>
          </w-flex>
        </w-card>

      </w-flex>
      <w-flex justify-center class="mt2 ">
        <w-button class="grow"
                  lg
                  shadow
                  bg-color="grey-dark5"
                  color="white"
                  @click="saveTestFotStudents">Зберегти
        </w-button>
      </w-flex>

    </w-dialog>
    <w-overlay
        v-model="showProgress"
        persistent
        opacity="0.8"
    >
      <w-progress
          size="150px"
          class="ma1"
          circle
          color="yellow-light2"
          bg-color="light-blue-light2">
      </w-progress>
    </w-overlay>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import 'he-tree-vue/dist/he-tree-vue.css'
import {Tree, Fold} from 'he-tree-vue'
// import MathLive from "mathlive";
// import MathLiveInput from "../../components/MathliveComponent";
import ClassicEditor from "ckeditor5-mathtype/build/ckeditor"
// import {MathJax} from "mathjax-vue3";
// import VueMathjax from 'vue-mathjax-next';
export default {

  name: 'HelloWorld',
  components: {Tree: Tree.mixPlugins([Fold])},
  data() {
    return {
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {},
      config: {
        smartMode: true,
        virtualKeyboardMode: "manual",
      },
      showProgress: false,
      /**
       * Test
       */
      showCreateTestDialog: false,
      showCreateTestQuestionsDialog: false,
      showEditTestDialog: false,
      showShowTestDialog: false,
      showDeleteTestDialog: false,
      showShowTestStudentsDialog: false,
      tableHeaderTest: [
        {label: 'id', key: 'id'},
        {label: 'Категорія', key: 'categoryName'},
        {label: 'Назва', key: 'name'},
        {label: 'Опис', key: 'description'},
        {label: 'Статус', key: 'status'},
      ],
      keywordTest: '',
      keywordFilterTest: keywordTest => item => {
        const allTheColumns = `${item.id} ${item.categoryName} ${item.name} ${item.description}`
        return new RegExp(keywordTest, 'i').test(allTheColumns)
      },
      tableItemTest: null,
      inputsTests: {
        name: null,
        description: null,
        status: null,
        tree_category_id: null,
      },
      isParentCategory: null,
      /**
       * TestQuestion
       */
      showCreateTestQuestionDialog: false,
      showCreateTestQuestionAnswersDialog: false,
      showEditTestQuestionDialog: false,
      showShowTestQuestionDialog: false,
      showDeleteTestQuestionDialog: false,
      keywordTestQuestion: '',
      keywordFilterTestQuestion: keywordTestQuestion => item => {
        const allTheColumns = `${item.id} ${item.question}`
        return new RegExp(keywordTestQuestion, 'i').test(allTheColumns)
      },
      inputsTestQuestions: {
        question: null,
        status: null,
        test_id: null,
      },
      testQuestionEditor: {
        editor: ClassicEditor,
        editorData: "",
        editorConfig: {},
      },
      tableItemTestQuestion: null,
      tableHeaderTestQuestion: [
        {label: 'id', key: 'id', width: 50},
        {label: 'Питання', key: 'question', width: '70%'},
        {label: 'Статус', key: 'status'},
      ],
      editTestQuestionId: null,
      /**
       * TestQuestionAnswer
       */
      showCreateTestQuestionAnswerDialog: false,
      showCreateQuestionAnswerDialog: false,
      showDeleteTestQuestionAnswerDialog: false,
      showEditTestQuestionAnswerDialog: false,
      tableHeaderTestQuestionAnswer: [
        {label: 'id', key: 'id'},
        {label: 'Відповідь', key: 'answer'},
      ],
      inputsTestQuestionAnswers: {
        answer: null,
        test_question_id: null,
      },
      testQuestionAnswerEditor: {
        editor: ClassicEditor,
        editorData: "",
        editorConfig: {},
      },
      editTestQuestionAnswerId: null,
      /**
       * TestStudent
       */
      showCreateTestStudentsDialog: false,
      inputsTestStudents: {
        test_id: null,
        student_ids: [],
      },
      tableHeaderTestS: [
        {label: 'id', key: 'id', hidden: true},
        {label: 'Назва', key: 'name'},
      ],
      keywordTestS: '',
      keywordFilterTestS: keywordTest => item => {
        const allTheColumns = `${item.id} ${item.name}}`
        return new RegExp(keywordTest, 'i').test(allTheColumns)
      },
      tableHeaderStudentT: [
        {label: 'id', key: 'id', hidden: true},
        {label: 'Ім`я', key: 'name'},
      ],
      keywordStudentT: '',
      keywordFilterStudentT: keywordTest => item => {
        const allTheColumns = `${item.id} ${item.name}}`
        return new RegExp(keywordTest, 'i').test(allTheColumns)
      },
      selectionInfoStudent: {},
      inputsUpdateTestStudents: {
        test_id: null,
        student_ids: [],
      },
      inputsDeleteTestStudents: {
        test_id: null,
      },
    }
  },
  created() {

    this.showProgress = true
    this.getAllTests().then(() => {
      this.getAllTreeCategories().then(() => {
        this.showProgress = false
      })
    })
  },
  computed: {
    ...mapGetters({
      students: 'students/students',
      tests: 'tests/tests',
      test: 'tests/test',
      testQuestions: 'testQuestions/testQuestions',
      testQuestion: 'testQuestions/testQuestion',
      testQuestionAnswers: 'testQuestionAnswers/testQuestionAnswers',
      treeCategories: 'treeCategories/treeCategories',
      errors: 'tests/errors',
    }),
    studentsObj() {
      let checkboxes = []
      this.students.forEach(element => {
        checkboxes.push({label: element.name, value: element.id})

      });
      console.log(checkboxes)
      return checkboxes

    }
  },
  methods: {
    ...mapActions({
      /**
       * Student
       */
      getAllStudent: 'students/getAll',
      createTestStudents: 'testStudents/store',
      updateTestStudents: 'testStudents/update',
      deleteTestStudents: 'testStudents/delete',
      /**
       * TreeCategory
       */
      getAllTreeCategories: 'treeCategories/getAll',
      /**
       * Test
       */
      getAllTests: 'tests/getAll',
      storeTest: 'tests/store',
      showTest: 'tests/show',
      updateTest: 'tests/update',
      deleteTest: 'tests/delete',
      /**
       * TestQuestion
       */
      getAllTestQuestions: 'testQuestions/getAll',
      showTestQuestion: 'testQuestions/show',
      storeTestQuestion: 'testQuestions/store',
      updateTestQuestion: 'testQuestions/update',
      deleteTestQuestion: 'testQuestions/delete',
      /**
       * TestQuestionAnswer
       */
      getAllTestQuestionAnswers: 'testQuestionAnswers/getAll',
      storeTestQuestionAnswer: 'testQuestionAnswers/store',
      updateTestQuestionAnswer: 'testQuestionAnswers/update',
      deleteTestQuestionAnswer: 'testQuestionAnswers/delete',
    }),
    /**
     * Test
     */
    openCreateTestDialog() {
      // this.inputsTests = Object.assign({}, [])
      this.showCreateTestDialog = true
    },
    openShowTestDialog(item) {
      // this.math();
      this.showProgress = true
      this.showTest(item.id).then(() => {
        this.showProgress = false
        this.showShowTestDialog = true
      })

    },
    openCreateTestQuestionsDialog(item) {
      this.tableItemTest = item
      this.showProgress = true
      this.getAllTestQuestions(item.id).then(() => {
        this.showProgress = false
      })
      this.showCreateTestQuestionsDialog = true
    },
    openEditTestDialog(item) {
      this.inputsTests = Object.assign({}, item)
      this.isParentCategory = item.tree_category_id
      this.showEditTestDialog = true
    },
    openDeleteTestDialog(item) {
      this.inputsStudent = Object.assign({}, item)
      this.showDeleteTestDialog = true
    },
    openShowTestStudentsDialog(item){
      this.showProgress = true
      this.showTest(item.id).then(()=>{
        this.showProgress = false
        this.showShowTestStudentsDialog=true
      })

    },
    createTest() {
      this.inputsTests.status ? this.inputsTests.status = 1 : this.inputsTests.status = 0
      this.inputsTests.tree_category_id = this.isParentCategory
      this.storeTest(this.inputsTests).then(() => {
        this.notify('Тест створено.')
        this.showCreateTestDialog = false
      })
    },
    editTest() {
      this.inputsTests.status ? this.inputsTests.status = 1 : this.inputsTests.status = 0
      this.inputsTests.tree_category_id = this.isParentCategory
      this.updateTest(this.inputsTests).then(() => {
        this.showEditTestDialog = false
        this.notify('Тест оновлено.')
      })
    },
    destroyTest() {
      this.deleteTest(this.inputsStudent.id).then(() => {
        this.notify('Тест видалено.')
        this.showDeleteTestDialog = false
      })
    },
    /**
     * TestQuestion
     */
    openCreateTestQuestionDialog() {
      this.inputsTestQuestions = Object.assign({}, [])
      this.showCreateTestQuestionDialog = true
    },
    openShowTestQuestionDialog(item) {
      this.showProgress = true
      this.showTestQuestion(item.id).then(() => {
        this.showProgress = false
      })
      this.showShowTestQuestionDialog = true
    },
    openEditTestQuestionDialog(item) {
      this.inputsTestQuestions = Object.assign({}, item)
      this.showEditTestQuestionDialog = true
    },
    openDeleteTestQuestionDialog(item) {
      this.editTestQuestionId = item.id
      this.showDeleteTestQuestionDialog = true
    },
    openCreateTestQuestionAnswersDialog(item) {
      this.tableItemTestQuestion = item
      this.showProgress = true
      this.getAllTestQuestionAnswers(item.id).then(() => {
        this.showProgress = false
      })
      this.showCreateTestQuestionAnswersDialog = true
    },
    createTestQuestion() {
      this.inputsTestQuestions.status ? this.inputsTestQuestions.status = 1 : this.inputsTestQuestions.status = 0
      this.inputsTestQuestions.test_id = this.tableItemTest.id
      console.log(this.inputsTestQuestions)
      this.storeTestQuestion(this.inputsTestQuestions).then(() => {
        this.notify('Питання створено.')
        this.showCreateTestQuestionDialog = false
      })
    },
    editTestQuestion() {
      this.inputsTestQuestions.status ? this.inputsTestQuestions.status = 1 : this.inputsTestQuestions.status = 0
      this.inputsTestQuestions.test_id = this.tableItemTest.id
      this.updateTestQuestion(this.inputsTestQuestions).then(() => {
        this.notify('Питання відрадеговано.')
        this.showEditTestQuestionDialog = false
      })
    },
    destroyTestQuestion() {
      this.deleteTestQuestion(this.editTestQuestionId).then(() => {
        this.notify('Питання видалено.')
        this.showDeleteTestQuestionDialog = false
      })
    },
    /**
     * TestQuestionAnswer
     */
    openCreateTestQuestionAnswerDialog() {
      // this.inputsTestQuestions = Object.assign({}, [])
      this.showCreateTestQuestionAnswerDialog = true
    },
    openEditTestQuestionAnswerDialog(item) {
      this.inputsTestQuestionAnswers = Object.assign({}, item)
      this.showEditTestQuestionAnswerDialog = true
    },
    openDeleteTestQuestionAnswerDialog(item) {
      this.editTestQuestionAnswerId = item.id
      this.showDeleteTestQuestionAnswerDialog = true
    },
    createTestQuestionAnswer() {
      this.inputsTestQuestionAnswers.test_question_id = this.tableItemTestQuestion.id
      this.storeTestQuestionAnswer(this.inputsTestQuestionAnswers).then(() => {
        this.notify('Відповідь створено.')
        this.showCreateTestQuestionAnswerDialog = false
      })
    },
    editTestQuestionAnswer() {
      this.updateTestQuestionAnswer(this.inputsTestQuestionAnswers).then(() => {
        this.notify('Відповідь оновлено.')
        this.showEditTestQuestionAnswerDialog = false
      })
    },
    destroyTestQuestionAnswer() {
      this.deleteTestQuestionAnswer(this.editTestQuestionAnswerId).then(() => {
        this.notify('Відповідь оновлено.')
        this.showDeleteTestQuestionAnswerDialog = false
      })
    },
    /**
     * Test Student
     */
    openTestStudentsDialog() {
      this.showProgress = true
      this.getAllStudent().then(() => {
        this.showProgress = false
      })
      this.showCreateTestStudentsDialog = true
    },
    saveTestFotStudents() {
      this.createTestStudents(this.inputsTestStudents).then(() => {
        this.showCreateTestStudentsDialog = false
      })
    },
    updateTestFotStudents(testId){
      this.inputsUpdateTestStudents.test_id=testId
      this.updateTestStudents(this.inputsUpdateTestStudents).then(()=>{
        this.showProgress = true
        this.showTest(testId).then(()=>{
          this.showProgress = false
        })
      })
    },
    deleteTestFotStudents(testId){
      this.inputsDeleteTestStudents.test_id=testId
      this.deleteTestStudents(this.inputsDeleteTestStudents).then(()=>{
        this.showProgress = true
        this.showTest(testId).then(()=>{
          this.showProgress = false
        })
      })
    },
    /**
     * Other
     * @param message
     */
    notify(message) {
      this.$waveui.notify({
        message: message,
        timeout: 2000,
        success: true
      })
    },
    parentCategory(node) {
      this.isParentCategory = node.id
    },
    input(data) {
      this.formula = '$$' + data + '$$'
    },
    testRadio(event) {
      this.inputsTestStudents.test_id = event.item.id
      console.log(event.item.id)
    },
    studentRadio(event) {
      console.log(
          event
      )
      // this.inputsTestStudents.student_ids=[]
      // event.selectedRows.forEach(element => {
      //   this.inputsTestStudents.student_ids.push(element.id)
      // })
      // console.log(this.inputsTestStudents.student_ids)
    },

  }
}
</script>

<style>
.ML__keystroke-caption {
  padding: 0 !important;
}

.w-list__item {
  width: 100% !important;
  cursor: pointer;
}

.tree-node:hover {
  background-color: #dadada;
}

.icon:hover {
  background-color: #dadada;
}

.icon {
  line-height: 0 !important;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
