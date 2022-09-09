<template>
  <div>
    <w-toolbar vertical fixed left style="height: calc(100vh - 40px); top:40px"
               bg-color="grey-dark5"
               color="white">
      <w-tooltip right>
        <template #activator="{ on }">
          <w-icon v-on="on" md @click="openCreateTaskTemplateDialog">mdi mdi-book-plus</w-icon>
        </template>
        Створити книгу
      </w-tooltip>
    </w-toolbar>
    <w-flex column fill-height style="margin-left: 36px;" class="pa1">
      <w-card no-border style="height: calc(100vh - 50px)">
        <w-input
            color="grey-dark5"
            v-model="keywordTaskTemplate"
            placeholder="Пошук"
            inner-icon-left="wi-search"
            class="mb3">
        </w-input>
        <w-table
            :headers="tableHeaderTaskTemplates"
            :items="taskTemplates"
            fixed-headers
            :filter="keywordFilterTaskTemplates(keywordTaskTemplate)"
            style="width: 100%"
        >
          <template #item="{ item, classes, index  }">
            <tr :class="classes">
              <td>
                <div class="ml3">{{ index }}</div>
              </td>
              <td>{{ item.title }}</td>
              <td>{{ item.author }}</td>
              <td>
                <w-icon>{{ item.status ? 'mdi mdi-plus' : 'mdi mdi-minus' }}</w-icon>
              </td>
              <td style="text-align: right">
                <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer;"
                        @click="openShowTaskTemplateDialog(item)">
                  mdi mdi-eye
                </w-icon>
                <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer"
                        @click="openEditTaskTemplateDialog(item)">
                  mdi mdi-pencil
                </w-icon>
                <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer"
                        @click="openDeleteTaskTemplateDialog(item)">
                  mdi mdi-delete
                </w-icon>
              </td>
            </tr>
          </template>
        </w-table>
      </w-card>
    </w-flex>
    <!--    Book Modal Start     -->
    <w-dialog title="Створити книгу"
              width="90vw"
              title-class="grey-dark5--bg white"
              v-model="showCreateTaskTemplateDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showCreateTaskTemplateDialog=false"></w-button>
      <w-flex fill-height>
        <w-card title="Форма створення книги" style="width: 100%">
          <div class="mb4">
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTaskTemplate.title"
                     label="Заголовок книги"></w-input>
            <span v-if="errors && errors.title" style="font-size: 10px; color: red">{{ errors.title[0] }}</span>
          </div>
          <div class="mb4">
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTaskTemplate.author"
                     label="Автор книги"></w-input>
            <span v-if="errors && errors.author" style="font-size: 10px; color: red">{{
                errors.author[0]
              }}</span>
          </div>
          <div class="mb4">
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTaskTemplate.description"
                     label="Опис книги"></w-input>
            <span v-if="errors && errors.description" style="font-size: 10px; color: red">{{
                errors.description[0]
              }}</span>
          </div>
          <div class="mb4">
            <w-input
                v-model="inputsTaskTemplateDocuments.documents"
                color="grey-dark5" label-color="grey-dark5"
                type="file"
                label="Завантажити документ"
                accept=".pdf,.djvu"
                multiple>
            </w-input>
          </div>
          <div class="mb4">
            <w-checkbox color="grey-dark5" label-color="grey-dark5" v-model="inputsTaskTemplate.status" label="Статус">
              {{ inputsTaskTemplate.status ? 'Відображати' : 'Не відображати' }}
            </w-checkbox>
          </div>
          <w-flex>
            <w-button bg-color="grey-dark5"
                      color="white" @click="create" class="mt3 grow">Створити книгу
            </w-button>
          </w-flex>
        </w-card>
      </w-flex>
    </w-dialog>
    <w-dialog title="Показати книгу"
              title-class="grey-dark5--bg white"
              width="95vw"
              v-model="showShowTaskTemplateDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showShowTaskTemplateDialog=false"></w-button>
      <w-flex style="height: 85vh; overflow-y: auto">

        <w-flex column class="pl2">
          <w-card title="Назва книги" class="mb3">
            {{ taskTemplate.title }}
          </w-card>
          <w-card title="Автор книги" class="mb3">
            {{ taskTemplate.author }}
          </w-card>

          <w-card title="Опис книги" class="mb3">
            {{ taskTemplate.description }}
          </w-card>
          <w-card title="Документ книги" class="mb3" no-border content-class="pa0" title-class="bd1" v-if="taskTemplate.document!==null">
            <table
                style="width: 100%"
            >
                <tr class="tr bd1">
                  <td>
                    <div class="ml3">{{ 1 }}</div>
                  </td>
                  <td>{{ taskTemplate.document.name }}</td>
                  <td class="text-center">
                    <a
                        class="black"
                        :href="urlStorage + taskTemplate.document.path"
                        target="_blank">
                      <w-icon xl>
                        mdi mdi-eye-outline
                      </w-icon>
                    </a>
                  </td>
                </tr>
            </table>
          </w-card>
        </w-flex>
      </w-flex>
    </w-dialog>
    <w-dialog title="Видалити книгу"
              width="600px"
              title-class="grey-dark5--bg white"
              v-model="showDeleteTaskTemplateDialog"
    >
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showDeleteTaskTemplateDialog=false">
      </w-button>
      Ви хочеревидалити студента <strong>{{ inputsTaskTemplate.title }}</strong>?

      <w-flex align-center justify-center>
        <w-button bg-color="grey-dark5"
                  color="white"
                  width="50px"
                  @click="destroy" class="mt3 mr5">Так
        </w-button>
        <w-button bg-color="grey-dark5" width="50px"
                  color="white" @click="showDeleteTaskTemplateDialog=false" class="mt3">Ні
        </w-button>
      </w-flex>
    </w-dialog>
    <w-dialog title="Редагувати книгу"
              width="80vw"
              title-class="grey-dark5--bg white"
              v-model="showEditTaskTemplateDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showEditTaskTemplateDialog=false"></w-button>
      <w-flex fill-height style="height: 80vh; overflow-y: auto">
        <w-card class="mr3" no-border title="Форма редагування книги" style="width: 100%;">
          <div class="mb4">
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTaskTemplate.title"
                     label="Назва книги"></w-input>
            <span v-if="errors && errors.title" style="font-size: 10px; color: red">{{ errors.title[0] }}</span>
          </div>
          <div class="mb4">
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTaskTemplate.author"
                     label="Автор книги"></w-input>
            <span v-if="errors && errors.author" style="font-size: 10px; color: red">{{ errors.author[0] }}</span>
          </div>
          <div class="mb4" >
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsTaskTemplate.description"
                     label="Опис книги"></w-input>
            <span v-if="errors && errors.description" style="font-size: 10px; color: red">{{
                errors.description[0]
              }}</span>
          </div>
          <div class="mb4" v-if="inputsTaskTemplate.document===null">
            <w-input
                v-model="inputsTaskTemplateDocuments.documents"
                color="grey-dark5" label-color="grey-dark5"
                type="file"
                label="Завантажити документ"
                accept=".pdf,.djvu"
                multiple>
            </w-input>
          </div>
          <w-flex class="mb4" v-else>
            <table
                style="width: 100%"
            >
                <tr class="tr">
                  <td>
                    <div class="ml3">{{ 1 }}</div>
                  </td>
                  <td>{{ inputsTaskTemplate.document.name }}</td>
                  <td class="text-center">
                    <a
                        class="black"
                        :href="urlStorage + inputsTaskTemplate.document.path"
                        target="_blank">
                      <w-icon xl>
                        mdi mdi-eye-outline
                      </w-icon>
                    </a>
                  </td>
                  <td class="text-center">
                    <w-button class="grow" text tile outline color="white" bg-color="grey-dark5"
                              @click="destroyTaskTemplateDocument(inputsTaskTemplate.document.id)">
                      <w-icon color="white">
                        mdi mdi-trash-can-outline
                      </w-icon>
                    </w-button>
                  </td>
                </tr>
            </table>
          </w-flex>
          <div class="mb4">
            <w-checkbox color="grey-dark5" label-color="grey-dark5" v-model="inputsTaskTemplate.status" label="Статус">
              {{ inputsTaskTemplate.status ? 'Відображати' : 'Не відображати' }}
            </w-checkbox>
          </div>
          <w-flex>
            <w-button bg-color="grey-dark5"
                      color="white" @click="edit" class="mt3 grow">Редагувати книгу
            </w-button>
          </w-flex>
        </w-card>
      </w-flex>
    </w-dialog>
    <!--    Book Modal End     -->
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
import ClassicEditor from "ckeditor5-mathtype/build/ckeditor"

