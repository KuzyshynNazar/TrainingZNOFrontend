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
      <w-card no-border  style="height: calc(100vh - 50px)">
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
              <td>{{ item.time }}</td>
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
              fullscreen width="1200px"
              title-class="grey-dark5--bg white"
              v-model="showCreateTestDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showCreateTestDialog=false"></w-button>
      <w-flex fill-height>
        <w-card class="grow mr3" title="Відображення дерева категорії" style="width: 40%; height: calc(100vh - 65px); overflow-y: auto">
          <div style="width:100%;">
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
        <w-card title="Форма створення тесту" style="width: 60%">
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
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTests.time"
                     label="Час, хв."></w-input>
            <span v-if="errors && errors.time" style="font-size: 10px; color: red">{{
                errors.time[0]
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
              fullscreen width="90vw"
    >
      <template #title>
        <div>
          {{ `Показати питання тесту ${tableItemTest.name}` }}
        </div>
      </template>
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showCreateTestQuestionsDialog=false"></w-button>
      <w-card no-border content-class="pa0">
        <w-flex column justify-start style="height: 80vh; overflow-y: auto">
          <div class="d-flex justify-space-between align-center mb3">
            <div>
              <w-input outline
                       style="width: 300px"
                       v-model="keywordTestQuestion"
                       placeholder="Пошук"
                       inner-icon-left="wi-search"
              >
              </w-input>
            </div>
            <div class="text-right">
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
    <w-dialog title="Показати тест"
              title-class="grey-dark5--bg white"
              fullscreen
              v-model="showShowTestDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showShowTestDialog=false"></w-button>
      <w-flex fill-height>
        <w-card class="grow mr3" title="Основна інформація" style="width: 30%; height: calc(100vh - 65px)" >
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
        <w-card :title="test.name" style="width: 70%; height: calc(100vh - 65px); overflow-y: auto">
          <w-flex column class="pl2">
            <div v-for="(value, index) in test.questions" :key="index" class="align-center mb2">
              <div class="w-flex align-center mb1">
                <div class="mr2">{{ index + 1 }}.</div>
                <div v-html="value.question"></div>
              </div>
              <div class="w-flex column justify-center align-start pl6 mb1">
                <!--                <div v-for="(value, index) in value.answers" :key="index" class="d-flex align-center pa1">-->
                <!--                  <div>-->
                <!--                    <w-icon>mdi mdi-minus</w-icon>-->
                <!--                  </div>-->
                <div v-if="value.questionType===1" class="d-flex align-center justify-center">
                  <w-radios
                      v-model="selection.answers[`question${index}`]"
                      :items="value.answers"
                      color="grey-dark5"
                      @update:model-value="input2($event, value.id, index)"
                  >
                    <template #item="{ item }">
                      <span class="pr2 grey-dark5" v-html="item.label"></span>
                    </template>
                  </w-radios>
                </div>
                <div v-else-if="value.questionType===3">
                  <!--                  <div v-html="value.answers[0].answer"></div>-->
                  <div>
                    <div class="d-flex align-center justify-start" style="margin-left: 32px">
                      <div class="pa2" style="width: 34px; height: 34px">А</div>
                      <div class="pa2" style="width: 34px; height: 34px">Б</div>
                      <div class="pa2" style="width: 34px; height: 34px">В</div>
                      <div class="pa2" style="width: 34px; height: 34px">Г</div>
                      <div class="pa2" style="width: 34px; height: 34px">Д</div>
                    </div>
                    <div class="d-flex align-center justify-start">
                      <div class="pa2">1.</div>
                      <div>
                        <w-radio :name="`item${value.id}1`" @change="input1(value.id,1,'А', index)"
                                 class="pa2"></w-radio>
                        <w-radio :name="`item${value.id}1`" @change="input1(value.id,1,'Б', index)"
                                 class="pa2"></w-radio>
                        <w-radio :name="`item${value.id}1`" @change="input1(value.id,1,'В', index)"
                                 class="pa2"></w-radio>
                        <w-radio :name="`item${value.id}1`" @change="input1(value.id,1,'Г', index)"
                                 class="pa2"></w-radio>
                        <w-radio :name="`item${value.id}1`" @change="input1(value.id,1,'Д', index)"
                                 class="pa2"></w-radio>
                      </div>
                    </div>
                    <div class="d-flex align-center justify-start">
                      <div class="pa2">2.</div>
                      <div>
                        <w-radio :name="`item${value.id}2`" @change="input1(value.id,2, 'А', index)"
                                 class="pa2"></w-radio>
                        <w-radio :name="`item${value.id}2`" @change="input1(value.id,2, 'Б', index)"
                                 class="pa2"></w-radio>
                        <w-radio :name="`item${value.id}2`" @change="input1(value.id,2, 'В', index)"
                                 class="pa2"></w-radio>
                        <w-radio :name="`item${value.id}2`" @change="input1(value.id,2, 'Г', index)"
                                 class="pa2"></w-radio>
                        <w-radio :name="`item${value.id}2`" @change="input1(value.id,2, 'Д', index)"
                                 class="pa2"></w-radio>
                      </div>
                    </div>
                    <div class="d-flex align-center justify-start">
                      <div class="pa2">3.</div>
                      <div>
                        <w-radio :name="`item${value.id}3`" @change="input1(value.id,3, 'А', index)"
                                 class="pa2"></w-radio>
                        <w-radio :name="`item${value.id}3`" @change="input1(value.id,3, 'Б', index)"
                                 class="pa2"></w-radio>
                        <w-radio :name="`item${value.id}3`" @change="input1(value.id,3, 'В', index)"
                                 class="pa2"></w-radio>
                        <w-radio :name="`item${value.id}3`" @change="input1(value.id,3, 'Г', index)"
                                 class="pa2"></w-radio>
                        <w-radio :name="`item${value.id}3`" @change="input1(value.id,3, 'Д', index)"
                                 class="pa2"></w-radio>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else-if="value.questionType===2" style="width: 100%">
                  <w-input @update:model-value="input3($event,value.id,index)" color="grey-dark5" style="width: 100%"
                           placeholder="Введіть свою відповідь"></w-input>
                </div>
              </div>
              <w-divider class="mt3 mb1"></w-divider>
            </div>
          </w-flex>
          <w-button @click="createTestResult">Зберегти тест</w-button>
        </w-card>
      </w-flex>
    </w-dialog>
    <w-dialog title="Показати студентів даного тесту"
              title-class="grey-dark5--bg white"
              fullscreen width="95vw"
              v-model="showShowTestStudentsDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showShowTestStudentsDialog=false"></w-button>
      <w-flex fill-height>
        <!--        <w-card class="grow mr3"  style="width: 40%" shadow>-->
        <!--{{test.students}}-->
        <!--        </w-card>-->
        <w-card style="width: 100%" no-border content-class="pa0">
          <w-table
              :headers="tableHeaderStudentT.filter(header => !header.hidden)"
              :items="test.students"
              :selectable-rows="true"
              @update:selected-rows="this.inputsUpdateTestStudents.student_ids=$event"
          >
          </w-table>
          <w-flex justify-center class="mt3">
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
               fullscreen width="80vw"
              title-class="grey-dark5--bg white"
              v-model="showEditTestDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showEditTestDialog=false"></w-button>
      <w-flex fill-height>
        <w-card class="grow mr3" title="Відображення дерева категорії" style="width: 40%; height: calc(100vh - 65px); overflow: auto;">
          <div style="width:100%;">
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
        <w-card title="Форма створення тесту" style="width: 60%">
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
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTests.time"
                     label="Час, хв."></w-input>
            <span v-if="errors && errors.time" style="font-size: 10px; color: red">{{
                errors.time[0]
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
              width="80vw"
              title-class="grey-dark5--bg white"
              v-model="showCreateTestQuestionDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showCreateTestQuestionDialog=false"></w-button>
      <w-flex fill-height style="height: 80vh">
        <w-card style="width: 100%" content-class="pa3">
          <w-flex column justify-space-between fill-height>
            <w-flex column>
              <div class="mb4">
                <w-select
                    v-model="inputsTestQuestions.question_type_id"
                    :items="questionTypes"
                    placeholder="Виберіть тип питання"
                    color="grey-dark5"
                >
                </w-select>
              </div>
              <div class="mb4">
                <w-input type="number" label-color="grey-dark5" color="grey-dark5" v-model="inputsTestQuestions.points"
                         min="0" max="10">Бал за питання
                </w-input>
              </div>
              <div class="mb4">
                <ckeditor
                    :editor="testQuestionEditor.editor"
                    v-model="inputsTestQuestions.question"
                    :config="testQuestionEditor.editorConfig"
                ></ckeditor>
              </div>
              <div class="mb4">
                <w-input
                    v-model="inputsTestQuestionPhotos.photos"
                    color="grey-dark5" label-color="grey-dark5"
                    type="file"
                    label="Завантажити фото"
                    accept=".jpg, .jpeg, .png, .gif, .svg"
                    multiple>
                </w-input>
              </div>
              <div class="mb4">
                <w-checkbox color="grey-dark5" label-color="grey-dark5" v-model="inputsTestQuestions.status"
                            :label="inputsTestQuestions.status ? 'Відображати' : 'Не відображати'">

                </w-checkbox>
              </div>
            </w-flex>
            <w-flex align-end justify-center>
              <w-button bg-color="grey-dark5"
                        color="white" @click="createTestQuestion" class="mt3">Створити питання
              </w-button>
            </w-flex>
          </w-flex>
        </w-card>
      </w-flex>
    </w-dialog>
    <w-dialog title="Показати питання"
              width="80vw"
              title-class="grey-dark5--bg white"
              v-model="showShowTestQuestionDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showShowTestQuestionDialog=false"></w-button>
      <w-flex fill-height style="height: 80vh; overflow-y: auto">
        <w-card style="width: 100%" content-class="pa3">
          <w-flex fill-height column>
            <div class="pa2" style="width: 100%; border-bottom: 1px solid rgba(0,0,0,.15)"
                 v-html="testQuestion.question"></div>
            <div v-if="testQuestion.questionType===1" class="mt3 d-flex" style="flex-direction: column">
              <w-table
                  :headers="tableHeaderTestQuestionAnswer"
                  :items="testQuestion.answers"
                  fixed-headers
                  style="width: 100%"
              >
                <template #item="{ item, classes,index  }">
                  <tr :class="classes">
                    <td>
                      <div class="ml2">{{ index }}</div>
                    </td>
                    <td v-html="item.answer"></td>
                  </tr>
                </template>
              </w-table>
              <div class="mt3 pa2" style="border-bottom: 1px solid rgba(0,0,0,.15)" v-if="testQuestion.true_answer">
                <div v-for="(testQuestionAnswer, index) in testQuestion.answers" :key="index"
                     v-show="testQuestionAnswer.id==testQuestion.true_answer.true_answer">
                  <div class="d-flex align-center">
                    <div class="mr2 title3">Правельна відповідь:</div>
                    <div v-html="testQuestionAnswer.label" class="title3 text-italic teal"></div>
                  </div>
                </div>
              </div>
              <div class="mt3 pa2" style="border-bottom: 1px solid rgba(0,0,0,.15)" v-else>
                <div class="d-flex align-center">
                  <div class="mr2 title3">Правельна відповідь:</div>
                  <div class="title3 text-italic orange">Ви не встановили правильну відповідь</div>
                </div>
              </div>
            </div>
            <div v-if="testQuestion.questionType===2" class="mt3 pa2" style="border-bottom: 1px solid rgba(0,0,0,.15)">
              <div class="d-flex align-center">
                <div class="mr2 title3">Правельна відповідь:</div>
                <div class="title3 text-italic teal" v-if="testQuestion.true_answer">
                  {{ testQuestion.true_answer.true_answer }}
                </div>
                <div v-else class="title3 text-italic orange">Ви не встановили правильну відповідь</div>
              </div>
            </div>
            <div v-if="testQuestion.questionType===3" class="mt3 pa2" style="border-bottom: 1px solid rgba(0,0,0,.15)">
              <div class="d-flex align-center">
                <div class="mr2 title3">Правельна відповідь:</div>
                <div class="title3 text-italic teal" v-if="testQuestion.true_answer">
                  {{ testQuestion.true_answer.true_answer[0] }},
                  {{ testQuestion.true_answer.true_answer[1] }},
                  {{ testQuestion.true_answer.true_answer[2] }}
                </div>
                <div v-else class="title3 text-italic orange">Ви не встановили правильну відповідь</div>
              </div>
            </div>
            <div class="d-flex mt3 pa2" style="border-bottom: 1px solid rgba(0,0,0,.15)">
              <div class="mr2 title3">Бали за питання:</div>
              <div class="title3 text-italic teal"> {{testQuestion.points}}</div>

            </div>
            <div class="d-flex mt3 pa2" style="flex-direction: column; border-bottom: 1px solid rgba(0,0,0,.15)"
                 v-if="testQuestion.photos && testQuestion.photos.length!==0">
              <div class="mr2 title3">Зображення питання:</div>
              <div class="d-flex">
                <div v-for="(photo, index) in testQuestion.photos" :key="index">
                  <w-image :src="urlStorage + photo.path" tag="img" style="max-width: 150px" class="mr2"></w-image>
                </div>
              </div>

            </div>
          </w-flex>
        </w-card>
      </w-flex>
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
              width="80vw"
              title-class="grey-dark5--bg white"
              v-model="showEditTestQuestionDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showEditTestQuestionDialog=false"></w-button>
      <w-flex fill-height style="height: 80vh; overflow-y: auto">
        <w-card style="width: 100%" shadow>
          <div class="mb4">
            <w-select
                v-model="inputsTestQuestions.question_type_id"
                :items="questionTypes"
                placeholder="Виберіть тип питання"
                color="grey-dark5"
            >
            </w-select>
          </div>
          <div class="mb4">
            <w-input type="number" label-color="grey-dark5" color="grey-dark5" v-model="inputsTestQuestions.points"
                     min="0" max="10">Бал за питання
            </w-input>
          </div>
          <div class="mb4">
            <ckeditor
                :editor="testQuestionEditor.editor"
                v-model="inputsTestQuestions.question"
                :config="testQuestionEditor.editorConfig"
            ></ckeditor>
          </div>
          <div class="mb4 d-flex" style="flex-direction: column">
            <w-input
                v-model="inputsTestQuestionPhotos.photos"
                color="grey-dark5" label-color="grey-dark5"
                type="file"
                label="Завантажити фото"
                accept=".jpg, .jpeg, .png, .gif, .svg"
                multiple>
            </w-input>
          </div>
          <w-flex wrap class="mb4">
            <div class="xs2  pr2 pt2" v-for="(photo,index) in inputsTestQuestions.photos" :key="index">
              <div class="d-flex" style="flex-direction: column">
                <div class="d-flex align-center justify-center bd1">
                  <w-image :src="urlStorage + photo.path" tag="img" style="width: 100px"></w-image>
                </div>
                <w-flex>
                  <w-button class="grow" color="white" bg-color="grey-dark5" @click="destroyTestQuestionPhoto(photo.id)">
                   <w-icon class="mr2" color="white">
                      mdi mdi-trash-can-outline
                   </w-icon>
                    Видалити
                  </w-button>
                </w-flex>
              </div>
            </div>
          </w-flex>
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
              width="80vw"
              persistent
    >
      <template #title>
        <div v-html="tableItemTestQuestion.question"></div>
      </template>
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="closeCreateTestQuestionAnswersDialog"></w-button>
      <w-flex fill-height style="height: 80vh; overflow-y: auto">
        <w-card style="width: 100%">
          <div class="d-flex justify-start  mb3" style="flex-direction: column">
            <div class="mb2">
              <w-button v-show="tableItemTestQuestion.questionType===1"
                        bg-color="grey-dark5"
                        color="white"
                        text
                        tile
                        @click="openCreateTestQuestionAnswerDialog">
                <w-icon class="pr2">mdi mdi-plus-circle-outline</w-icon>
                Створити відповідь
              </w-button>

              <w-menu align-right shadow>
                <template #activator="{ on }">
                  <w-button v-on="on" :class="tableItemTestQuestion.questionType===1?'ml3':''" bg-color="grey-dark5"
                            color="white">
                    <w-icon class="pr2" color="white">mdi mdi-plus-circle-outline</w-icon>
                    Створити правильну відповідь
                  </w-button>
                </template>
                <div style="width: 300px; height: 200px">
                  <div v-if="tableItemTestQuestion.questionType===1">
                    <w-select multiple
                              label-color="grey-dark5"
                              label="Виберіть правильну відповідь"
                              v-model="inputsTestQuestionTrueAnswer.true_answer"
                              :items="testQuestionAnswers" @update:model-value="setTrueAnswer1($event)">
                      <template #item="{ item }">
                        <span class="ml1" v-html="item.label"></span>
                      </template>
                      <template #selection="{ item }">
                        <w-tag
                            color="grey-dark5"
                            class="mr2"
                            v-for="(el, i) in item"
                            :key="i"
                            v-html="el.label">
                        </w-tag>
                      </template>
                    </w-select>
                  </div>
                  <div v-else-if="tableItemTestQuestion.questionType===2">
                    <w-input color="grey-dark5" label-color="grey-dark5"
                             v-model="inputsTestQuestionTrueAnswer.true_answer"
                             label="Опис"></w-input>
                  </div>
                  <div v-else-if="tableItemTestQuestion.questionType===3">
                    <div class="d-flex align-center mb2" v-for="n in 3"
                         :key="n">
                      <div class="mr3">{{ n }}.</div>
                      <w-select :items="selectionTrueAnswer" label-color="grey-dark5"
                                label="Виберіть правильну відповідь"
                                @update:model-value="setTrueAnswer(n,$event)">

                      </w-select>
                    </div>
                  </div>
                  <w-flex class="mt4">
                    <w-button class="grow" @click="createTestQuestionTrueAnswer" bg-color="grey-dark5"
                              color="white">Створити
                    </w-button>
                  </w-flex>

                </div>
              </w-menu>
            </div>
            <div v-if="tableItemTestQuestion.questionType===1">
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
              <div class="mt3 bd1 pa2" v-if="tableItemTestQuestion.true_answer">
                <div v-for="(testQuestionAnswer, index) in testQuestionAnswers" :key="index"
                     v-show="testQuestionAnswer.id==tableItemTestQuestion.true_answer.true_answer">
                  <div class="d-flex align-center">
                    <div class="mr2 title3">Правельна відповідь:</div>
                    <div v-html="testQuestionAnswer.answer" class="title3 text-italic teal"></div>
                  </div>
                </div>
              </div>
            </div>
            <div v-if="tableItemTestQuestion.questionType===2" class="mt3 bd1 pa2">
              <div class="d-flex align-center">
                <div class="mr2 title3">Правельна відповідь:</div>
                <div class="title3 text-italic teal">{{ tableItemTestQuestion.true_answer.true_answer }}</div>
              </div>
            </div>
            <div v-if="tableItemTestQuestion.questionType===3" class="mt3 bd1 pa2">
              <div class="d-flex align-center">
                <div class="mr2 title3">Правельна відповідь:</div>
                <div class="title3 text-italic teal">{{ tableItemTestQuestion.true_answer.true_answer[0] }},
                  {{ tableItemTestQuestion.true_answer.true_answer[1] }},
                  {{ tableItemTestQuestion.true_answer.true_answer[2] }}
                </div>
              </div>
            </div>
            <div v-show="tableItemTestQuestion.photos && tableItemTestQuestion.photos.length!==0" class="d-flex mt3 pa2 bd1" style="flex-direction: column">
              <div class="mr2 title3">Зображення питання:</div>
              <div class="d-flex">
                <div v-for="(photo, index) in tableItemTestQuestion.photos" :key="index">
                  <w-image :src="urlStorage + photo.path" tag="img" style="max-width: 150px" class="mr2"></w-image>
                </div>
              </div>

            </div>
          </div>
        </w-card>
      </w-flex>
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
              fullscreen width="75vw"
              v-model="showCreateTestStudentsDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showCreateTestStudentsDialog=false"></w-button>
      <w-flex fill-height column>
        <w-flex fill-height>
          <w-card class="grow mr3" title="Тести" style="width: 50%; height: calc(100vh - 105px); overflow-y: auto">
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
          <w-card title="Студенти" style="width: 50%; height: calc(100vh - 105px); overflow-y: auto">
            <w-flex column>
              <w-input
                  v-model="keywordStudentT"
                  placeholder="Пошук студентів"
                  inner-icon-left="wi-search"
                  color="grey-dark5"
                  @click="setActiveFilter"
                  class="mb3">
              </w-input>
              <div class="w-flex wrap mb2">
                <w-button
                    :bg-color="activeFilter !== 0?'white':'grey-dark5'"
                    :color="activeFilter !== 0?'grey-dark5':'white'"
                    class="mr1 mb1"
                    @click="activeFilter = 0"
                    tile
                    xs
                    :outline="activeFilter !== 0">
                  Без фільтра
                </w-button>
                <w-button
                    :bg-color="activeFilter !== 1?'white':'grey-dark5'"
                    :color="activeFilter !== 1?'grey-dark5':'white'"
                    class="mr1 mb1"
                    @click="activeFilter = 1"
                    tile
                    xs
                    :outline="activeFilter !== 1">
                  1 клас
                </w-button>
                <w-button
                    :bg-color="activeFilter !== 2?'white':'grey-dark5'"
                    :color="activeFilter !== 2?'grey-dark5':'white'"
                    class="mr1 mb1"
                    @click="activeFilter = 2"
                    tile
                    xs
                    :outline="activeFilter !== 2">
                  2 клас
                </w-button>
                <w-button
                    :bg-color="activeFilter !== 3?'white':'grey-dark5'"
                    :color="activeFilter !== 3?'grey-dark5':'white'"
                    class="mr1 mb1"
                    @click="activeFilter = 3"
                    tile
                    xs
                    :outline="activeFilter !== 3">
                  3 клас
                </w-button>
                <w-button
                    :bg-color="activeFilter !== 4?'white':'grey-dark5'"
                    :color="activeFilter !== 4?'grey-dark5':'white'"
                    class="mr1 mb1"
                    @click="activeFilter = 4"
                    tile
                    xs
                    :outline="activeFilter !== 4">
                  4 клас
                </w-button>
                <w-button
                    :bg-color="activeFilter !== 5?'white':'grey-dark5'"
                    :color="activeFilter !== 5?'grey-dark5':'white'"
                    class="mr1 mb1"
                    @click="activeFilter = 5"
                    tile
                    xs
                    :outline="activeFilter !== 5">
                  5 клас
                </w-button>
                <w-button
                    :bg-color="activeFilter !== 6?'white':'grey-dark5'"
                    :color="activeFilter !== 6?'grey-dark5':'white'"
                    class="mr1 mb1"
                    @click="activeFilter = 6"
                    tile
                    xs
                    :outline="activeFilter !== 6">
                  6 клас
                </w-button>
                <w-button
                    :bg-color="activeFilter !== 7?'white':'grey-dark5'"
                    :color="activeFilter !== 7?'grey-dark5':'white'"
                    class="mr1 mb1"
                    @click="activeFilter = 7"
                    tile
                    xs
                    :outline="activeFilter !== 7">
                  7 клас
                </w-button>
                <w-button
                    :bg-color="activeFilter !== 8?'white':'grey-dark5'"
                    :color="activeFilter !== 8?'grey-dark5':'white'"
                    class="mr1 mb1"
                    @click="activeFilter = 8"
                    tile
                    xs
                    :outline="activeFilter !== 8">
                  8 клас
                </w-button>
                <w-button
                    :bg-color="activeFilter !== 9?'white':'grey-dark5'"
                    :color="activeFilter !== 9?'grey-dark5':'white'"
                    class="mr1 mb1"
                    @click="activeFilter = 9"
                    tile
                    xs
                    :outline="activeFilter !== 9">
                  9 клас
                </w-button>
                <w-button
                    :bg-color="activeFilter !== 10?'white':'grey-dark5'"
                    :color="activeFilter !== 10?'grey-dark5':'white'"
                    class="mr1 mb1"
                    @click="activeFilter = 10"
                    tile
                    xs
                    :outline="activeFilter !== 10">
                  10 клас
                </w-button>
                <w-button
                    :bg-color="activeFilter !== 11?'white':'grey-dark5'"
                    :color="activeFilter !== 11?'grey-dark5':'white'"
                    class="mr1 mb1"
                    @click="activeFilter = 11"
                    tile
                    xs
                    :outline="activeFilter !== 11">
                  11 клас
                </w-button>
              </div>
              <w-table
                  :headers="tableHeaderStudentT.filter(header => !header.hidden)"
                  :filter="filters[activeFilter]"
                  :items="students"
                  :selectable-rows="true"
                  @update:selected-rows="this.inputsTestStudents.student_ids=$event">
              </w-table>
            </w-flex>
          </w-card>
        </w-flex>
        <w-flex justify-center class="mt2">
          <w-button class="grow"
                    lg
                    shadow
                    bg-color="grey-dark5"
                    color="white"
                    @click="saveTestFotStudents">Зберегти
          </w-button>
        </w-flex>
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
import ClassicEditor from "ckeditor5-mathtype/build/ckeditor"

const URL_STORAGE = process.env.VUE_APP_URL_STORAGE
const BASE_URL = process.env.VUE_APP_API_URL
export default {

  name: 'HelloWorld',
  components: {Tree: Tree.mixPlugins([Fold])},
  data() {
    return {
      activeFilter: 0,
      urlStorage: URL_STORAGE,
      baseUrlApi: BASE_URL,
      selection: {
        answers: {},
        testId: null,
        studentId: null
      },
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
        {label: 'Час, хв.', key: 'time'},
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
        time: null,
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
        question_type_id: null,
        points: null,
        photos: null,
        file: null,
      },
      inputsTestQuestionPhotos:{
        testQuestionId: null,
        photos: null,
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
      inputsTestQuestionTrueAnswer: {
        test_question_id: null,
        true_answer: null,
      },
      selectionTrueAnswer: [
        {label: 'А', value: 'А'},
        {label: 'Б', value: 'Б'},
        {label: 'В', value: 'В'},
        {label: 'В', value: 'В'},
        {label: 'Г', value: 'Г'},
        {label: 'Д', value: 'Д'},
      ],
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
      testQuestionTrueAnswers: 'testQuestionTrueAnswers/testQuestionTrueAnswers',
      treeCategories: 'treeCategories/treeCategories',
      errors: 'tests/errors',
      questionTypes: 'questionTypes/questionTypes',
      testQuestionPhotos: 'testQuestionPhotos/testQuestionPhotos',
    }),
    filters() {
      return [
        null,
        item => item.class === 1,
        item => item.class === 2,
        item => item.class === 3,
        item => item.class === 4,
        item => item.class === 5,
        item => item.class === 6,
        item => item.class === 7,
        item => item.class === 8,
        item => item.class === 9,
        item => item.class === 10,
        item => item.class === 11,

        this.keywordFilterStudentT(this.keywordStudentT)
      ]
    }
  },
  methods: {
    ...mapActions({
      /**
       * TreeCategory
       */
      getAllQuestionTypes: 'questionTypes/getAll',
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
      deleteTestQuestionPhoto: 'testQuestionPhotos/delete',
      storeTestQuestionPhotos: 'testQuestionPhotos/store',
      /**
       * TestQuestionAnswer
       */
      getAllTestQuestionAnswers: 'testQuestionAnswers/getAll',
      storeTestQuestionAnswer: 'testQuestionAnswers/store',
      updateTestQuestionAnswer: 'testQuestionAnswers/update',
      deleteTestQuestionAnswer: 'testQuestionAnswers/delete',
      /**
       * TestQuestionTrueAnswer
       */
      getAllTestQuestionTrueAnswers: 'testQuestionTrueAnswers/getAll',
      storeTestQuestionTrueAnswer: 'testQuestionTrueAnswers/store',
      updateTestQuestionTrueAnswer: 'testQuestionTrueAnswers/update',
      deleteTestQuestionTrueAnswer: 'testQuestionTrueAnswers/delete',
      /**
       * Result Test
       */
      storeTestResult: 'testResults/store'
    }),
    /**
     * Test
     */
    openCreateTestDialog() {
      this.showCreateTestDialog = true
    },
    openShowTestDialog(item) {
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
    openShowTestStudentsDialog(item) {
      this.showProgress = true
      this.showTest(item.id).then(() => {
        this.showProgress = false
        this.showShowTestStudentsDialog = true
      })
    },
    createTest() {
      this.inputsTests.status ? this.inputsTests.status = 1 : this.inputsTests.status = 0
      this.inputsTests.tree_category_id = this.isParentCategory
      this.inputsTests.time = this.inputsTests.time * 60
      this.storeTest(this.inputsTests).then(() => {
        this.notify('Тест створено.')
        this.showCreateTestDialog = false
      })
    },
    editTest() {
      this.inputsTests.status ? this.inputsTests.status = 1 : this.inputsTests.status = 0
      this.inputsTests.tree_category_id = this.isParentCategory
      this.inputsTests.time = this.inputsTests.time * 60
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
      this.getAllQuestionTypes()
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
      this.getAllQuestionTypes()
      this.inputsTestQuestions = Object.assign({}, item)
      console.log(  this.inputsTestQuestions)
      this.inputsTestQuestions.question_type_id = this.inputsTestQuestions.questionType
      this.showEditTestQuestionDialog = true
    },
    openDeleteTestQuestionDialog(item) {
      this.editTestQuestionId = item.id
      this.showDeleteTestQuestionDialog = true
    },
    openCreateTestQuestionAnswersDialog(item) {
      this.tableItemTestQuestion = item
      this.inputsTestQuestionTrueAnswer.true_answer = null
      this.showProgress = true
      this.getAllTestQuestionAnswers(item.id).then(() => {
        this.showProgress = false
      })
      this.showCreateTestQuestionAnswersDialog = true
    },
    closeCreateTestQuestionAnswersDialog() {
      if (this.inputsTestQuestionTrueAnswer.true_answer !== null || this.tableItemTestQuestion.true_answer !== null) {
        this.showCreateTestQuestionAnswersDialog = false
      } else {
        this.notify('Ви не створили правильної відповіді', 'red')
      }

    },
    createTestQuestion() {
      this.inputsTestQuestions.status ? this.inputsTestQuestions.status = 1 : this.inputsTestQuestions.status = 0
      this.inputsTestQuestions.test_id = this.tableItemTest.id
      this.storeTestQuestion(this.inputsTestQuestions).then(() => {
        this.inputsTestQuestionPhotos.testQuestionId=this.testQuestion.id
        this.storeTestQuestionPhotos(this.inputsTestQuestionPhotos).then(()=>{
          let index = this.testQuestions.findIndex((c) => c.id === this.testQuestion.id);
          if (index > -1) {
            this.testQuestions[index].photos= this.testQuestionPhotos
          }
          this.inputsTestQuestionPhotos.testQuestionId=null
          this.inputsTestQuestionPhotos.photos=null
          this.notify('Питання створено.')
          this.showCreateTestQuestionDialog = false
        })
      })
    },
    editTestQuestion() {
      this.inputsTestQuestions.status ? this.inputsTestQuestions.status = 1 : this.inputsTestQuestions.status = 0
      this.inputsTestQuestions.test_id = this.tableItemTest.id
      this.updateTestQuestion(this.inputsTestQuestions).then(() => {
        this.inputsTestQuestionPhotos.testQuestionId=this.inputsTestQuestions.id
        this.storeTestQuestionPhotos(this.inputsTestQuestionPhotos).then(()=>{
          let index = this.testQuestions.findIndex((c) => c.id === this.inputsTestQuestions.id);
          if (index > -1) {
            this.testQuestions[index].photos= this.testQuestionPhotos
          }
          this.inputsTestQuestionPhotos.testQuestionId=null
          this.inputsTestQuestionPhotos.photos=null
          this.notify('Питання створено.')
          this.showCreateTestQuestionDialog = false
        })
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
    destroyTestQuestionPhoto(id){
      this.deleteTestQuestionPhoto(id).then(()=>{
        let index = this.inputsTestQuestions.photos.findIndex((c) => c.id === id);
        if (index > -1) {
          this.inputsTestQuestions.photos.splice(index, 1);
        }
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
     * TestQuestionTrueAnswer
     */
    createTestQuestionTrueAnswer() {
      this.inputsTestQuestionTrueAnswer.true_answer = JSON.stringify(this.inputsTestQuestionTrueAnswer.true_answer)
      this.inputsTestQuestionTrueAnswer.test_question_id = this.tableItemTestQuestion.id
      this.storeTestQuestionTrueAnswer(this.inputsTestQuestionTrueAnswer).then(() => {
        this.tableItemTestQuestion.true_answer = this.testQuestionTrueAnswers
        this.inputsTestQuestionTrueAnswer.true_answer = null
        this.notify('Правильна відповідь створено.')
      })
    },
    setTrueAnswer(index, event) {
      if (this.inputsTestQuestionTrueAnswer.true_answer === null) {
        this.inputsTestQuestionTrueAnswer.true_answer = []
        this.inputsTestQuestionTrueAnswer.true_answer.push(`${index}-${event}`)
      } else {
        let el = `${index}-${event}`
        let index1 = this.inputsTestQuestionTrueAnswer.true_answer.findIndex((c) => c[0] === el[0]);
        if (index1 > -1) {
          this.inputsTestQuestionTrueAnswer.true_answer.splice(index1, 1, el);
        } else {
          this.inputsTestQuestionTrueAnswer.true_answer.push(`${index}-${event}`)
        }
      }
    },
    setTrueAnswer1(event) {
      this.inputsTestQuestionTrueAnswer.true_answer = event[0]
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
    updateTestFotStudents(testId) {
      this.inputsUpdateTestStudents.test_id = testId
      this.updateTestStudents(this.inputsUpdateTestStudents).then(() => {
        this.showProgress = true
        this.showTest(testId).then(() => {
          this.showProgress = false
        })
      })
    },
    deleteTestFotStudents(testId) {
      this.inputsDeleteTestStudents.test_id = testId
      this.deleteTestStudents(this.inputsDeleteTestStudents).then(() => {
        this.showProgress = true
        this.showTest(testId).then(() => {
          this.showProgress = false
        })
      })
    },
    setActiveFilter() {
      this.activeFilter = 12
    },
    /**
     * Other
     * @param message
     * @param color
     */
    notify(message, color = 'green') {
      this.$waveui.notify({
        message: message,
        timeout: 2000,
        success: true,
        color: color,
      })
    },
    parentCategory(node) {
      this.isParentCategory = node.id
    },
    input1(question, answer, event, index) {
      if (this.selection.answers[`question${index}`] === undefined) {
        this.selection.answers[`question${index}`] = []
        this.selection.answers[`question${index}`].push({questionId: question, answer: `${answer}-${event}`})
      } else {
        let el = {questionId: question, answer: `${answer}-${event}`}
        let index1 = this.selection.answers[`question${index}`].findIndex((c) => c.answer[0] === el.answer[0]);
        if (index1 > -1) {
          this.selection.answers[`question${index}`].splice(index1, 1, el);
        } else {
          this.selection.answers[`question${index}`].push({questionId: question, answer: `${answer}-${event}`})
        }
      }
      this.selection.answers[`question${index}`].sort((a, b) => {
        return a.answer[0] - b.answer[0]
      })

    },
    input2(event, questionId, index) {
      this.selection.answers[`question${index}`] = {questionId: questionId, answerId: event}
    },
    input3(event, questionId, index) {
      this.selection.answers[`question${index}`] = {questionId: questionId, answerId: event}
    },
    testRadio(event) {
      this.inputsTestStudents.test_id = event.item.id
    },
    createTestResult() {
      this.selection.testId = this.test.id
      this.selection.studentId = 6
      this.storeTestResult(JSON.stringify(this.selection))
    },
  }
}
</script>

<style>
.w-notification-manager {
  width: 100%;
  max-width: 500px;
}

td {
  padding: 5px;
}

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
