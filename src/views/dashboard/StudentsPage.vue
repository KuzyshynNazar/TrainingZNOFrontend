<template>

  <div>
    <w-toolbar vertical fixed left style="height: calc(100vh - 40px); top:40px"
               bg-color="grey-dark5"
               color="white">
      <w-tooltip right>
        <template #activator="{ on }">
          <w-icon v-on="on" md @click="openCreateDialog">mdi mdi-account-multiple-plus</w-icon>
        </template>
        Створити студента
      </w-tooltip>

    </w-toolbar>
    <w-flex column style="margin-left: 40px;" class="pa3">
      <w-input
          v-model="keyword"
          placeholder="Пошук"
          inner-icon-left="wi-search"
          class="mb3">
      </w-input>
      <w-table
          :headers="tableHeader"
          :items="students"
          fixed-headers
          :filter="keywordFilter(keyword)"
          style="width: 100%"
      >
        <template #item="{ item, classes  }">
          <tr :class="classes ">
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.nick_name }}</td>
            <td style="text-align: right">

              <w-tooltip left>
                <template #activator="{ on }">
                  <w-button v-on="on" bg-color="grey-dark5"
                            color="white"
                            icon="mdi mdi-account-search"
                            tile
                            width="30px"
                            text
                            class="mr1 pa0"
                            @click="openShowDialog(item)">
                  </w-button>
                </template>
                Показати інформацію про студента
              </w-tooltip>
              <w-tooltip left>
                <template #activator="{ on }">
                  <w-button v-on="on" bg-color="grey-dark5"
                            color="white"
                            icon="mdi mdi-account-edit"
                            class="mr1 pa0"
                            tile
                            width="30px"
                            text
                            @click="openEditDialog(item)">
                  </w-button>
                </template>
                Редагувати інформацію студента
              </w-tooltip>
              <w-tooltip left>
                <template #activator="{ on }">
                  <w-button v-on="on" bg-color="grey-dark5"
                            color="white"
                            icon="mdi mdi-account-minus"
                            class="pa0"
                            tile
                            width="30px"
                            text

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
    <w-dialog width="600px"
        v-model="showCreateDialog"
        title="Створити студента">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showCreateDialog=false"></w-button>
      <div class="mb4">
        <w-input v-model="inputsStudent.name" label="Name"></w-input>
        <span v-if="errors && errors.name"  style="font-size: 10px; color: red">{{ errors.name[0] }}</span>
      </div>
      <div class="mb4">
        <w-input v-model="inputsStudent.nick_name" label="Nick name"></w-input>
        <span v-if="errors && errors.nick_name"  style="font-size: 10px; color: red">{{ errors.nick_name[0] }}</span>
      </div>

      <div class="mb4">
        <w-input v-model="inputsStudent.password" type="password" label="Пароль"></w-input>
        <span v-if="errors && errors.password"  style="font-size: 10px; color: red">{{ errors.password[0] }}</span>
      </div>

      <div class="mb4">
        <w-input v-model="inputsStudent.password_confirmation" type="password" label="Повторіть пароль"></w-input>
      </div>
     <w-flex>
       <w-button @click="storeStudent" class="mt3 grow">Створити студента</w-button>
     </w-flex>
    </w-dialog>
    <w-dialog width="600px"
        v-model="showEditDialog"
        title="Редагувати дані студента">

      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showEditDialog=false"></w-button>
      <w-flex>
        <w-tabs style="width: 100%"  :items="tabs">
          <template v-slot:[`item-content.1`]>
            <div class="mb4">
              <w-input v-model="inputsStudentData.name" label="Name"></w-input>
              <span v-if="errors && errors.name" style="font-size: 10px; color: red">{{ errors.name[0] }}</span>
            </div>
            <div class="mb4">
              <w-input v-model="inputsStudentData.nick_name" label="Nick name"></w-input>
              <span v-if="errors && errors.nick_name" style="font-size: 10px; color: red">{{ errors.nick_name[0] }}</span>
            </div>

            <w-flex>
              <w-button @click="updateStudentData" class="mt3 grow" >Оновити дані</w-button>
            </w-flex>
          </template>
          <template v-slot:[`item-content.2`]>
            <div class="mb4">
              <w-input v-model="inputsStudentPassword.password" label="Password" type="password"></w-input>
              <span v-if="errors && errors.password" style="font-size: 10px; color: red">{{ errors.password[0] }}</span>
            </div>
            <div class="mb4">
              <w-input v-model="inputsStudentPassword.password_confirmation" label="Password Confirmation" type="password"></w-input>
              <span v-if="errors && errors.password_confirmation" style="font-size: 10px; color: red">{{ errors.password_confirmation[0] }}</span>
            </div>

            <w-flex>
              <w-button @click="updateStudentPassword" class="mt3 grow" >Змінити пароль</w-button>
            </w-flex>
          </template>
        </w-tabs>
      </w-flex>

    </w-dialog>
    <w-dialog width="600px"
        v-model="showShowDialog"
        title="Показати дані студента">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showShowDialog=false"></w-button>
      {{ tableItem }}
    </w-dialog>
    <w-dialog width="400px"
        v-model="showDeleteDialog"
        title="Видалити студента">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showDeleteDialog=false">
      </w-button>
      Ви хочеревидалити студента <strong>{{inputsStudent.name}}</strong>?

      <w-flex>
        <w-button @click="deleteStudent" class="mt3 mr5 grow" >Так</w-button>
        <w-button @click="showDeleteDialog=false" class="mt3 grow" >Ні</w-button>
      </w-flex>
    </w-dialog>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'HelloWorld',
  data() {
    return {
      openDrawer1: true,
      openDrawer: true,
      showCreateDialog: false,
      showDeleteDialog: false,
      showEditDialog: false,
      showShowDialog: false,
      tableHeader: [
        {label: 'id', key: 'id'},
        {label: 'Name', key: 'name'},
        {label: 'Nick name', key: 'nick_name'},
      ],
      tableItem: null,
      keyword: '',
      keywordFilter: keyword => item => {
        const allTheColumns = `${item.id} ${item.name} ${item.nick_name}`
        return new RegExp(keyword, 'i').test(allTheColumns)
      },
      inputsStudentData: {
        name: null,
        nick_name: null,
      },
      inputsStudentPassword: {
        password: null,
        password_confirmation: null,
      },
      inputsStudent: {
        name: null,
        nick_name: null,
        password: null,
        password_confirmation: null,
      },
      tabs: [
        {title: 'Змінити дані студента'},
        {title: 'Змінити пароль студента'},
      ],
    }
  },
  created() {
    this.getAll()
  },
  computed: {
    ...mapGetters({
      students: 'students/students',
      errors: 'students/errors',
    }),
  },
  methods: {
    ...mapActions({
      getAll: 'students/getAll',
      store: 'students/store',
      update: 'students/update',
      delete: 'students/delete',
    }),
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
      this.inputsStudentData.nick_name = item.nick_name
      this.inputsStudentPassword.id = item.id
      this.inputsStudentPassword.password = item.password
      this.showEditDialog = true
    },
    openShowDialog(item) {
      this.tableItem = item
      this.showShowDialog = true
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
  }
}
</script>

<style>
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
