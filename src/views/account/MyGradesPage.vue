<template>
  <w-flex justify-space-between style="width: 100%; padding-left: 290px" column fill-height  class="pr3 pt3 pb3 pl10">
    <w-card style="max-width: calc(100vw - 275px); max-height: calc(100vh - 106px);  overflow-y: auto" bg-color="blue-grey-dark2" content-class="pa0" no-border>
      <w-table
          :headers="tableStudentTestsInfoHeader"
          :items="filteredTestList"
          fixed-headers
          style="width: 100%;"
      >
        <template #item="{ item, classes,index  }">
          <tr :class="classes">
            <td class="pl2 pa4 blue-grey-light3">{{ index }}</td>
            <td  class="pa4 blue-grey-light3">{{ item.testName }}</td>
            <td  class="pa4 blue-grey-light3">{{ item.estimate }}</td>
<!--            <td  class="pa4 blue-grey-light3">{{ item.point }}</td>-->
<!--            <td  class="pa4 blue-grey-light3">{{ item.scoredPoints }}</td>-->
<!--            <td  class="pa4 blue-grey-light3">-->
<!--              {{-->
<!--                Math.floor(item.time / 60 % 60) > 9 ? Math.floor(item.time / 60 % 60) + ' хв.' : '0' + Math.floor(item.time / 60 % 60) + ' хв.'-->
<!--              }}-->
<!--              {{-->
<!--                Math.floor(item.time % 60) > 9 ? Math.floor(item.time % 60) + ' с.' : '0' + Math.floor(item.time % 60) + ' с.'-->
<!--              }}-->
<!--            </td>-->
<!--            <td  class="pa2 blue-grey-light3">{{ item.amountQuestions }}</td>-->
<!--            <td  class="pa2 blue-grey-light3">{{ item.amountTrueQuestions }}</td>-->
<!--            <td  class="pa2 blue-grey-light3">{{ item.amountFalseQuestions }}</td>-->
            <td  class="pa2 blue-grey-light3">
              <w-tooltip left bg-color="blue-grey-dark3" color="blue-grey-light4">
              <template #activator="{ on }">
                <w-button
                    v-on="on"
                    tile
                    text
                    icon="mdi mdi-eye-outline"
                    color="blue-grey-light5"
                    @click="openDrawerInfo(item)"
                    lg
                >

                </w-button>
              </template>
              <div class="title3 text-italic">
                Дізнатись більше
              </div>

            </w-tooltip>
            </td>
          </tr>

        </template>
        <template #no-data>
          <div class="title2">
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
    <w-button absolute top left bg-color="blue-grey-dark3" color="blue-grey-light3" class="mt3" style="top:40px; left: 250px"
              icon="mdi mdi-magnify" xl tile @click="openDrawer"></w-button>
    <w-button absolute top left bg-color="blue-grey-dark3" color="blue-grey-light3" class="mt3" style="top:80px; left: 250px"
              icon="mdi mdi-chart-line" xl tile @click="openDialog"></w-button>
  </w-flex>
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
  <w-drawer
      bottom
      v-model="showDialog"
      absolute
      bg-color="blue-grey-dark3" color="blue-grey-light4"
      height="50%"
      z-index="100"
  >
    <w-button absolute top right color="blue-grey-dark3" text
              bg-color="blue-grey-light4" icon="wi-cross" lg tile @click="showDialog=false"></w-button>
    <w-flex fill-height align-center justify-center class="pa4" style="width: 95vw">
      <LineChart :chart-data="chartData" ref="line" :chart-options="chartOptionsLine" :width="1700" style="min-width: 95vw;"
                 />
    </w-flex>

  </w-drawer>
  <w-drawer
      top
      v-model="drawerSearch"
      absolute
      style="top: 40px;width: calc(100vw - 250px); margin-left: 250px; z-index: 10"
      height="50px"
      color="blue-grey-dark3" bg-color="blue-grey-light3"
  >
    <w-flex class="mx10">
      <w-input
          style="width: 100%"
          color="blue-grey-dark3"
          v-model="search"
          placeholder="Пошук"
          inner-icon-left="wi-search"
      >
      </w-input>
    </w-flex>


  </w-drawer>
  <w-drawer
      right
      v-model="drawer"
      absolute
      bg-color="blue-grey-dark3" color="blue-grey-light4"
      height="50%"
      z-index="100"
  >
    <w-button absolute top right color="blue-grey-dark3" text
              bg-color="blue-grey-light4" icon="wi-cross" sm tile @click="drawer=false"></w-button>
    <div class="d-flex" style="flex-direction:column; padding: 24px; width: 100%" >
      <div class="test-info d-flex justify-space-between align-center mt3 pa2">
        <div class="title4 text-center">Назва тесту</div>
        <div class="title4 text-italic"> {{ test.test.name }}</div>
      </div>
      <w-divider color="blue-grey-light4"></w-divider>
      <div class="test-info d-flex justify-space-between align-center pa2">
        <div class="title4 text-center">Опис тесту</div>
        <div class="title4 text-italic"> {{ test.test.description }}</div>
      </div>
      <w-divider color="blue-grey-light4"></w-divider>
      <div class="test-info d-flex justify-space-between align-center pa2">
        <div class="title4 text-center">Оцінка</div>
        <div class="title4 text-italic"> {{ test.estimate }}</div>
      </div>
      <w-divider color="blue-grey-light4"></w-divider>
      <div class="test-info d-flex justify-space-between align-center pa2">
        <div class="title4 text-center">К-сть питань </div>
        <div class="title4 text-italic"> {{ test.amountQuestions }}</div>
      </div>
      <w-divider color="blue-grey-light4"></w-divider>
      <div class="test-info d-flex justify-space-between align-center pa2">
        <div class="title4 text-center">К-сть правильних відповідей </div>
        <div class="title4 text-italic"> {{ test.amountTrueQuestions }}</div>
      </div>
      <w-divider color="blue-grey-light4"></w-divider>
      <div class="test-info d-flex justify-space-between align-center pa2">
        <div class="title4 text-center">К-сть не правильних відповідей </div>
        <div class="title4 text-italic"> {{ test.amountFalseQuestions }}</div>
      </div>
      <w-divider color="blue-grey-light4"></w-divider>
      <div class="test-info d-flex justify-space-between align-center pa2">
        <div class="title4 text-center">Всього балів</div>
        <div class="title4 text-italic"> {{ test.point }}</div>
      </div>
      <w-divider color="blue-grey-light4"></w-divider>
      <div class="test-info d-flex justify-space-between align-center pa2">
        <div class="title4 text-center">Набрані бали</div>
        <div class="title4 text-italic"> {{ test.scoredPoints }}</div>
      </div>
      <w-divider color="blue-grey-light4"></w-divider>
      <div class="test-info d-flex justify-space-between align-center pa2">
        <div class="title4 text-center">Час проходження тесту</div>
        <div class="title4 text-italic"> {{
                     Math.floor(test.time / 60 % 60) > 9 ? Math.floor(test.time / 60 % 60) + ' хв.' : '0' + Math.floor(test.time / 60 % 60) + ' хв.'
                          }}
                        {{
                          Math.floor(test.time % 60) > 9 ? Math.floor(test.time % 60) + ' с.' : '0' + Math.floor(test.time % 60) + ' с.'
                        }}
        </div>
      </div>
      <w-divider color="blue-grey-light4"></w-divider>
    </div>
    <w-image :src="require('./../../assets/photo5.png')" tag="img"
             style="max-width: 10vw; position: absolute; bottom:0; left:calc(50% - 5vw)"></w-image>
  </w-drawer>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import LineChart from '../../components/LineChart'

