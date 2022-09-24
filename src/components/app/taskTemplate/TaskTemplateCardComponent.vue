<template>
  <w-flex fill-height >
    <w-flex align-center justify-space-between class="news-card blue-grey-dark3--bg bdrs3">
      <div class="d-flex align-center justify-center pa2" style="width: 100px">
        <w-image :src="require('../../../assets/task-template.png')" tag="img" style="max-width: 100px"></w-image>
      </div>
      <w-divider class="my4"  vertical></w-divider>
      <div class="d-flex justify-start pa2" style="flex-direction: column; width: calc(100% - 200px)">
        <div class="blue-grey-light4 title2">{{ taskTemplate.author }} - {{ taskTemplate.title }}</div>
        <div class="blue-grey-light4 title3 text-italic text-muted book-description"> {{ taskTemplate.description }}</div>
      </div>
      <w-divider class="my4"  vertical></w-divider>
      <div class="d-flex justify-center align-center pa2" style="width: 100px; flex-direction: column">
        <w-tooltip left color="blue-grey-light4" bg-color="blue-grey-dark5">
          <template #activator="{ on }">
            <w-button
                v-on="on"
                tile
                text
                icon="mdi mdi-book-open-page-variant"
                color="blue-grey-light4"
                :route="urlStorage + taskTemplate.document.path"
                target="_blank"
                lg
            >
            </w-button>
          </template>
          <div class="title3"> Читати книгу</div>
        </w-tooltip>
        <w-tooltip left color="blue-grey-light4" bg-color="blue-grey-dark5">
          <template #activator="{ on }">
            <w-button
                v-on="on"
                @click="drawer?drawer=false:openDrawer($event, taskTemplate)"
                class="grow caption"
                icon="mdi mdi-eye-outline"
                lg
                tile
                text
                color="blue-grey-light4"
            >

            </w-button>
          </template>
          <div class="title3">Дізнатись більше</div>
        </w-tooltip>
        <w-tooltip left color="blue-grey-light4" bg-color="blue-grey-dark5" v-if="!user.isAdmin">
          <template #activator="{ on }">
            <w-button
                v-on="on"
                tile
                text
                icon="mdi mdi-bookmark"
                :color="taskTemplate.isStudentBook?'teal':'blue-grey-light4'"
                @click="taskTemplate.isStudentBook?destroySaveTaskTemplates(taskTemplate):storeSaveTaskTemplates(taskTemplate)"
                lg
            >
            </w-button>
          </template>
          <div class="title3">
            {{ taskTemplate.isStudentBook?'Книга збережена':'Зберегти книгу' }}
          </div>

        </w-tooltip>
      </div>
    </w-flex>
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
        <div class="title2 text-center mb4">{{ taskTemplate.author }} - {{ taskTemplate.title }}</div>
        <div class="title3 text-italic book-description1"> {{ taskTemplate.description }}</div>
        <w-flex no-grow justify-center align-center>
          <w-tooltip bottom color="blue-grey-light4" bg-color="blue-grey-dark5">
            <template #activator="{ on }">
              <w-button
                  absolute top left
                  v-on="on"
                  tile
                  text
                  icon="mdi mdi-book-open-page-variant"
                  color="blue-grey-light4"
                  :route="urlStorage + taskTemplate.document.path"
                  target="_blank"
                  xl
              >
              </w-button>
            </template>
            <div class="title3"> Читати книгу</div>

          </w-tooltip>
          <w-tooltip bottom color="blue-grey-light4" bg-color="blue-grey-dark5" v-if="!user.isAdmin">
            <template #activator="{ on }">
              <w-button
                  absolute top left style="left: 40px"
                  v-on="on"
                  tile
                  text
                  icon="mdi mdi-bookmark"
                  :color="taskTemplate.isStudentBook?'teal':'blue-grey-light4'"
                  @click="taskTemplate.isStudentBook?destroySaveTaskTemplates(taskTemplate):storeSaveTaskTemplates(taskTemplate)"
                  xl
              >

              </w-button>
            </template>
            <div class="title3">
              {{ taskTemplate.isStudentBook?'Книга збережена':'Зберегти книгу' }}
            </div>
          </w-tooltip>
        </w-flex>
      </w-flex>
      <w-image :src="require('./../../../assets/photo5.png')" tag="img"
               style="max-width: 16vw; position: absolute; bottom:0; left:calc(50% - 8vw)"></w-image>
    </w-drawer>
<!--    <w-card class="book-card" style="width: 100%" bg-color="blue-grey-dark3" content-class="pb0 blue-grey-light3" title-class="blue-grey-light3 bd0">-->
<!--      <template #title>-->
<!--        <div class="body blue-grey-light3">{{ taskTemplate.author }}</div>-->

<!--      </template>-->

