<template>
  <div>
    <w-toolbar vertical
               fixed
               left
               style="height: calc(100vh - 40px); top:40px"
               bg-color="grey-dark5"
               color="white"
    >
      <w-tooltip right>
        <template #activator="{ on }">
          <w-icon v-on="on"
                  md
                  @click="openCreateDialog"
          >
            mdi mdi-account-multiple-plus
          </w-icon>
        </template>
        Створити студента
      </w-tooltip>
    </w-toolbar>
    <w-flex column
            style="margin-left: 40px;"
            class="pa3"
    >
      <w-input
          color="grey-dark5"
          v-model="keyword"
          placeholder="Пошук"
          inner-icon-left="wi-search"
          class="mb3"
          @click="setActiveFilter">
      </w-input>
      <div class="w-flex wrap mb3">
        <w-button
            :bg-color="activeFilter !== 0?'white':'grey-dark5'"
            :color="activeFilter !== 0?'grey-dark5':'white'"
            class="mr2 mb1"
            @click="activeFilter = 0"
            tile
            :outline="activeFilter !== 0">
          Без фільтра
        </w-button>
        <w-button
            :bg-color="activeFilter !== 1?'white':'grey-dark5'"
            :color="activeFilter !== 1?'grey-dark5':'white'"
            class="mr2 mb1"
            @click="activeFilter = 1"
            tile
            :outline="activeFilter !== 1">
          1 клас
        </w-button>
        <w-button
            :bg-color="activeFilter !== 2?'white':'grey-dark5'"
            :color="activeFilter !== 2?'grey-dark5':'white'"
            class="mr2 mb1"
            @click="activeFilter = 2"
            tile
            :outline="activeFilter !== 2">
          2 клас
        </w-button>
        <w-button
            :bg-color="activeFilter !== 3?'white':'grey-dark5'"
            :color="activeFilter !== 3?'grey-dark5':'white'"
            class="mr2 mb1"
            @click="activeFilter = 3"
            tile
            :outline="activeFilter !== 3">
          3 клас
        </w-button>
        <w-button
            :bg-color="activeFilter !== 4?'white':'grey-dark5'"
            :color="activeFilter !== 4?'grey-dark5':'white'"
            class="mr2 mb1"
            @click="activeFilter = 4"
            tile
            :outline="activeFilter !== 4">
          4 клас
        </w-button>
        <w-button
            :bg-color="activeFilter !== 5?'white':'grey-dark5'"
            :color="activeFilter !== 5?'grey-dark5':'white'"
            class="mr2 mb1"
            @click="activeFilter = 5"
            tile
            :outline="activeFilter !== 5">
          5 клас
        </w-button>
        <w-button
            :bg-color="activeFilter !== 6?'white':'grey-dark5'"
            :color="activeFilter !== 6?'grey-dark5':'white'"
            class="mr2 mb1"
            @click="activeFilter = 6"
            tile
            :outline="activeFilter !== 6">
          6 клас
        </w-button>
        <w-button
            :bg-color="activeFilter !== 7?'white':'grey-dark5'"
            :color="activeFilter !== 7?'grey-dark5':'white'"
            class="mr2 mb1"
            @click="activeFilter = 7"
            tile
            :outline="activeFilter !== 7">
          7 клас
        </w-button>
        <w-button
            :bg-color="activeFilter !== 8?'white':'grey-dark5'"
            :color="activeFilter !== 8?'grey-dark5':'white'"
            class="mr2 mb1"
            @click="activeFilter = 8"
            tile
            :outline="activeFilter !== 8">
          8 клас
        </w-button>
        <w-button
            :bg-color="activeFilter !== 9?'white':'grey-dark5'"
            :color="activeFilter !== 9?'grey-dark5':'white'"
            class="mr2 mb1"
            @click="activeFilter = 9"
            tile
            :outline="activeFilter !== 9">
          9 клас
        </w-button>
        <w-button
            :bg-color="activeFilter !== 10?'white':'grey-dark5'"
            :color="activeFilter !== 10?'grey-dark5':'white'"
            class="mr2 mb1"
            @click="activeFilter = 10"
            tile
            :outline="activeFilter !== 10">
          10 клас
        </w-button>
        <w-button
            :bg-color="activeFilter !== 11?'white':'grey-dark5'"
            :color="activeFilter !== 11?'grey-dark5':'white'"
            class="mr2 mb1"
            @click="activeFilter = 11"
            tile
            :outline="activeFilter !== 11">
          11 клас
        </w-button>
      </div>
      <w-table
          :headers="tableHeader"
          :items="students"
          fixed-headers
          :filter="filters[activeFilter]"
          style="width: 100%"
      >
        <template #item="{ item, classes  }">
          <tr :class="classes ">
            <td class="pl2">{{ item.id }}</td>
            <td>{{ item.school }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.class }}</td>
            <td>{{ item.parallel }}</td>
            <td style="text-align: right;">
              <w-tooltip left>
                <template #activator="{ on }">
                  <w-button v-on="on" bg-color="grey-dark5"
                            color="white"
                            icon="mdi mdi-account-search"
                            tile
                            outline
                            class="ma1 mr0"
                            @click="openShowDialog(item)">
                  </w-button>
                </template>
                Показати інформацію про студента
              </w-tooltip>
              <w-tooltip left>
                <template #activator="{ on }">
                  <w-button v-on="on" bg-color="grey-dark5"
                            color="white"
                            icon="mdi mdi-chart-bar"
                            tile
                            outline
                            class="ma1 mr0"
                            @click="openShowStudentPerformanceDialog(item)">
                  </w-button>
                </template>
                Успішність студента
              </w-tooltip>
              <w-tooltip left>
                <template #activator="{ on }">
                  <w-button v-on="on" bg-color="grey-dark5"
                            color="white"
                            icon="mdi mdi-account-details"
                            tile
                            outline
                            class="ma1 mr0"
                            @click="openShowStudentTestDialog(item)">
                  </w-button>
                </template>
                Показати тести студента
              </w-tooltip>
              <w-tooltip left>
                <template #activator="{ on }">
                  <w-button v-on="on" bg-color="grey-dark5"
                            color="white"
                            icon="mdi mdi-account-edit"
                            class="ma1 mr0"
                            tile
                            outline
                            @click="openEditDialog(item)">
                  </w-button>
                </template>
                Редагувати інформацію студента
              </w-tooltip>
              <w-tooltip left>
                <template #activator="{ on }">
                  <w-button v-on="on"
                            bg-color="grey-dark5"
                            color="white"
                            icon="mdi mdi-account-minus"
                            class="ma1"
                            tile
                            outline
                            @click="openDeleteDialog(item)">

                  </w-button>
                </template>
                Видалети студента
              </w-tooltip>
            </td>
          </tr>
        </template>
      </w-table>
    </w-flex>
    <w-dialog width="1200px"
              v-model="showCreateDialog"
              title-class="grey-dark5--bg white"
              title="Створити студента">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showCreateDialog=false"></w-button>
      <w-flex fill-height>
        <w-card no-border style="width: 100%; height: 75vh; overflow-y: auto" content-class="pa0">
          <w-card>
            <w-flex wrap>
              <div class="mb4 pr4 xs4">
                <w-input v-model="inputsStudent.school" color="grey-dark5" label-color="grey-dark5"
                         label="Школа"></w-input>
                <span v-if="errors && errors.school" style="font-size: 10px; color: red">{{ errors.school[0] }}</span>
              </div>
              <div class="mb4 pr4 xs4">
                <w-input v-model="inputsStudent.name" color="grey-dark5" label-color="grey-dark5"
                         label="Ім'я"></w-input>
                <span v-if="errors && errors.name" style="font-size: 10px; color: red">{{ errors.name[0] }}</span>
              </div>
              <div class="mb4 xs4">
                <w-input v-model="inputsStudent.nick_name" color="grey-dark5" label-color="grey-dark5"
                         label="Псевдонім"></w-input>
                <span v-if="errors && errors.nick_name" style="font-size: 10px; color: red">{{
                    errors.nick_name[0]
                  }}</span>
              </div>
              <div class="mb4 pr4 xs6">
                <w-input v-model="inputsStudent.class" type="number" color="grey-dark5" label-color="grey-dark5"
                         label="Клас"></w-input>
                <span v-if="errors && errors.class" style="font-size: 10px; color: red">{{ errors.class[0] }}</span>
              </div>
              <div class="mb4 xs6">
                <w-input v-model="inputsStudent.parallel" color="grey-dark5" label-color="grey-dark5"
                         label="Паралель"></w-input>
                <span v-if="errors && errors.parallel" style="font-size: 10px; color: red">{{
                    errors.parallel[0]
                  }}</span>
              </div>
              <div class="mb4 pr4 xs6">
                <w-input v-model="inputsStudent.password" color="grey-dark5" label-color="grey-dark5" type="password"
                         label="Пароль"></w-input>
                <span v-if="errors && errors.password" style="font-size: 10px; color: red">{{
                    errors.password[0]
                  }}</span>
              </div>
              <div class="mb4 xs6">
                <w-input v-model="inputsStudent.password_confirmation" color="grey-dark5" label-color="grey-dark5"
                         type="password" label="Повторіть пароль"></w-input>
              </div>

            </w-flex>
            <template #actions>
              <div class="spacer"></div>
              <w-button @click="storeStudent" bg-color="grey-dark5"
                        color="white">Створити студента
              </w-button>
              <div class="spacer"></div>
            </template>
          </w-card>
        </w-card>
      </w-flex>
    </w-dialog>
    <w-dialog width="1200px"
              v-model="showEditDialog"
              title-class="grey-dark5--bg white"
              title="Редагувати дані студента">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showEditDialog=false"></w-button>
      <w-flex fill-height>
        <w-card no-border style="width: 100%; height: 75vh; overflow-y: auto" content-class="pa0">
          <w-tabs style="width: 100%" :items="tabs"
                  color="grey-dark5"
                  active-class="grey-dark5"
                  slider-color="grey-dark5">
            <template v-slot:[`item-content.1`]>
              <w-flex wrap>
                <div class="mb4 xs12">
                  <w-input v-model="inputsStudentData.school" color="grey-dark5" label-color="grey-dark5"
                           label="Школа"></w-input>
                  <span v-if="errors && errors.school" style="font-size: 10px; color: red">{{ errors.school[0] }}</span>
                </div>
                <div class="mb4 pr2 xs6">
                  <w-input v-model="inputsStudentData.name" color="grey-dark5" label-color="grey-dark5"
                           label="Ім'я"></w-input>
                  <span v-if="errors && errors.name" style="font-size: 10px; color: red">{{ errors.name[0] }}</span>
                </div>
                <div class="mb4 xs6">
                  <w-input v-model="inputsStudentData.nick_name" color="grey-dark5" label-color="grey-dark5"
                           label="Псевдонім"></w-input>
                  <span v-if="errors && errors.nick_name" style="font-size: 10px; color: red">{{
                      errors.nick_name[0]
                    }}</span>
                </div>
                <div class="mb4 pr2 xs6">
                  <w-input v-model="inputsStudentData.class" color="grey-dark5" label-color="grey-dark5"
                           label="Клас"></w-input>
                  <span v-if="errors && errors.class" style="font-size: 10px; color: red">{{ errors.class[0] }}</span>
                </div>
                <div class="mb4 xs6">
                  <w-input v-model="inputsStudentData.parallel" color="grey-dark5" label-color="grey-dark5"
                           label="Паралель"></w-input>
                  <span v-if="errors && errors.parallel"
                        style="font-size: 10px; color: red">{{ errors.parallel[0] }}</span>
                </div>
              </w-flex>
              <w-flex>
                <div class="spacer"></div>
                <w-button @click="updateStudentData"
                          bg-color="grey-dark5"
                          color="white"
                          class="mt3">
                  Оновити дані
                </w-button>
                <div class="spacer"></div>
              </w-flex>
            </template>
            <template v-slot:[`item-content.2`]>
              <div class="mb4">
                <w-input v-model="inputsStudentPassword.password" color="grey-dark5" label-color="grey-dark5"
                         label="Password" type="password"></w-input>
                <span v-if="errors && errors.password"
                      style="font-size: 10px; color: red">{{ errors.password[0] }}</span>
              </div>
              <div class="mb4">
                <w-input v-model="inputsStudentPassword.password_confirmation"
                         color="grey-dark5"
                         label-color="grey-dark5"
                         label="Password Confirmation"
                         type="password">
                </w-input>
                <span v-if="errors && errors.password_confirmation"
                      style="font-size: 10px; color: red">
                  {{ errors.password_confirmation[0] }}
                </span>
              </div>
              <w-flex>
                <div class="spacer"></div>
                <w-button @click="updateStudentPassword"
                          bg-color="grey-dark5"
                          color="white"
                          class="mt3">
                  Змінити пароль
                </w-button>
                <div class="spacer"></div>
              </w-flex>
            </template>
          </w-tabs>
        </w-card>
      </w-flex>
    </w-dialog>
    <w-dialog width="95vw"
              v-model="showShowDialog"
              title-class="grey-dark5--bg white"
    >
      <template #title>
        <div>{{ `Показати дані студента ${tableItem.name}` }}</div>
      </template>
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showShowDialog=false"></w-button>
      <w-flex fill-height>
        <w-card style="width: 100%; height: 75vh; overflow-y: auto" no-border content-class="pa0">
          <w-tabs style="width: 100%" :items="dialogShowTabs"
                  color="grey-dark5"
                  active-class="grey-dark5"
                  slider-color="grey-dark5">
            <template v-slot:[`item-content.1`]>
              <w-flex column justify-space-between>
                <div class="d-flex justify-space-between align-center mb1" style="width: 100%">
                  <div class="mr2">Стедент:</div>
                  <w-tag bg-color="grey-dark5" class="title5" color="white" md>{{ tableItem.name }}</w-tag>
                </div>
                <w-divider class="mb3"></w-divider>
                <div class="d-flex justify-space-between align-center mb1" style="width: 100%">
                  <div class="mr2" style="width: 250px">Школа:</div>
                  <w-tag bg-color="grey-dark5" color="white body" md>{{ tableItem.school }}</w-tag>
                </div>
                <w-divider class="mb3"></w-divider>
                <div class="d-flex justify-space-between align-center mb1" style="width: 100%">
                  <div class="mr2" style="width: 250px">Класс:</div>
                  <w-tag bg-color="grey-dark5" color="white body" md>{{ tableItem.class }}</w-tag>
                </div>
                <w-divider class="mb3"></w-divider>
                <div class="d-flex justify-space-between align-center mb1" style="width: 100%">
                  <div class="mr2" style="width: 250px">Паралель:</div>
                  <w-tag bg-color="grey-dark5" color="white body" md>{{ tableItem.parallel }}</w-tag>
                </div>
              </w-flex>
            </template>
            <template v-slot:[`item-content.2`]>
              <w-flex column justify-space-between>
                <div class="d-flex justify-space-between align-center mb1" style="width: 100%">
                  <div class="mr2">Псевдонім:</div>
                  <w-tag bg-color="grey-dark5" class="title5" color="white" md>{{ tableItem.nick_name }}</w-tag>
                </div>
                <w-divider class="mb3"></w-divider>
                <div class="d-flex justify-space-between align-center mb1" style="width: 100%">
                  <div class="mr2" style="width: 250px">Школа:</div>
                  <w-tag bg-color="grey-dark5" class="title5" color="white" md>
                    <w-input
                        style="width: 100px"
                        color="white"
                        label-color="white"
                        v-model="tableItem.password"
                        :type="isPassword ? 'password' : 'text'"
                        :inner-icon-right="isPassword ? 'mdi mdi-eye-off' : 'mdi mdi-eye'"
                        @click:inner-icon-right="isPassword = !isPassword">
                    </w-input>
                  </w-tag>


                </div>
                <w-divider class="mb3"></w-divider>
              </w-flex>
            </template>
            <template v-slot:[`item-content.3`]>
              <w-table
                  :headers="tableStudentTestsHeader"
                  :items="testStudents"
                  fixed-headers
                  style="width: 100%;"
              >
                <template #item="{ item, classes,index  }">
                  <tr :class="classes ">
                    <td class="pl2">{{ index }}</td>
                    <td>{{ item.testName }}</td>
                    <td>{{ item.status ? 'тест пройдений' : 'тест не пройдений' }}</td>
                    <td>{{ item.checked ? 'тест перевірений' : 'тест не перевірений' }}</td>
                    <td style="text-align: right">
                      <w-tooltip left v-if="item.status">
                        <template #activator="{ on }">
                          <w-button v-on="on" bg-color="grey-dark5"
                                    color="white"
                                    tile
                                    outline
                                    class="ma1"
                                    @click="openShowStudentTestResultDialog(item)">
                            Переглянути результат
                          </w-button>
                        </template>
                        Результат тесту
                      </w-tooltip>
                    </td>
                  </tr>
                </template>
              </w-table>
            </template>
            <template v-slot:[`item-content.4`]>
              <w-table
                  :headers="tableStudentTestsInfoHeader"
                  :items="testsCheckedStudent"
                  fixed-headers
                  style="width: 100%;"
              >
                <template #item="{ item, classes,index  }">
                  <tr :class="classes ">
                    <td class="pl2">{{ index }}</td>
                    <td>{{ item.testName }}</td>
                    <td>{{ item.estimate }}</td>
                    <td>{{ item.point }}</td>
                    <td>{{ item.scoredPoints }}</td>
                    <td>
                      {{
                        Math.floor(item.time / 60 % 60) > 9 ? Math.floor(item.time / 60 % 60) + ' хв.' : '0' + Math.floor(item.time / 60 % 60) + ' хв.'
                      }}
                      {{
                        Math.floor(item.time % 60) > 9 ? Math.floor(item.time % 60) + ' с.' : '0' + Math.floor(item.time % 60) + ' с.'
                      }}
                    </td>
                    <td>{{ item.amountQuestions }}</td>
                    <td>{{ item.amountTrueQuestions }}</td>
                    <td>{{ item.amountFalseQuestions }}</td>
                    <td style="text-align: right">
                      <w-tooltip left>
                        <template #activator="{ on }">
                          <w-button v-on="on" bg-color="grey-dark5"
                                    color="white"
                                    tile
                                    outline
                                    class="ma1"
                                    @click="openShowStudentTestResultDialog(item)">
                            Переглянути результат
                          </w-button>
                        </template>
                        Результат тесту
                      </w-tooltip>
                    </td>
                  </tr>
                </template>
              </w-table>
            </template>
          </w-tabs>
        </w-card>
      </w-flex>

    </w-dialog>
    <w-dialog width="400px"
              title-class="grey-dark5--bg white"
              v-model="showDeleteDialog"
              title="Видалити студента">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showDeleteDialog=false">
      </w-button>
      Ви хочеревидалити студента <strong>{{ inputsStudent.name }}</strong>?

      <w-flex>
        <w-button @click="deleteStudent" bg-color="grey-dark5"
                  color="white" class="mt3 mr5 grow">Так
        </w-button>
        <w-button @click="showDeleteDialog=false" bg-color="grey-dark5"
                  color="white" class="mt3 grow">Ні
        </w-button>
      </w-flex>
    </w-dialog>
    <!--    Student Tests Start -->
    <w-dialog width="1200px"
              v-model="showStudentTestsDialog"
              title-class="grey-dark5--bg white"
              title="Показати тести студента">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showStudentTestsDialog=false"></w-button>
      <w-flex fill-height>
        <w-card style="width: 100%; height: 75vh; overflow-y: auto" no-border content-class="pa0">
          <w-table
              :headers="tableStudentTestsHeader"
              :items="testStudents"
              fixed-headers
              style="width: 100%;"
          >
            <template #item="{ item, classes,index  }">
              <tr :class="classes ">
                <td class="pl2">{{ index }}</td>
                <td>{{ item.testName }}</td>
                <td>{{ item.status ? 'тест пройдений' : 'тест не пройдений' }}</td>
                <td>{{ item.checked ? 'тест перевірений' : 'тест не перевірений' }}</td>
                <td style="text-align: right">
                  <w-tooltip left v-if="item.status">
                    <template #activator="{ on }">
                      <w-button v-on="on" bg-color="grey-dark5"
                                color="white"
                                tile
                                outline
                                class="ma1"
                                @click="openShowStudentTestResultDialog(item)">
                        Переглянути результат
                      </w-button>
                    </template>
                    Результат тесту
                  </w-tooltip>
                </td>
              </tr>
            </template>
          </w-table>
        </w-card>
      </w-flex>
    </w-dialog>
    <w-dialog width="95vw"
              v-model="showStudentTestResultDialog"
              title-class="grey-dark5--bg white"
              title="Показати тести студента">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showStudentTestResultDialog=false"></w-button>
      <vue3-html2pdf
          :show-layout="false"
          :float-layout="true"
          :enable-download="true"
          :preview-modal="false"
          :paginate-elements-by-height="1400"
          :filename="`${studentTests.name}-${test.name}.pdf`"
          :pdf-quality="2"
          :manual-pagination="true"
          pdf-format="a4"
          pdf-orientation="landscape"
          pdf-content-width="800px"
          :html-to-pdf-options="htmlToPdfOptions"
          ref="html2Pdf"
      >
        <template v-slot:pdf-content>
          <section class="pdf-item">
            <div style="margin-bottom:10px;display: flex; flex-direction: column; max-width: 750px">
              <div class="d-flex justify-space-between align-center mb1"
                   style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 4px ;width: 100%">
                <div style="margin-right: 8px;">Стедент:</div>
                <div style="color: #000;">{{ testResultInfo.studentName }}</div>
              </div>
              <w-divider class="mb3" style="margin-bottom: 12px"></w-divider>
              <div class="d-flex justify-space-between align-center mb1"
                   style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 4px ;width: 100%">
                <div class="mr2" style="margin-right: 8px;width: 250px">Кількість питань:</div>
                <div style="color: #000;">{{ testResultInfo.amountQuestion }}</div>
              </div>
              <w-divider class="mb3" style="margin-bottom: 12px"></w-divider>

              <div class="d-flex justify-space-between align-center mb1"
                   style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 4px ;width: 100%">
                <div class="mr2" style="margin-right: 8px;width: 250px">Кількість балів за тест:</div>
                <div style="color: #000;">{{ testResultInfo.pointInfo }}</div>
              </div>
              <w-divider class="mb3" style="margin-bottom: 12px"></w-divider>

              <div class="d-flex justify-space-between align-center mb1"
                   style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 4px ;width: 100%">
                <div class="mr2" style="margin-right: 8px;width: 250px">Кількість балів, які набрав студент:</div>
                <div style="color: #000;">{{ testResultInfo.scoredPointsInfo }}</div>
              </div>
              <w-divider class="mb3" style="margin-bottom: 12px"></w-divider>

              <div class="d-flex justify-space-between align-center mb1"
                   style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 4px ;width: 100%">
                <div class="mr2" style="margin-right: 8px;width: 250px">Кількість правильних відповідей:</div>
                <div style="color: #000;">{{ testResultInfo.amountQuestionTrue }}</div>
              </div>
              <w-divider class="mb3" style="margin-bottom: 12px"></w-divider>

              <div class="d-flex justify-space-between align-center mb1"
                   style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 4px ;width: 100%">
                <div class="mr2" style="margin-right: 8px;width: 250px">Кількість не правильних відповідей:</div>
                <div style="color: #000;">{{ testResultInfo.amountQuestionFalse }}</div>
              </div>
              <w-divider class="mb3" style="margin-bottom: 12px"></w-divider>

              <div class="d-flex justify-space-between align-center mb1"
                   style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 4px ;width: 100%">
                <div class="mr2" style="margin-right: 8px;width: 250px">Стедент здав тест на:</div>
                <div style="color: #000;">
                  {{ `${testResultInfo.percentagesPoint} %` }}
                </div>

              </div>
            </div>
          </section>
          <div class="html2pdf__page-break"/>
          <section class="pdf-item">
            <div style="display: flex; flex-direction: column; max-width: 750px">
              <div v-for="(result, index) in studentsTestResult" :key="index"
                   style="padding: 8px; margin-bottom: 8px; border-radius: 8px; border-style: solid;border-width: 2px"
                   :style="{borderColor:result.is_test_result?'#1db3a8':'#ff6825'}"
              >
                <div style="display: flex;  margin-bottom:4px; flex-direction: column ">
                  <div style="display: flex; align-items: center">
                    <div>{{ index + 1 }}.</div>
                    <div class="div-question" v-html="result.test_question"></div>
                  </div>
                  <!--                  <div class="d-flex  mb3" style="display: flex;  margin-bottom:12px;">-->
                  <!--                    <div v-for="(photo, index) in result.photos" :key="index" class="mr3" style=" margin-right:12px;">-->
                  <!--                      <img :src="urlStorage + photo.path" style="max-width: 100px" :alt="photo.name">-->
                  <!--                    </div>-->
                  <!--                  </div>-->
                </div>
                <div
                    style="display: flex; flex-direction: column; justify-content: center; align-items: start; padding-left: 24px;margin-bottom: 4px">
                  <div v-if="result.question_type===1"
                       style="display: flex; align-items: start; justify-content: start; width: 100%">
                    <div v-if="result.test_question_answer===null">Ви не відповіли на дане
                      питання
                    </div>
                    <div v-else style="width: 100%; display: flex;">
                      <div style="display: flex; flex-direction: column; justify-content: center; width: 40%">
                        <div v-for="(item, i) in result.answers" :key="i"
                             style="display: flex; align-items: center; margin-bottom: 4px"
                        >
                          <div
                              style="padding: 8px; margin-right: 8px;border-radius: 50%;border: 2px solid rgba(0,0,0,.15); width: 4px; height: 4px"
                              :style="{backgroundColor:item.id==result.test_question_answer&&item.id==result.test_question_true_answer?'#1db3a8':item.id==result.test_question_answer&&item.id!==result.test_question_true_answer?'#ff6825':''}"
                          ></div>
                          <div v-html="item.label" class="div-question"></div>
                        </div>
                      </div>
                      <div class="d-flex align-start xs8"
                           style="display: flex; flex-direction: column; align-items: start; width: 60%">
                        <div style="display: flex; align-items: center">
                          <div class="mr3 title5 text-italic">Правильна відповідь:</div>
                          <div v-for="(item, i) in result.answers" :key="i" class="div-question title4 text-bold"
                               style="color: #1db3a8"
                               v-show="item.id==result.test_question_true_answer"
                               v-html="item.label"
                          >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-else-if="result.question_type===2" style="display: flex; justify-content: start;width: 100%">
                    <div v-if="result.test_question_answer==null">Ви не відповіли на дане
                      питання
                    </div>
                    <div v-else style="display:flex; width: 100%">
                      <div class="d-flex   xs4" style="display: flex; width: 40%">
                        <div class="mr3 title5 text-italic" style="margin-right: 8px;">Відповідь студента:</div>
                        <div class="title5 text-bold text-italic">
                          {{ result.test_question_answer ? result.test_question_answer : '' }}
                        </div>
                      </div>
                      <div class="d-flex align-start justify-space-between xs8"
                           style="display: flex;align-items: start;justify-content: space-between; width: 60%; flex-direction: column">
                        <div class="d-flex" style="display: flex">
                          <div class="mr3 title5 text-italic" style="margin-right: 8px">Правильна відповідь:</div>

                          <div class="title5 teal text-bold text-italic">
                            {{ result ? result.test_question_true_answer : '' }}
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                  <div v-else-if="result.question_type===3" style="width: 100%">
                    <div v-if="result.test_question_answer===null">Ви не відповіли на дане
                      питання
                    </div>
                    <div v-else class="d-flex justify-start" style="display: flex; justify-content: start ;width: 100%">
                      <div class="xs4" style="width: 40%">
                        <div class="d-flex align-center justify-start"
                             style="display: flex; align-items: center; justify-content: start; margin-left: 32px">
                          <div class="ml2 text5" v-for="(item) in selectionTrueAnswer"
                               style="margin-left: 8px ;width: 28px; height: 28px"
                               :key="item">{{ item.label }}
                          </div>
                        </div>
                        <div class="d-flex align-center justify-start"
                             style="display: flex; align-items: center; justify-content: start">
                          <div class="pa2 text5" style="padding: 8px">1.</div>
                          <div class="d-flex" style="display: flex">
                            <div class="pa2 bdrsm bd2  ml2"
                                 style="padding: 8px; margin-right: 8px;border-radius: 50%;border: 2px solid rgba(0,0,0,.15); width: 4px; height: 4px"
                                 v-for="(item) in selectionTrueAnswer" :key="item"
                                 :style="{backgroundColor:result&&`1-${item.label}`==result.test_question_answer[0]?'#00000026':''}"
                                 :class="result&&`1-${item.label}`==result.test_question_answer[0]?'blue-grey-dark3--bg':''"></div>
                          </div>
                        </div>
                        <div class="d-flex align-center justify-start"
                             style="display: flex; align-items: center; justify-content: start">
                          <div class="pa2" style="padding: 8px">2.</div>
                          <div class="pa2 bdrsm bd2  ml2"
                               style="padding: 8px; margin-right: 8px;border-radius: 50%;border: 2px solid rgba(0,0,0,.15); width: 4px; height: 4px"
                               v-for="(item) in selectionTrueAnswer" :key="item"
                               :style="{backgroundColor:result&&`2-${item.label}`==result.test_question_answer[1]?'#00000026':''}"
                               :class="result&&`2-${item.label}`==result.test_question_answer[1]?'blue-grey-dark3--bg':''"></div>

                        </div>
                        <div class="d-flex align-center justify-start"
                             style="display: flex; align-items: center; justify-content: start">
                          <div class="pa2" style="padding: 8px">3.</div>
                          <div class="pa2 bdrsm bd2  ml2"
                               style="padding: 8px; margin-right: 8px;border-radius: 50%;border: 2px solid rgba(0,0,0,.15); width: 4px; height: 4px"
                               v-for="(item) in selectionTrueAnswer" :key="item"
                               :style="{backgroundColor:result&&`3-${item.label}`==result.test_question_answer[2]?'#00000026':''}"
                               :class="result&&`3-${item.label}`==result.test_question_answer[2]?'blue-grey-dark3--bg':''"></div>
                        </div>
                      </div>
                      <div class="d-flex align-center justify-start xs8"
                           style="display: flex; align-items: center; justify-content: start; width: 60%">
                        <div>
                          <div class="mr3 title5 text-italic" style="margin-right: 12px">Правильна відповідь:</div>
                        </div>
                        <div>
                          <div class="d-flex align-center justify-start"
                               style="display: flex;align-items:center; justify-content: start;margin-left: 32px">
                            <div class="ml2" v-for="(item) in selectionTrueAnswer"
                                 style="margin-left: 8px;width: 28px; height: 28px"
                                 :key="item">{{ item.label }}
                            </div>
                          </div>
                          <div class="d-flex align-center justify-start"
                               style="display: flex; align-items: center; justify-content: start">
                            <div class="pa2" style="padding: 8px">1.</div>
                            <div class="d-flex" style="display: flex">
                              <div class="pa2 bdrsm bd2  ml2"
                                   style="padding: 8px; margin-right: 8px;border-radius: 50%;border: 2px solid rgba(0,0,0,.15); width: 4px; height: 4px"
                                   v-for="(item) in selectionTrueAnswer" :key="item"
                                   :style="{backgroundColor: result&&`1-${item.label}`===result.test_question_true_answer[0]?'#1db3a8':''}"
                                   :class="result&&`1-${item.label}`===result.test_question_true_answer[0]?'teal--bg':''"></div>
                            </div>
                          </div>
                          <div class="d-flex align-center justify-start"
                               style="display: flex; align-items: center; justify-content: start">
                            <div class="pa2" style="padding: 8px">2.</div>
                            <div class="pa2 bdrsm bd2  ml2"
                                 style="padding: 8px; margin-right: 8px;border-radius: 50%;border: 2px solid rgba(0,0,0,.15); width: 4px; height: 4px"
                                 v-for="(item) in selectionTrueAnswer" :key="item"
                                 :style="{backgroundColor:result&&`2-${item.label}`===result.test_question_true_answer[1]?'#1db3a8':''}"
                                 :class="result&&`2-${item.label}`===result.test_question_true_answer[1]?'teal--bg':''"></div>

                          </div>
                          <div class="d-flex align-center justify-start"
                               style="display: flex; align-items: center; justify-content: start">
                            <div class="pa2" style="padding: 8px">3.</div>
                            <div class="pa2 bdrsm bd2  ml2"
                                 style="padding: 8px; margin-right: 8px;border-radius: 50%;border: 2px solid rgba(0,0,0,.15); width: 4px; height: 4px"
                                 v-for="(item) in selectionTrueAnswer" :key="item"
                                 :style="{backgroundColor:result&&`3-${item.label}`===result.test_question_true_answer[2]?'#1db3a8':''}"
                                 :class="result&&`3-${item.label}`===result.test_question_true_answer[2]?'teal--bg':''"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </template>
      </vue3-html2pdf>
      <w-flex fill-height>
        <w-card class="dialog-test__result" no-border style="width: 70%; height: 75vh; overflow-y: auto">
          <w-flex v-if="testStudent.status" column>
            <div v-for="(result, index) in studentsTestResult" :key="index" class="align-center bdrs2 bd2 sh1 pa2 mb2"
                 :style="{borderColor:result.is_test_result?'#1db3a8':'#ff6825'}"
            >
              <div class="w-flex  mb1" style="flex-direction: column">
                <div class="mb3 d-flex align-center justify-start">
                  <div class="mr2">{{ index + 1 }}.</div>
                  <div class="div-question" v-html="result.test_question"></div>
                </div>


                <div class="d-flex  mb3">
                  <div v-for="(photo, index) in result.photos" :key="index" class="mr3">
                    <w-image :src="urlStorage + photo.path" tag="img" style="max-width: 100px"></w-image>
                  </div>
                </div>
              </div>
              <div class="w-flex column justify-center align-start pl6 mb1">
                <div v-if="result.question_type===1" class="d-flex align-start justify-start" style="width: 100%">
                  <div v-if="result.test_question_answer===null">Ви не відповіли на дане
                    питання
                  </div>
                  <div v-else style="width: 100%; display: flex;">
                    <div class="d-flex justify-center xs4" style="flex-direction: column">
                      <div v-for="(item, i) in result.answers" :key="i" class="d-flex align-center mb1">
                        <div class="pa2 bdrsm bd2 mr2"
                             :class="item.id==result.test_question_answer&&item.id==result.test_question_true_answer?'teal--bg':item.id==result.test_question_answer&&item.id!==result.test_question_true_answer?'deep-orange--bg':''"></div>
                        <div v-html="item.label" class="div-question title5"></div>
                      </div>
                    </div>
                    <div class="d-flex align-start xs8"
                         style="flex-direction: column">
                      <div class="d-flex align-center">
                        <div class="mr3 title5 text-italic">Правильна відповідь:</div>
                        <div v-for="(item, i) in result.answers" :key="i" class="div-question title4 teal text-bold"
                             v-show="item.id==result.test_question_true_answer"
                             v-html="item.label"
                        >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else-if="result.question_type===2" style="width: 100%" class="d-flex justify-start">
                  <div v-if="result.test_question_answer==null">Ви не відповіли на дане
                    питання
                  </div>
                  <div v-else style="width: 100%" class="d-flex">
                    <div class="d-flex column xs4">
                      <div class="mr3 title5 text-italic">Відповідь студента:</div>
                      <div class="title5 text-bold text-italic">
                        {{ result.test_question_answer ? result.test_question_answer : '' }}
                      </div>
                    </div>
                    <div class="d-flex align-start justify-space-between xs8"
                         style="flex-direction: column">
                      <div class="d-flex">
                        <div class="mr3 title5 text-italic">Правильна відповідь:</div>

                        <div class="title5 teal text-bold text-italic">
                          {{ result ? result.test_question_true_answer : '' }}
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
                <div v-else-if="result.question_type===3" style="width: 100%">
                  <div v-if="result.test_question_answer===null">Ви не відповіли на дане
                    питання
                  </div>
                  <div v-else class="d-flex justify-start" style="width: 100%">
                    <div class="xs4">
                      <div class="d-flex align-center justify-start" style="margin-left: 32px">
                        <div class="ml2 text5" v-for="(item) in selectionTrueAnswer" style="width: 20px; height: 20px"
                             :key="item">{{ item.label }}
                        </div>
                      </div>
                      <div class="d-flex align-center justify-start">
                        <div class="pa2 text5">1.</div>
                        <div class="d-flex">
                          <div class="pa2 bdrsm bd2  ml2" v-for="(item) in selectionTrueAnswer" :key="item"
                               :class="result&&`1-${item.label}`==result.test_question_answer[0]?'blue-grey-dark3--bg':''"></div>
                        </div>
                      </div>
                      <div class="d-flex align-center justify-start">
                        <div class="pa2">2.</div>
                        <div class="pa2 bdrsm bd2  ml2" v-for="(item) in selectionTrueAnswer" :key="item"
                             :class="result&&`2-${item.label}`==result.test_question_answer[1]?'blue-grey-dark3--bg':''"></div>

                      </div>
                      <div class="d-flex align-center justify-start">
                        <div class="pa2">3.</div>
                        <div class="pa2 bdrsm bd2  ml2" v-for="(item) in selectionTrueAnswer" :key="item"
                             :class="result&&`3-${item.label}`==result.test_question_answer[2]?'blue-grey-dark3--bg':''"></div>
                      </div>
                    </div>
                    <div class="d-flex align-center justify-start xs8">
                      <div>
                        <div class="mr3 title5 text-italic">Правильна відповідь:</div>
                      </div>
                      <div>
                        <div class="d-flex align-center justify-start" style="margin-left: 32px">
                          <div class="ml2" v-for="(item) in selectionTrueAnswer" style="width: 20px; height: 20px"
                               :key="item">{{ item.label }}
                          </div>
                        </div>
                        <div class="d-flex align-center justify-start">
                          <div class="pa2">1.</div>
                          <div class="d-flex">
                            <div class="pa2 bdrsm bd2  ml2" v-for="(item) in selectionTrueAnswer" :key="item"
                                 :class="result&&`1-${item.label}`===result.test_question_true_answer[0]?'teal--bg':''"></div>
                          </div>
                        </div>
                        <div class="d-flex align-center justify-start">
                          <div class="pa2">2.</div>
                          <div class="pa2 bdrsm bd2  ml2" v-for="(item) in selectionTrueAnswer" :key="item"
                               :class="result&&`2-${item.label}`===result.test_question_true_answer[1]?'teal--bg':''"></div>

                        </div>
                        <div class="d-flex align-center justify-start">
                          <div class="pa2">3.</div>
                          <div class="pa2 bdrsm bd2  ml2" v-for="(item) in selectionTrueAnswer" :key="item"
                               :class="result&&`3-${item.label}`===result.test_question_true_answer[2]?'teal--bg':''"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </w-flex>
          <w-flex v-else align-center justify-center class="title2" fill-height> Студент тест ще не пройшов!</w-flex>
        </w-card>
        <w-card color="ml3 dialog-test__result-info" no-border style="width: 30%">
          <w-flex column justify-space-between fill-height>
            <div>
              <div class="d-flex justify-space-between align-center mb1" style="width: 100%">
                <div class="mr2">Стедент:</div>
                <w-tag bg-color="grey-dark5" class="title5" color="white" md>{{ testResultInfo.studentName }}</w-tag>
              </div>
              <w-divider class="mb3"></w-divider>
              <div class="d-flex justify-space-between align-center mb1" style="width: 100%">
                <div class="mr2" style="width: 250px">Кількість питань:</div>
                <w-tag bg-color="grey-dark5" color="white body" md>{{ testResultInfo.amountQuestion }}</w-tag>
              </div>
              <w-divider class="mb3"></w-divider>
              <div class="d-flex justify-space-between align-center mb1" style="width: 100%">
                <div class="mr2" style="width: 250px">Кількість балів за тест:</div>
                <w-tag bg-color="grey-dark5" color="white body" md>{{ testResultInfo.pointInfo }}</w-tag>
              </div>
              <w-divider class="mb3"></w-divider>
              <div class="d-flex justify-space-between align-center mb1" style="width: 100%">
                <div class="mr2" style="width: 250px">Кількість які набрав студент:</div>
                <w-tag bg-color="grey-dark5" color="white body" md>{{ testResultInfo.scoredPointsInfo }}</w-tag>
              </div>
              <w-divider class="mb3"></w-divider>
              <div class="d-flex justify-space-between align-center mb1" style="width: 100%">
                <div class="mr2" style="width: 250px">Кількість правильних відпвідей:</div>
                <w-tag bg-color="teal" color="white body" md>{{ testResultInfo.amountQuestionTrue }}</w-tag>
              </div>
              <w-divider class="mb3"></w-divider>
              <div class="d-flex justify-space-between align-center mb1" style="width: 100%">
                <div class="mr2" style="width: 250px">Кількість не правильних відпвідей:</div>
                <w-tag bg-color="deep-orange" color="white body" md>{{ testResultInfo.amountQuestionFalse }}</w-tag>
              </div>
              <w-divider class="mb3"></w-divider>
              <div class="d-flex justify-space-between align-center mb1" style="width: 100%">
                <div class="mr2" style="width: 250px">Стедент здав тест на:</div>
                <w-tag bg-color="teal" color="white body" md v-if="testResultInfo.percentagesPoint>70">
                  {{ `${testResultInfo.percentagesPoint} %` }}
                </w-tag>
                <w-tag bg-color="deep-orange" color="white body" md v-if="testResultInfo.percentagesPoint<70">
                  {{ `${testResultInfo.percentagesPoint} %` }}
                </w-tag>
              </div>
              <w-divider class="mb3"></w-divider>
            </div>
            <div class="d-flex justify-space-between">
              <div>
                <w-button v-show="testStudent.status"
                          bg-color="grey-dark5"
                          color="white"
                          @click="generateReport">
                  Завантахити pdf
                </w-button>
              </div>
              <w-confirm top
                         bg-color="grey-dark5"
                         color="white"
                         cancel="Вийти" confirm="Підтвердити"
                         @confirm="checkedTest"
              >
                Оцінити тест
                <template #question>
                  <w-input v-model="estimate" :model-value="testResultInfo.percentagesPoint" type="number"
                           label="оцінка за тест"></w-input>
                </template>
              </w-confirm>
            </div>

          </w-flex>
        </w-card>
      </w-flex>
    </w-dialog>
    <w-dialog width="95vw"
              style="z-index: 499"
              v-model="showStudentPerformanceDialog"
              title-class="grey-dark5--bg white"
    >
      <template #title>
        <div>{{ `Показати успішність студента ${tableItem.name}` }}</div>
      </template>
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showStudentPerformanceDialog=false"></w-button>
      <w-flex fill-height column>
        <w-card style="width: 100%; height: 30vh;  overflow-y: auto">
          <w-table
              :headers="tableStudentTestsInfoHeader"
              :items="testsCheckedStudent"
              fixed-headers
              style="width: 100%;"
          >
            <template #item="{ item, classes, index  }">
              <tr :class="classes ">
                <td class="pl2">{{ index }}</td>
                <td>{{ item.testName }}</td>
                <td>{{ item.estimate }}</td>
                <td>{{ item.point }}</td>
                <td>{{ item.scoredPoints }}</td>
                <td>
                  {{
                    Math.floor(item.time / 60 % 60) > 9 ? Math.floor(item.time / 60 % 60) + ' хв.' : '0' + Math.floor(item.time / 60 % 60) + ' хв.'
                  }}
                  {{
                    Math.floor(item.time % 60) > 9 ? Math.floor(item.time % 60) + ' с.' : '0' + Math.floor(item.time % 60) + ' с.'
                  }}
                </td>
                <td>{{ item.amountQuestions }}</td>
                <td>{{ item.amountTrueQuestions }}</td>
                <td>{{ item.amountFalseQuestions }}</td>
                <td style="text-align: right">
                  <w-tooltip left>
                    <template #activator="{ on }">
                      <w-button v-on="on" bg-color="grey-dark5"
                                color="white"
                                tile
                                outline
                                class="ma1"
                                @click="openShowStudentTestResultDialog(item)">
                        Переглянути результат
                      </w-button>
                    </template>
                    Результат тесту
                  </w-tooltip>
                </td>
              </tr>
            </template>
          </w-table>
        </w-card>
        <w-card style="max-width: 2500px;" class="mt4">
          <LineChart :chart-data="chartData" ref="line" :chart-options="chartOptionsLine" :width="2500"
                     :height="450"/>
        </w-card>


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
import Vue3Html2pdf from 'vue3-html2pdf'
import LineChart from '../../components/LineChart'