export default {
  name: 'HelloWorld',
  components: { LineChart },
  data() {
    return {
      showDialog:false,
      search: '',
      drawerSearch: false,
      openDrawer1:true,
      showProgress: false,
      tableStudentTestsInfoHeader: [
        {label: '№', key: 'id', width: '5%'},
        {label: 'Назва', key: 'testName', width: '65%'},
        {label: 'Оцінка', key: 'estimate', width: '20%'},
        {label: 'Дія', width: '10%'},
        // {label: 'Бали за тест', key: 'point', width: '10%'},
        // {label: 'Набрані бали', key: 'scoredPoints', width: '10%'},
        // {label: 'Час проходження', key: 'time', width: '10%'},
        // {label: 'К-сть питань', key: 'amountQuestions', width: '10%'},
        // {label: 'Правельні в-ді', key: 'amountTrueQuestions', width: '10%'},
        // {label: 'Не правильні в-ді', key: 'amountFalseQuestions', width: '10%'},
      ],
      test: null,
      drawer: false,
    }
  },
  created() {
    this.showProgress = true
    this.getTestStudentCheckedByStudentId({studentId:this.student.id}).then(()=>{
      this.showProgress = false
    })
  },
  computed: {
    ...mapGetters({
      student:'auth/user',
      testsCheckedStudent: 'studentTests/testsCheckedStudent',
    }),
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
        responsive: true,
        plugins: {
          legend: {
            display: false,
            align: 'start',
            position: 'top',
            labels: {
              color: 'rgb(229, 229, 229,1)',
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
              color: 'rgb(229, 229, 229,1)',
            },
            grid:{
              borderColor:'rgb(229, 229, 229,1)',
              color:'rgb(229, 229, 229,1)',
            }
          },
          y: {
            ticks: {
              display: true,
              color: 'rgb(229, 229, 229,1)',
            },
            grid:{
              borderColor:'rgb(229, 229, 229,1)',
              color:'rgb(229, 229, 229,1)',
            }
          },
        },

      }
    },
    filteredTestList() {
      return this.testsCheckedStudent.filter(test => {
        return test.testName.toLowerCase().includes(this.search.toLowerCase())
      })

    },
  },
  methods: {
    ...mapActions({
      getTestStudentCheckedByStudentId: 'studentTests/getTestStudentCheckedByStudentId',
    }),
    openDrawer(){
      this.drawerSearch=true
      this.search=''
    },
    openDialog(){
      this.showDialog=true
      this.search=''
    },
    openDrawerInfo(test) {
      this.test = test
      this.drawer = true
    },
  }
}
</script>

<style>
thead{
  background-color: #38464c !important;
  border: none !important;
  margin: 20px !important;
  color: #b3c0c7;
}
.w-table__header{
  padding: 16px;
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
.test-info:hover{
  background-color: #5f7681;
}
</style>