<!--      <w-flex column align-start justify-space-between>-->
<!--        <div class="d-flex align-center justify-center" style="width: 100%">-->
<!--          <w-image :src="require('../../../assets/task-template.png')" tag="img" style="max-width: 100px"></w-image>-->
<!--        </div>-->
<!--        <div class="body blue-grey-light3">{{ taskTemplate.title }}</div>-->
<!--      </w-flex>-->


<!--      <template #actions>-->
<!--        <w-button-->
<!--            @click="drawer?drawer=false:openDrawer($event, taskTemplate)"-->
<!--            class="grow caption"-->
<!--            sm-->
<!--           color="blue-grey-dark4"  bg-color="blue-grey-light3"-->
<!--        >-->
<!--          Дізнатись більше-->
<!--        </w-button>-->
<!--      </template>-->
<!--      <w-drawer-->
<!--          top-->
<!--          v-model="drawer"-->
<!--          absolute-->
<!--          color="blue-grey-dark3" bg-color="blue-grey-light3"-->
<!--          height="50%"-->
<!--      >-->
<!--        <w-button absolute bottom right color="blue-grey-dark3" text style="right: 0;bottom: 0"-->
<!--                  bg-color="blue-grey-light3" icon="wi-cross" xs tile @click="drawer=false"></w-button>-->
<!--        <w-flex column >-->
<!--          <w-flex class="body black pa1">-->
<!--            {{ taskTemplate.description }}-->
<!--          </w-flex>-->
<!--          <w-flex no-grow justify-center align-center>-->
<!--            <w-tooltip top color="blue-grey-light3" bg-color="blue-grey-dark5">-->
<!--              <template #activator="{ on }">-->
<!--                <w-button-->
<!--                    v-on="on"-->
<!--                    tile-->
<!--                    text-->
<!--                    icon="mdi mdi-book-open-page-variant"-->
<!--                    color="blue-grey-dark4"-->
<!--                    :route="urlStorage + taskTemplate.document.path"-->
<!--                    target="_blank"-->
<!--                    xl-->
<!--                >-->
<!--                </w-button>-->
<!--              </template>-->
<!--              <div class="body"> Читати книгу</div>-->

<!--            </w-tooltip>-->
<!--            <w-tooltip top color="blue-grey-light3" bg-color="blue-grey-dark5" v-if="!user.isAdmin">-->
<!--              <template #activator="{ on }">-->
<!--                <w-button-->
<!--                    v-on="on"-->
<!--                    tile-->
<!--                    text-->
<!--                    icon="mdi mdi-book-account-outline"-->
<!--                    :color="taskTemplate.document.isSaveDocument?'cyan-dark4':'blue-grey-dark4'"-->
<!--                    @click="taskTemplate.document.isSaveDocument?destroySaveTaskTemplates(taskTemplate):storeSaveTaskTemplates(taskTemplate)"-->
<!--                    xl-->
<!--                >-->

<!--                </w-button>-->
<!--              </template>-->
<!--              <div class="body">-->
<!--                {{ taskTemplate.document.isSaveDocument?'Видалити з кабінету':'Зберегти в кабінеті' }}-->
<!--              </div>-->

<!--            </w-tooltip>-->
<!--          </w-flex>-->
<!--        </w-flex>-->
<!--      </w-drawer>-->
<!--    </w-card>-->
  </w-flex>

</template>

<script>
import {mapActions, mapGetters} from "vuex";

const URL_STORAGE = process.env.VUE_APP_URL_STORAGE
const BASE_URL = process.env.VUE_APP_API_URL
// https://chrome.google.com/webstore/detail/djvujs-viewer/bpnedgjmphmmdgecmklcopblfcbhpefm/related
// https://addons.mozilla.org/uk/firefox/addon/djvu-js-viewer/
export default {
  name: "TestSampleCardComponent",
  data() {
    return {
      urlStorage: URL_STORAGE,
      baseUrlApi: BASE_URL,
      drawer: this.drawerProp,

    }
  },

  props: {
    drawerProp: {
      type: Boolean,
      default: false
    },
    taskTemplate: {
      type: Object,
      default: () => {}
    },
  },
  computed: {
    ...mapGetters({
      saveTestSamples: 'saveTaskTemplates/saveTaskTemplates',
      user: 'auth/user',
    }),
  },
  methods:{
    ...mapActions({
      saveTaskTemplate: 'saveTaskTemplates/saveTaskTemplate',
      deleteSavedTaskTemplate: 'saveTaskTemplates/deleteSavedTaskTemplate',

    }),
    openDrawer() {
      this.drawer = true
    },
    storeSaveTaskTemplates(taskTemplate){
      let data={taskTemplateId:taskTemplate.id}
      this.saveTaskTemplate(data).then(()=>{
        taskTemplate.isStudentBook=true
        this.notify('Збережено в особистому кабінеті.')
      })
    },
    destroySaveTaskTemplates(taskTemplate){
      this.deleteSavedTaskTemplate(taskTemplate.id).then(()=>{
        taskTemplate.isStudentBook=false
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

<style >
.w-notification-manager {width: 500px;}
</style>