const URL_STORAGE = process.env.VUE_APP_URL_STORAGE
const BASE_URL = process.env.VUE_APP_API_URL
export default {
  name: 'HelloWorld',
  components: {
    Vue3Html2pdf,
    LineChart
  },
  data() {
    return {
      urlStorage: URL_STORAGE,
      baseUrlApi: BASE_URL,
      isPassword: true,
      openDrawer1: true,
      openDrawer: true,
      showCreateDialog: false,
      showDeleteDialog: false,
      showEditDialog: false,
      showShowDialog: false,
      showStudentTestsDialog: false,
      showStudentTestResultDialog: false,
      showStudentPerformanceDialog: false,
      tableHeader: [
        {label: 'id', key: 'id'},
        {label: 'Школа', key: 'school'},
        {label: 'ім\'я', key: 'name'},
        {label: 'Клас', key: 'class'},
        {label: 'Паралель', key: 'parallel'},
      ],
      activeFilter: 0,
      tableStudentTestsHeader: [
        {label: '№', key: 'id'},
        {label: 'Назва', key: 'testName'},
        {label: 'Пройдений', key: 'status'},
        {label: 'Переввірений', key: 'checked'},
      ],
      tableStudentTestsInfoHeader: [
        {label: '№', key: 'id'},
        {label: 'Назва', key: 'testName'},
        {label: 'Оцінка', key: 'estimate'},
        {label: 'Бали за тест', key: 'point'},
        {label: 'Набрані бали', key: 'scoredPoints'},
        {label: 'Час проходження', key: 'time'},
        {label: 'К-сть питань', key: 'amountQuestions'},
        {label: 'Правельні в-ді', key: 'amountTrueQuestions'},
        {label: 'Не правильні в-ді', key: 'amountFalseQuestions'},
      ],
      tableItem: null,
      studentPerformance: null,
      studentTests: [],
      test: [],
      keyword: '',
      keywordFilter: keyword => item => {
        const allTheColumns = `${item.id} ${item.name} ${item.nick_name}`
        return new RegExp(keyword, 'i').test(allTheColumns)
      },
      inputsStudentData: {
        name: null,
        school: null,
        class: null,
        parallel: null,
        nick_name: null,
      },
      inputsStudentPassword: {
        password: null,
        password_confirmation: null,
      },
      inputsStudent: {
        name: null,
        nick_name: null,
        school: null,
        class: null,
        parallel: null,
        password: null,
        password_confirmation: null,
      },
      tabs: [
        {title: 'Змінити дані студента'},
        {title: 'Змінити пароль студента'},
      ],
      dialogShowTabs: [
        {title: 'Дані'},
        {title: 'Пароль'},
        {title: 'Тести'},
        {title: 'Оцінки'},
      ],
      showProgress: false,
      selectionTrueAnswer: [
        {label: 'А', value: 'А'},
        {label: 'Б', value: 'Б'},
        {label: 'В', value: 'В'},
        {label: 'Г', value: 'Г'},
        {label: 'Д', value: 'Д'},
      ],
      estimate: null
    }
  },

  created() {
    this.getAll()
  },
  computed: {
    ...mapGetters({
      students: 'students/students',
      studentsTestResult: 'students/studentsTestResult',
      testStudent: 'testStudents/testStudent',
      testStudents: 'testStudents/testStudents',
      testsCheckedStudent: 'testStudents/testsCheckedStudent',
      errors: 'students/errors',
    }),
    testResultInfo() {
      let pointInfo = null
      let studentName = this.test.studentName
      let scoredPointsInfo = null
      let amountQuestion = this.test.test.questions.length
      let amountQuestionTrue = []
      let amountQuestionFalse = []

      this.studentsTestResult.forEach(el => {
        pointInfo += el.point
        scoredPointsInfo += el.scored_points
        if (el.is_test_result) {
          amountQuestionTrue.push(el)
        } else {
          amountQuestionFalse.push(el)
        }
      })
      let percentagesPoint = Math.round(scoredPointsInfo / pointInfo * 100)
      return {
        pointInfo: pointInfo,
        studentName: studentName,
        scoredPointsInfo: scoredPointsInfo,
        amountQuestion: amountQuestion,
        amountQuestionTrue: amountQuestionTrue.length,
        amountQuestionFalse: amountQuestionFalse.length,
        percentagesPoint: percentagesPoint,
      }
    },
    htmlToPdfOptions() {
      return {
        margin: 5,
        filename: `${this.test.studentName}-${this.test.testName}.pdf`,

        html2canvas: {
          scale: 1,
          useCORS: true
        },
        image: {
          type: 'png',
        },
      }

    },
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
        this.keywordFilter(this.keyword)
      ]
    },
    chartData() {

      let data = [];
      let name = [];
      let length = this.testsCheckedStudent.length
      for (let i = 0; i < length; i++) {
        name.push(this.testsCheckedStudent[i].testName)
        data.push(this.testsCheckedStudent[i].estimate)
      }

      return {
        labels: name,
        datasets: [
          {
            label: 'Середня сума робіт на 1 НЗ',
            backgroundColor: '#7feae2',
            borderColor: '#1db3a8',
            borderWidth: 2,
            pointRadius: 5,
            data: data
          },
        ],
      }
    },

    chartOptionsLine() {
      return {
        // layout: {
        //   padding: 0
        // },
        // events: ['click'],

        responsive: true,
        plugins: {
          legend: {
            display: false,
            align: 'start',
            position: 'top',
            labels: {
              color: 'rgb(102, 102, 102,1)',
              padding: 5,
              boxWidth: 15,
              font: {
                size: 12,
                lineHeight: 2,
              },
              usePointStyle: true,


            },
          },

        },

        scales: {
          x: {
            ticks: {
              display: true,
              color: 'rgb(102, 102, 102,1)',
            },
            grid: {
              borderColor: 'rgb(229, 229, 229,1)',
              color: 'rgb(229, 229, 229,1)',
            }
          },
          y: {
            ticks: {
              display: true,
              color: 'rgb(102, 102, 102,1)',
            },
            grid: {
              borderColor: 'rgb(229, 229, 229,1)',
              color: 'rgb(229, 229, 229,1)',
            }
          },
        },

      }
    },
  },
  methods: {
    ...mapActions({
      getAll: 'students/getAll',
      getStudentTestResult: 'students/getStudentTestResult',
      getTestStudentByTestIdByStudentId: 'testStudents/getTestStudentByTestIdByStudentId',
      getTestStudentByStudentId: 'testStudents/getTestStudentByStudentId',
      getTestStudentCheckedByStudentId: 'testStudents/getTestStudentCheckedByStudentId',
      checked: 'testStudents/checked',
      store: 'students/store',
      update: 'students/update',
      delete: 'students/delete',
    }),
    setActiveFilter() {
      this.activeFilter = 12
    },
    openCreateDialog() {
      this.inputsStudent = Object.assign({}, [])
      this.showCreateDialog = true
    },
    openDeleteDialog(item) {
      this.inputsStudent = Object.assign({}, item)
      this.showDeleteDialog = true
    },
    openEditDialog(item) {
      // this.inputsStudent=item
      this.inputsStudentData.id = item.id
      this.inputsStudentData.name = item.name
      this.inputsStudentData.class = item.class
      this.inputsStudentData.school = item.school
      this.inputsStudentData.parallel = item.parallel
      this.inputsStudentData.nick_name = item.nick_name
      this.inputsStudentPassword.id = item.id
      this.inputsStudentPassword.password = item.password
      this.showEditDialog = true
    },
    openShowDialog(item) {
      this.getTestStudentByStudentId({studentId: item.id})
      this.getTestStudentCheckedByStudentId({studentId: item.id})
      this.tableItem = item
      this.showShowDialog = true
    },
    openShowStudentPerformanceDialog(item) {
      let data = {studentId: item.id,}
      this.tableItem = item
      this.getTestStudentCheckedByStudentId(data).then(() => {
        this.showStudentPerformanceDialog = true
      })
      this.studentPerformance = item

    },
    openShowStudentTestDialog(student) {
      this.getTestStudentByStudentId({studentId: student.id})
      this.showStudentTestsDialog = true
    },
    openShowStudentTestResultDialog(test) {
      let data = {studentId: test.studentId, testId: test.testId}
      this.showProgress = true
      this.test = test
      console.log(test)
      this.getTestStudentByTestIdByStudentId(data)
      this.getStudentTestResult(data).then(() => {
        this.showProgress = false
      })
      this.showStudentTestResultDialog = true
    },
    storeStudent() {
      this.store(this.inputsStudent).then(() => {
        console.log(this.errors)
        if (this.errors.length === 0)
          this.showCreateDialog = false
      })
    },
    updateStudentData() {
      console.log(this.inputsStudentData)
      this.update(this.inputsStudentData).then(() => {
        if (this.errors.length === 0)
          this.showEditDialog = false
      })
    },
    updateStudentPassword() {
      this.update(this.inputsStudentPassword).then(() => {
        if (this.errors.length === 0)
          this.showEditDialog = false
      })
    },
    deleteStudent() {
      this.delete(this.inputsStudent.id).then(() => {
        this.showDeleteDialog = false
      })
    },
    generateReport() {
      this.$refs.html2Pdf.generatePdf()

    },
    checkedTest() {
      let data = {id: this.test.id, estimate: this.estimate}
      this.checked(data).then(() => {
        this.test.checked = 1
      })
    }
  }
}
</script>

<style>
.dialog-test__result .w-card__content {
  padding: 0 !important;
  padding-right: 5px !important;
}

.dialog-test__result-info .w-card__content {
  border: 2px solid #505050;
  border-radius: 8px;
  box-shadow: 0 0 1px #0000001a, 2px 2px 8px #00000026;
}

.div-question {
  margin-bottom: 0;
  text-indent: 0.2em;
  line-height: 14px !important;
}

.w-list__item {
  width: 100% !important;
  cursor: pointer;
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
