<template>
  <w-flex justify-space-between style="width: 100%; padding-left: 290px" column fill-height class="pr3 pt3 pb3 pl10">
    <w-card style="max-width: calc(100vw - 275px); max-height: calc(100vh - 106px);  overflow-y: auto"
            bg-color="blue-grey-dark2" content-class="pa0" no-border>
      <w-table
          :headers="tableStudentTestHeader"
          :items="studentTests"
          fixed-headers
          :filter="filters[activeFilter]"
          style="width: 100%;"
      >
        <template #item="{ item, classes,index  }">
          <tr :class="classes">
            <td class="pl2 pa4 blue-grey-light3">{{ index }}</td>
            <td class="pa4 blue-grey-light3">{{ item.name }}</td>
            <td class="pa4 blue-grey-light3">{{ item.description }}</td>
            <td class="pa4 blue-grey-light3">
              <w-tooltip v-if="item.status" left bg-color="blue-grey-dark3" color="blue-grey-light3">
                <template #activator="{ on }">
                  <w-icon color="teal" v-on="on">mdi mdi-checkbox-blank-circle</w-icon>
                </template>
                <div class="title3 text-italic">Тест пройдений</div>
              </w-tooltip>
              <w-tooltip v-else left bg-color="blue-grey-dark3" color="blue-grey-light3">
                <template #activator="{ on }">
              <w-icon color="deep-orange" v-on="on">mdi mdi-checkbox-blank-circle</w-icon>
                </template>
                <div class="title3 text-italic">Тест не пройдений</div>
              </w-tooltip>
            </td>
            <td class="pa4 blue-grey-light3">{{ item.created }}</td>
            <td class="pa4 blue-grey-light5">
              <w-flex  align-center>
                <w-tooltip v-if="item.status" left bg-color="blue-grey-dark3" color="blue-grey-light3">
                  <template #activator="{ on }">
                    <w-button
                        v-on="on"
                        tile
                        color="blue-grey-light5"
                        @click="openTestResultDialog(item)"
                        lg
                    >
                      <w-icon class="mr2">mdi mdi-text-box-check-outline</w-icon>
                      Результат тесту
                    </w-button>
                  </template>
                  <div class="title3 text-italic">Результат тесту</div>
                </w-tooltip>
                <w-tooltip v-else left bg-color="blue-grey-dark3" color="blue-grey-light3">
                  <template #activator="{ on }">
                    <w-button
                        v-on="on"
                        tile

                        color="blue-grey-light5"
                        @click="openTestInfoDialog(item)"
                        lg
                    >
                      <w-icon class="mr2">mdi mdi-clipboard-text-clock-outline</w-icon>
                      Пройти тест
                    </w-button>
                  </template>
                  <div class="title3 text-italic">
                    Пройти тест
                  </div>

                </w-tooltip>
              </w-flex>
            </td>
          </tr>
        </template>
        <template #no-data>
          <div class="title2" v-if="studentTests.length===0">
            Нічого не знайдено!
          </div>
          <div>
            <w-button   @click="search=''" class="pa4 mt2"  lg bg-color="blue-grey-dark3" color="blue-grey-light3"
                        icon="mdi mdi-reload"
            ></w-button>

          </div>
        </template>
      </w-table>
    </w-card>
  </w-flex>
  <w-drawer
      top
      v-model="drawerSearch"
      absolute
      style="top: 40px;width: calc(100vw - 250px); margin-left: 250px; z-index: 10"
      height="50px"
      color="blue-grey-dark3" bg-color="blue-grey-light3"
  >
    <w-flex  wrap class="mx10">
      <div class="xs8 d-flex align-center justify-center">
        <w-input
            style="width: 100%"
            color="blue-grey-dark3"
            v-model="search"
            placeholder="Пошук"
            inner-icon-left="wi-search"
            @click="setActiveFilter"
        >
        </w-input>
      </div>
      <div class="xs4 w-flex justify-end">
        <w-button
            :bg-color="activeFilter !== 0?'blue-grey-light3':'blue-grey-dark3'"
            :color="activeFilter !== 0?'blue-grey-dark3':'blue-grey-light3'"
            class="mr2"
            @click="activeFilter = 0"
            tile
            :outline="activeFilter !== 0">
          Без фільтра
        </w-button>
        <w-button
            :bg-color="activeFilter !== 1?'blue-grey-light3':'blue-grey-dark3'"
            :color="activeFilter !== 1?'blue-grey-dark3':'blue-grey-light3'"
            class="mr2"
            @click="activeFilter = 1"
            tile
            :outline="activeFilter !== 1">
          Пройдені тести
        </w-button>
        <w-button
            :bg-color="activeFilter !== 2?'blue-grey-light3':'blue-grey-dark3'"
            :color="activeFilter !== 2?'blue-grey-dark3':'blue-grey-light3'"
            @click="activeFilter = 2"
            tile
            :outline="activeFilter !== 2">
          Не пройдені тести
        </w-button>
      </div>
    </w-flex>
  </w-drawer>
  <w-button absolute top left bg-color="blue-grey-dark3" color="blue-grey-light3" class="mt3" style="top:40px; left: 250px"
            icon="mdi mdi-filter-multiple" xl tile @click="openDrawer">
  </w-button>
  <w-dialog
      class="dialog-test"
      fullscreen
      persistent
      v-model="showTestDialog"
      content-class="mt3"
      bg-color="blue-grey-light3"
      title-class="blue-grey-dark4--bg blue-grey-light5">

    <template #title>
      <w-flex column align-start>
        <div>{{ testRead ? testRead.name : '' }}</div>
        <div>
          <div class="d-flex align-center">
            <div class="mr2 body blue-grey-light5">
              Час до завершення тесту -
            </div>
            <w-tag class="mr1" bg-color="blue-grey-light5" color="blue-grey-dark4 body" md>{{ min }}</w-tag>
            <span>:</span>
            <w-tag class="ml1" bg-color="blue-grey-light5" color="blue-grey-dark4 body" md>{{ sec }}</w-tag>
          </div>

        </div>
        <w-button absolute top right bg-color="blue-grey-light3"
                  color="blue-grey-dark4" icon="wi-cross" tile @click="closeTestDialog"></w-button>
      </w-flex>
    </template>
    <w-flex column style="width: 90%; margin: 0 auto">
      <div v-for="(value, index) in testRead.questions" :key="index" class="align-center mb2">
        <div class="w-flex  mb1" style="flex-direction: column">
          <div class="mb3 d-flex align-center justify-start">
            <div class="mr2">{{ index + 1 }}.</div>
            <div class="div-question" v-html="value.question"></div>
          </div>
          <div class="d-flex  mb3">
            <div v-for="(photo, index) in value.photos" :key="index" class="mr3">
              <w-image :src="urlStorage + photo.path" tag="img" style="max-width: 150px"></w-image>
            </div>
          </div>

        </div>
        <div class="w-flex column justify-center align-start pl6 mb1">
          <div v-if="value.questionType===1" class="d-flex align-center justify-center">
            <w-radios
                v-model="selection.answers[`question${index}`]"
                :items="value.answers"
                color="grey-dark5 ma0"
                @update:model-value="input2($event, value.id, index)"
            >
              <template #item="{ item }">
                <div class="span-answer__value grey-dark5 d-flex align-center" v-html="item.label"></div>
              </template>
            </w-radios>
          </div>
          <div v-else-if="value.questionType===2" style="width: 100%">
            <w-input @update:model-value="input3($event,value.id,index)" outline color="grey-dark5" style="width: 300px"
                     placeholder="Введіть свою відповідь"></w-input>
          </div>
          <div v-else-if="value.questionType===3">
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
                  <w-radio :name="`item${value.id}1`" color="grey-dark5 ma0" @change="input1(value.id,1,'А', index)"
                           class="pa2"></w-radio>
                  <w-radio :name="`item${value.id}1`" color="grey-dark5 ma0" @change="input1(value.id,1,'Б', index)"
                           class="pa2"></w-radio>
                  <w-radio :name="`item${value.id}1`" color="grey-dark5 ma0" @change="input1(value.id,1,'В', index)"
                           class="pa2"></w-radio>
                  <w-radio :name="`item${value.id}1`" color="grey-dark5 ma0" @change="input1(value.id,1,'Г', index)"
                           class="pa2"></w-radio>
                  <w-radio :name="`item${value.id}1`" color="grey-dark5 ma0" @change="input1(value.id,1,'Д', index)"
                           class="pa2"></w-radio>
                </div>
              </div>
              <div class="d-flex align-center justify-start">
                <div class="pa2">2.</div>
                <div>
                  <w-radio :name="`item${value.id}2`" color="grey-dark5 ma0" @change="input1(value.id,2, 'А', index)"
                           class="pa2"></w-radio>
                  <w-radio :name="`item${value.id}2`" color="grey-dark5 ma0" @change="input1(value.id,2, 'Б', index)"
                           class="pa2"></w-radio>
                  <w-radio :name="`item${value.id}2`" color="grey-dark5 ma0" @change="input1(value.id,2, 'В', index)"
                           class="pa2"></w-radio>
                  <w-radio :name="`item${value.id}2`" color="grey-dark5 ma0" @change="input1(value.id,2, 'Г', index)"
                           class="pa2"></w-radio>
                  <w-radio :name="`item${value.id}2`" color="grey-dark5 ma0" @change="input1(value.id,2, 'Д', index)"
                           class="pa2"></w-radio>
                </div>
              </div>
              <div class="d-flex align-center justify-start">
                <div class="pa2">3.</div>
                <div>
                  <w-radio :name="`item${value.id}3`" color="grey-dark5 ma0" @change="input1(value.id,3, 'А', index)"
                           class="pa2"></w-radio>
                  <w-radio :name="`item${value.id}3`" color="grey-dark5 ma0" @change="input1(value.id,3, 'Б', index)"
                           class="pa2"></w-radio>
                  <w-radio :name="`item${value.id}3`" color="grey-dark5 ma0" @change="input1(value.id,3, 'В', index)"
                           class="pa2"></w-radio>
                  <w-radio :name="`item${value.id}3`" color="grey-dark5 ma0" @change="input1(value.id,3, 'Г', index)"
                           class="pa2"></w-radio>
                  <w-radio :name="`item${value.id}3`" color="grey-dark5 ma0" @change="input1(value.id,3, 'Д', index)"
                           class="pa2"></w-radio>
                </div>
              </div>
            </div>
          </div>
        </div>
        <w-divider class="mt3 mb3"></w-divider>
      </div>
    </w-flex>
    <template #actions>
      <div class="spacer"></div>
      <w-button @click="createTestResult"
                bg-color="blue-grey-dark4"
                color="blue-grey-light5" xl
      >Надіслати відповідь
      </w-button>
      <div class="spacer"></div>
    </template>
  </w-dialog>
  <w-dialog
      fullscreen
      v-model="showTestResultDialog"
      :title="testRead?testRead.name:''"
      bg-color="blue-grey-light3"
      title-class="blue-grey-dark4--bg blue-grey-light5">
    <w-button absolute top right bg-color="blue-grey-light3"
              color="blue-grey-dark4" icon="wi-cross" tile @click="showTestResultDialog=false"></w-button>
    <w-flex fill-height>
      <w-card class="dialog-test__result" no-border style="width: 70%; height: calc(100vh - 70px); overflow-y: auto">
        <w-flex column>
          <div v-for="(result, index) in testResult" :key="index" class="align-center bdrs2 bd2 sh1 pa2 mb2"
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
                    <div class="body">
                      {{
                        result.is_test_result ? 'Ви молодець' : 'Нічого страшного получиться іншим разом'
                      }}
                      <w-icon md>mdi mdi-emoticon-wink-outline</w-icon>
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
                    <div class="mr3 title5 text-italic">Ваша відповідь:</div>
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
                    <div class="body">
                      {{
                        result && result.is_test_result ? 'Ви молодець' : 'Нічого страшного получиться іншим разом'
                      }}
                      <w-icon md>mdi mdi-emoticon-wink-outline</w-icon>
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
                      <div class="body">
                        {{
                          result && result.is_test_result ? 'Ви молодець' : 'Нічого страшного получиться іншим разом'
                        }}
                        <w-icon md>mdi mdi-emoticon-wink-outline</w-icon>
                      </div>
                    </div>
                    <div>
                      <div class="d-flex align-center justify-start" style="margin-left: 32px">
                        <div class="ml2" v-for="(item, i) in selectionTrueAnswer" style="width: 20px; height: 20px"
                             :key="i">{{ item.label }}
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
      </w-card>
      <w-card color="ml3 dialog-test__result-info" no-border style="width: 30%">
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
          <div class="mr2" style="width: 250px">Кількість які Ви набрали:</div>
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
          <div class="mr2" style="width: 250px">Ви здали тест на:</div>
          <w-tag bg-color="teal" color="white body" md v-if="testResultInfo.percentagesPoint>70">
            {{ `${testResultInfo.percentagesPoint} %` }}
          </w-tag>
          <w-tag bg-color="deep-orange" color="white body" md v-if="testResultInfo.percentagesPoint<70">
            {{ `${testResultInfo.percentagesPoint} %` }}
          </w-tag>
        </div>
        <w-divider class="mb3"></w-divider>

      </w-card>
    </w-flex>

  </w-dialog>
  <w-dialog
      width="600px"
      v-model="showTestInfoDialog"
      bg-color="blue-grey-light3"
      title-class="blue-grey-dark4--bg blue-grey-light5"
      title="Інформація про тест"
  >
    <w-button absolute top right bg-color="blue-grey-light3"
              color="blue-grey-dark4" icon="wi-cross" tile @click="showTestInfoDialog=false"></w-button>
    <w-flex column fill-height v-if="currentTime===time">
      <div class="d-flex align-center mb2" style="width: 100%">
        <div class="mr2" style="width: 160px">Назва тесту:</div>

        <div>{{ testRead.name }}</div>
      </div>
      <w-divider class="mb3" color="blue-grey-dark4"></w-divider>
      <div class="d-flex align-center mb2" style="width: 100%">
        <div class="mr2" style="width: 160px">Кількість питань:</div>
        <w-tag bg-color="blue-grey-dark4" color="blue-grey-light5" shadow>{{ testInfo.amountQuestion }}</w-tag>
      </div>
      <div class="d-flex align-center mb2" style="width: 100%">
        <div class="mr2" style="width: 160px">Кількість балів за тест:</div>
        <w-tag bg-color="blue-grey-dark4" color="blue-grey-light5" shadow>{{ testInfo.pointInfo }}</w-tag>
      </div>
      <div class="d-flex align-center mb2" style="width: 100%">
        <div class="mr2" style="width: 160px">Час проведення тесту:</div>
        <w-tag bg-color="blue-grey-dark4" color="blue-grey-light5" shadow>{{ `${currentTime / 60} хв.` }}</w-tag>
      </div>
      <w-divider color="blue-grey-dark4"></w-divider>
    </w-flex>
    <w-flex v-else column fill-height>
      <div class="d-flex align-center mb2" style="width: 100%">
        <div class="mr2">Ви вже розпочали тест!</div>
      </div>
      <w-divider class="mb3"></w-divider>
      <div class="d-flex align-center mb2" style="width: 100%">
        <div class="mr2">До закінчення часу здачі тесту залишилось -</div>
        <w-tag bg-color="blue-grey-dark4" color="blue-grey-light5 body" md>{{ min }}</w-tag>
        <span>:</span>
        <w-tag class="ml1" bg-color="blue-grey-dark4" color="blue-grey-light5 body" md>{{ sec }}</w-tag>
      </div>
      <w-divider color="blue-grey-dark4"></w-divider>
    </w-flex>
    <template #actions>
      <div class="spacer"/>
      <w-button v-show="currentTime===time"
                class="mr2"
                @click="showTestInfoDialog = false"
                bg-color="blue-grey-dark4" color="blue-grey-light5">
        Повернутись назад
      </w-button>
      <w-button v-if="currentTime===time"
                @click="openTestDialog"
                bg-color="blue-grey-dark4" color="blue-grey-light5">
        Пройти тест
      </w-button>
      <w-button v-else
                @click="openTestDialog"
                bg-color="blue-grey-dark4" color="blue-grey-light5">
        Продовжити тест
      </w-button>
      <div class="spacer"/>
    </template>
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
</template>