const URL_STORAGE = process.env.VUE_APP_URL_STORAGE
const BASE_URL = process.env.VUE_APP_API_URL
export default {
  name: 'TaskTemplatesPage',
  data() {
    return {
      urlStorage: URL_STORAGE,
      baseUrlApi: BASE_URL,
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {},
      showProgress: false,
      /**
       * Test
       */
      showCreateTaskTemplateDialog: false,
      showEditTaskTemplateDialog: false,
      showShowTaskTemplateDialog: false,
      showDeleteTaskTemplateDialog: false,
      tableHeaderTaskTemplates: [
        {label: 'id', key: 'id', width: 50},
        {label: 'Назва', key: 'title'},
        {label: 'Автор', key: 'author'},
        {label: 'Статус', key: 'status'},
      ],
      tableHeaderTaskTemplateDocument: [
        {label: 'id', key: 'id', width: 50},
        {label: 'Назва', key: 'name', width: '80%'},
        {label: 'Дія'},
      ],
      keywordTaskTemplate: '',
      keywordFilterTaskTemplates: keywordTaskTemplate => item => {
        const allTheColumns = `${item.id} ${item.title} ${item.author} ${item.description}`
        return new RegExp(keywordTaskTemplate, 'i').test(allTheColumns)
      },
      inputsTaskTemplate: {
        title: null,
        description: null,
        author: null,
        status: null,
      },
      inputsTaskTemplateDocuments: {
        taskTemplateId: null,
        documents: null
      },
    }
  },
  created() {
    this.showProgress = true
    this.getAll().then(() => {
      this.showProgress = false
    })
  },
  computed: {
    ...mapGetters({
      taskTemplates: 'taskTemplates/taskTemplates',
      taskTemplate: 'taskTemplates/taskTemplate',
      errors: 'taskTemplates/errors',
      taskTemplateDocuments: 'taskTemplateDocuments/taskTemplateDocuments',
    }),
  },
  methods: {
    ...mapActions({
      getAll: 'taskTemplates/getAll',
      store: 'taskTemplates/store',
      show: 'taskTemplates/show',
      update: 'taskTemplates/update',
      delete: 'taskTemplates/delete',
      storeTaskTemplateDocuments: 'taskTemplateDocuments/store',
      deleteTaskTemplateDocument: 'taskTemplateDocuments/delete',

    }),
    /**
     * TestSample
     */
    openCreateTaskTemplateDialog() {
      this.inputsTaskTemplate = Object.assign({}, {})
      this.showCreateTaskTemplateDialog = true
    },
    openShowTaskTemplateDialog(item) {
      this.showProgress = true
      this.show(item.id).then(() => {
        console.log(this.taskTemplate)
        this.showProgress = false
        this.showShowTaskTemplateDialog = true
      })

    },
    openEditTaskTemplateDialog(item) {
      this.inputsTaskTemplate = Object.assign({}, item)
      this.showEditTaskTemplateDialog = true
    },
    openDeleteTaskTemplateDialog(item) {
      this.inputsTaskTemplate = Object.assign({}, item)
      this.showDeleteTaskTemplateDialog = true
    },
    create() {
      this.inputsTaskTemplate.status ? this.inputsTaskTemplate.status = 1 : this.inputsTaskTemplate.status = 0
      this.store(this.inputsTaskTemplate).then(() => {
        if (this.inputsTaskTemplateDocuments.documents !== null) {
          this.inputsTaskTemplateDocuments.taskTemplateId = this.taskTemplate.id
          this.storeTaskTemplateDocuments(this.inputsTaskTemplateDocuments).then(() => {
            this.taskTemplate.document = this.taskTemplateDocuments
            this.inputsTaskTemplateDocuments.taskTemplateId = null
            this.inputsTaskTemplateDocuments.documents = null

          })
        }
        this.notify('Книгу створено.')
        this.showCreateTaskTemplateDialog = false
      })
    },
    edit() {
      this.inputsTaskTemplate.status ? this.inputsTaskTemplate.status = 1 : this.inputsTaskTemplate.status = 0
      this.update(this.inputsTaskTemplate).then(() => {
        if (this.inputsTaskTemplateDocuments.documents !== null) {
          this.inputsTaskTemplateDocuments.taskTemplateId = this.inputsTaskTemplate.id
          this.storeTaskTemplateDocuments(this.inputsTaskTemplateDocuments).then(() => {
            let index = this.taskTemplates.findIndex((c) => c.id === this.taskTemplateDocuments.taskTemplateId);
            console.log(index)
            if (index > -1) {
              this.taskTemplates[index].document= this.taskTemplateDocuments
              this.inputsTaskTemplate.document=this.taskTemplateDocuments
            }
            this.inputsTaskTemplateDocuments.taskTemplateId = null
            this.inputsTaskTemplateDocuments.documents = null
          })
        }
        this.showEditTaskTemplateDialog = false
        this.notify('Дані книги оновлено.')
      })
    },
    destroy() {
      this.delete(this.inputsTaskTemplate.id).then(() => {
        this.notify('Книгу видалено.')
        this.showDeleteTaskTemplateDialog = false
      })
    },
    destroyTaskTemplateDocument(id) {
      this.deleteTaskTemplateDocument(id).then(() => {
        let index = this.taskTemplates.findIndex((c) => c.id === this.taskTemplateDocuments.taskTemplateId);
        if (index > -1) {
          this.taskTemplates[index].document= null
          this.inputsTaskTemplate.document=null
        }
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
.tr{
  border:1px solid #b0b0b0
}
.tr:hover{
  background-color: #b0b0b0;
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
