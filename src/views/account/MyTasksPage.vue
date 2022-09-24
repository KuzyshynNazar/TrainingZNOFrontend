<template>
  <w-flex justify-space-between style="width: 100%; padding-left: 290px" column fill-height  class="pr3 pt3 pb3 pl10">

  <!--  <w-flex justify-center style="width: 100%; padding-left: 250px" fill-height>-->
<!--    <w-grid-->
<!--        style="width: 95%"-->
<!--        :columns="{ xs: 2, sm: 3, md: 4, lg: 6, xl: 6 }"-->
<!--        gap="3"-->
<!--        class="pa3"-->
<!--        v-if="filteredTaskList!==undefined && filteredTaskList.length!==0"-->
<!--    >-->
<!--      <div v-for="(task, index) in filteredTaskList" :key="index" class="sh1">-->
<!--        <TaskCardComponent-->
<!--            :task="task"-->
<!--            :drawer-prop="showDrawer"-->
<!--        />-->
<!--      </div>-->
<!--    </w-grid>-->
    <w-card style="max-width: calc(100vw - 275px); max-height: calc(100vh - 106px);  overflow-y: auto"
            bg-color="blue-grey-dark1" content-class="pa0" no-border>
      <w-table
          :headers="tableStudentBookHeader"
          :items="filteredTaskList"
          fixed-headers
          style="width: 100%;"
      >
        <template #item="{ item, classes,index  }">
          <tr :class="classes">
            <td class="pl1 pa1 blue-grey-light5">
              <w-image :src="require('../../assets/task.png')" tag="img" style="max-width: 50px"></w-image>
            </td>
            <td class="pl1 pa4 blue-grey-light5">{{ index }}</td>
            <td class="pa1 blue-grey-light5">
              <div class="book-title">
                {{ item.title }}
              </div>
            </td>
            <td class="pa1 blue-grey-light5">
              <div class="book-author">
                {{ item.author }}
              </div>
            </td>
            <td class="pa1 blue-grey-light5 ">
              <div class="book-description">
                {{ item.description }}
              </div>
            </td>
            <td class="pa1 blue-grey-light5">
              <w-flex no-grow justify-start align-center>
                <w-tooltip left bg-color="blue-grey-dark3" color="blue-grey-light4">
                  <template #activator="{ on }">
                    <w-button
                        v-on="on"
                        tile
                        text
                        icon="mdi mdi-book-open-page-variant"
                        color="blue-grey-light5"
                        :route="urlStorage + item.document.path"
                        target="_blank"
                        lg
                    >
                    </w-button>
                  </template>
                  <div class="title3 text-italic">Читати книгу</div>

                </w-tooltip>
                <w-tooltip left bg-color="blue-grey-dark3" color="blue-grey-light4">
                  <template #activator="{ on }">
                    <w-button
                        v-on="on"
                        tile
                        text
                        icon="mdi mdi-bookmark-remove"
                        color="blue-grey-light5"
                        @click="destroySaveTasks(item)"
                        lg
                    >

                    </w-button>
                  </template>
                  <div class="title3 text-italic">
                    {{ 'Видалити з ос. кабінету' }}
                  </div>

                </w-tooltip>
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
              </w-flex>
            </td>
          </tr>
        </template>
        <template #no-data>
          <div v-if="saveTasks.length!==0">
            <div class="title2">
              Нічого не знайдено!
            </div>
            <div>
              <w-button   @click="search=''" class="pa4 mt2"  lg bg-color="blue-grey-dark3" color="blue-grey-light3"
                          icon="mdi mdi-reload"
              ></w-button>

            </div>
          </div>
          <div v-else class="title2 blue-grey-light5">
            У вас не має збережених книг!
          </div>


        </template>
      </w-table>
    </w-card>
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
                bg-color="blue-grey-light4" icon="wi-cross" lg tile @click="drawer=false"></w-button>
      <w-flex column style="padding: 24px">
        <div class="title2 text-center mb4">{{ book.author }} - {{ book.title }}</div>
        <div class="title3 text-italic book-description1"> {{ book.description }}</div>
      </w-flex>
      <w-image :src="require('./../../assets/photo5.png')" tag="img"
               style="max-width: 10vw; position: absolute; bottom:0; left:calc(50% - 5vw)"></w-image>
    </w-drawer>
  </w-flex>
  <w-button absolute top left bg-color="blue-grey-dark3" color="blue-grey-light3" class="mt3" style="top:40px; left: 250px"
            icon="mdi mdi-magnify" xl tile @click="openDrawer"></w-button>
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
// import TaskCardComponent from "@/components/student/account/TaskCardComponent";
const URL_STORAGE = process.env.VUE_APP_URL_STORAGE
const BASE_URL = process.env.VUE_APP_API_URL
export default {
  name: 'MyTasksPage',
  // components: {TaskCardComponent},

  data() {
    return {
      urlStorage: URL_STORAGE,
      baseUrlApi: BASE_URL,
      search: '',
      drawerSearch: false,
      openDrawer1: true,
      showDrawer: false,
      showProgress: false,
      drawer: false,
      book: null,
      tableStudentBookHeader: [
        {label: '', width: '1vw', },
        {label: '№', key: 'id', width: '5vw'},
        {label: 'Назва', key: 'title', width: '15vw'},
        {label: 'Автор', key: 'author', width: '15%'},
        {label: 'Опис', key: 'description', width: '40vw'},
        {label: 'Дія', width: '10vw'},

      ],
    }
  },
  created() {
    this.showProgress=true
    this.savedTasks().then(()=>{
      this.showProgress=false
    })
  },
  computed: {
    ...mapGetters({
      saveTasks: 'saveTasks/saveTasks',
    }),
    filteredTaskList() {
      return this.saveTasks.filter(task => {
        return task.title.toLowerCase().includes(this.search.toLowerCase())
      })
    },
  },
  methods: {
    ...mapActions({
      savedTasks: 'saveTasks/savedTasks',
      saveTask: 'saveTasks/saveTask',
      deleteSavedTask: 'saveTasks/deleteSavedTask',
    }),
    openDrawer(){
      this.drawerSearch=true
      this.search=''
    },
    openDrawerInfo(book) {
      this.book = book
      this.drawer = true
    },
    storeSaveTasks(task){
      let data={taskId:task.id}
      this.saveTask(data).then(()=>{
        task.isSaveDocument=true
        this.notify('Збережено в особистому кабінеті.')
      })
    },
    destroySaveTasks(task){
      this.deleteSavedTask(task.id).then(()=>{
        task.isSaveDocument=false
        this.notify('Книгу видалено з особистого кабінену','red')
      })
    },
    notify(message, color='green') {
      this.$waveui.notify({
        message: message,
        timeout: 2000,
        success: true,
        color: color,
      })
    },
  }
}
</script>

<style>
.book-description {
  max-width: 40vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-author {
  max-width: 15vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-title {
  max-width: 15vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

thead {
  background-color: #38464c !important;
  border: none !important;
  margin: 20px !important;
  color: #b3c0c7;
}

.w-table__header {
  padding-top: 16px;
  padding-bottom: 16px;
}

.active-class {
  background-color: #5f7681;
}

.book-card {
  -webkit-transition: .2s ease-in-out;
  transition: .2s ease-in-out;
}

.book-card:hover {
  background-color: #5f7681;
  color: black;
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