<script>
import {mapActions, mapGetters} from "vuex";

const URL_STORAGE = process.env.VUE_APP_URL_STORAGE
const BASE_URL = process.env.VUE_APP_API_URL
export default {
  name: 'HelloWorld',
  components: {},
  data() {
    return {
      urlStorage: URL_STORAGE,
      baseUrlApi: BASE_URL,
      showTestDialog: false,
      showTestResultDialog: false,
      showTestInfoDialog: false,
      testRead: null,
      selection: {
        answers: {},
        testId: null,
        studentId: null
      },
      item: 'А',
      selectionTrueAnswer: [
        {label: 'А'},
        {label: 'Б'},
        {label: 'В'},
        {label: 'Г'},
        {label: 'Д'},
      ],
      htmlToPdfOptions: {
        margin: 0,
        filename: `hehehe.pdf`,
        image: {
          type: 'jpeg',
          quality: 0.98
        },
        enableLinks: false,
        html2canvas: {
          scale: 1,
          useCORS: true
        },
        jsPDF: {
          unit: 'in',
          format: 'a4',
          orientation: 'portrait'
        }
      },
      currentTime: null,
      sec: null,
      min: null,
      timer: null,
      showProgress: false,
      tableStudentTestHeader: [
        {label: '№', key: 'id', width: '5%'},
        {label: 'Назва', key: 'title', width: '30%'},
        {label: 'Опис', key: 'description', width: '35%'},
        {label: 'Статус', key: 'status', width: '10%'},
        {label: 'Створено', key: 'created', width: '10%'},
        {label: 'Дія', width: '10%'},
      ],
      search: '',
      drawerSearch: false,
      activeFilter: 0,
      keywordFilter: keyword => item => {
        const allTheColumns = `${item.id} ${item.name} ${item.nick_name}`
        return new RegExp(keyword, 'i').test(allTheColumns)
      },
    }
  },
  created() {
    this.currentTime = this.time
    this.showProgress = true
    this.getStudentTests().then(() => {
      this.showProgress = false
    })
  },
  computed: {
    ...mapGetters({
      studentTests: "studentTests/studentTests",
      testResult: "testResults/testResult",
      student: 'auth/user'
    }),
    testResultInfo() {
      let pointInfo = null
      let scoredPointsInfo = null
      let amountQuestion = this.testRead.questions.length
      let amountQuestionTrue = []
      let amountQuestionFalse = []

      this.testResult.forEach(el => {
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
        scoredPointsInfo: scoredPointsInfo,
        amountQuestion: amountQuestion,
        amountQuestionTrue: amountQuestionTrue.length,
        amountQuestionFalse: amountQuestionFalse.length,
        percentagesPoint: percentagesPoint,
      }
    },
    testInfo() {
      let pointInfo = null
      let amountQuestion = this.testRead.questions.length
      this.testRead.questions.forEach(el => {
        pointInfo += el.points
      })
      return {
        pointInfo: pointInfo,
        amountQuestion: amountQuestion,
      }


    },
    time() {
      return 20 * 60
    },
    filters() {
      return [
        null,
        item => item.status === 1,
        item => item.status === 0,
        this.keywordFilter(this.search)
      ]
    },
  },
  watch: {
    currentTime(time) {
      if (time === 0) {
        this.stopTimer()
        this.createTestResult()
      }
    }
  },
  methods: {
    ...mapActions({
      getStudentTests: "studentTests/getStudentTests",
      storeTestResult: 'testResults/store',
      getTestResult: 'testResults/getTestResults',
      update: 'studentTests/edit'
    }),
    openTestDialog() {
      this.showTestDialog = true
      this.showTestInfoDialog = false
      this.startTimer()
    },
    openTestInfoDialog(test) {
      this.testRead = test
      this.showTestInfoDialog = true
    },
    openTestResultDialog(test) {
      this.testRead = test
      this.getTestResult(test.id)
      this.showTestResultDialog = true
    },
    closeTestDialog() {
      this.showTestDialog = false
    },
    isActive(event) {
      let active = document.querySelectorAll('.active-class');
      active.forEach((link) => link.classList.remove('active-class'));
      let elem = event.target.parentElement.parentElement
      if (elem) {
        elem.classList.add('active-class')
      }
    },
    input1(question, answer, event, index) {
      if (this.selection.answers[`question${index}`] === undefined || this.selection.answers[`question${index}`] === null) {
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
      this.selection.answers[`question${index}`] = {questionId: questionId, answerId: JSON.stringify(event)}
    },
    input3(event, questionId, index) {
      this.selection.answers[`question${index}`] = {questionId: questionId, answerId: JSON.stringify(event)}
    },
    createTestResult() {
      this.selection.testId = this.testRead.id
      this.selection.studentId = this.student.id
      let selection = this.selection
      this.testRead.questions.forEach(function (el, index) {
        if (selection.answers[`question${index}`] === undefined)
          if (el.questionType === 1) {
            selection.answers[`question${index}`] = {questionId: el.id, answerId: null}
          } else if (el.questionType === 2) {
            selection.answers[`question${index}`] = {questionId: el.id, answerId: null}
          } else if (el.questionType === 3) {
            selection.answers[`question${index}`] = {questionId: el.id, answerId: null}
          }
      })
      this.stopTimer()
      this.storeTestResult(JSON.stringify(this.selection)).then(() => {
        let data = {
          id: this.testRead.testStudentId,
          status: true,
          time: this.currentTime,
          point: this.testResultInfo.pointInfo,
          scored_points: this.testResultInfo.scoredPointsInfo,
          amount_questions: this.testResultInfo.amountQuestion,
          amount_true_questions: this.testResultInfo.amountQuestionTrue,
          amount_false_questions: this.testResultInfo.amountQuestionFalse,
        }
        this.update(data).then(() => {
          this.testRead.status = 1
          this.showTestDialog = false
          this.showTestResultDialog = true
        })

      })
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.currentTime--
        this.sec = Math.floor(this.currentTime % 60) > 9 ? Math.floor(this.currentTime % 60) + ' с.' : '0' + Math.floor(this.currentTime % 60) + ' с.'
        this.min = Math.floor(this.currentTime / 60 % 60) > 9 ? Math.floor(this.currentTime / 60 % 60) + ' хв.' : '0' + Math.floor(this.currentTime / 60 % 60) + ' хв.'
      }, 1000)
    },
    stopTimer() {
      clearTimeout(this.timer)
    },
    openDrawer(){
      this.drawerSearch=true
      this.search=''
    },
    setActiveFilter() {
      this.activeFilter = 3
    },
  }
}
</script>

<style>
thead {
  background-color: #38464c !important;
  border: none !important;
  margin: 20px !important;
  color: #b3c0c7;
}
.w-table__header {
  padding: 16px;
}
.w-tag {
  line-height: 14px !important;
}
.dialog-test .w-card__title {
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
}

.dialog-test__result .w-card__content {
  padding: 0 !important;
  padding-right: 5px !important;
}

.dialog-test__result-info .w-card__content {
  border: 2px solid #505050;
  border-radius: 8px;
  box-shadow: 0 0 1px #0000001a, 2px 2px 8px #00000026;
}

p {
  text-align: justify;
  line-height: 1.6;
  margin-bottom: 10px;
  text-indent: 1.5em;
  margin-top: 0;

}

.div-question p {
  margin-bottom: 0;
  text-indent: 0.2em;
  line-height: 14px !important;
}

.span-answer__value p {
  margin-bottom: 0;
  text-indent: 0.2em;
}

.news-description {
  max-width: 50vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.active-class {
  background-color: #4d4d4d !important;
}

.news-card {
  -webkit-transition: .2s ease-in-out;
  transition: .2s ease-in-out;
  cursor: pointer;
}

.news-card:hover {
  background-color: #525252;
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
