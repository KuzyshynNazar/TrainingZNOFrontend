<template>
  <w-flex fill-height >
    <w-card class="book-card" style="width: 100%" bg-color="blue-grey-dark3" content-class="pb0 blue-grey-light3" title-class="blue-grey-light3 bd0">
      <template #title>
        <div class="body blue-grey-light3">{{ taskTemplate.title }}</div>

      </template>

      <w-flex column align-start justify-space-between>
        <div class="d-flex align-center justify-center" style="width: 100%">
          <w-image :src="require('../../../assets/task-template.png')" tag="img" style="max-width: 100px"></w-image>
        </div>
      </w-flex>
<!--      <w-divider class="mt2 mx-3 cyan-dark4&#45;&#45;bg"></w-divider>-->

      <template #actions>
        <w-button
            @click="drawer?drawer=false:openDrawer($event, taskTemplate)"
            class="grow caption"
            sm
           color="blue-grey-dark4"  bg-color="blue-grey-light3"
        >
          Дізнатись більше
        </w-button>
      </template>
      <w-drawer
          top
          v-model="drawer"
          absolute
          color="blue-grey-dark3" bg-color="blue-grey-light3"
          height="25%"
      >
        <w-button absolute bottom right color="blue-grey-dark3" text style="right: 0;bottom: 0"
                  bg-color="blue-grey-light3" icon="wi-cross" xs tile @click="drawer=false"></w-button>
        <w-flex column align-center justify-center>
          <w-flex no-grow justify-center align-center>
            <w-tooltip bottom bg-color="blue-grey-light3" color="blue-grey-dark5">
              <template #activator="{ on }">
                <w-button
                    v-on="on"
                    tile
                    text
                    icon="mdi mdi-book-open-page-variant"
                    color="blue-grey-dark4"
                    :route="urlStorage + taskTemplate.document.path"
                    target="_blank"
                    xl
                >
                </w-button>
              </template>
              <div class="body">Читати книгу</div>

            </w-tooltip>
            <w-tooltip bottom  bg-color="blue-grey-light3" color="blue-grey-dark5">
              <template #activator="{ on }">
                <w-button
                    v-on="on"
                    tile
                    text
                    icon="mdi mdi-book-account-outline"
                    :color="'blue-grey-dark4'"
                    @click="destroySaveTaskTemplates(taskTemplate)"
                    xl
                >

                </w-button>
              </template>
              <div class="body">
                {{'Видалити з ос. кабінету' }}
              </div>

            </w-tooltip>
          </w-flex>
        </w-flex>
      </w-drawer>
    </w-card>
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
        taskTemplate.isSaveDocument=true
        this.notify('Збережено в особистому кабінеті.')
      })
    },
    destroySaveTaskTemplates(taskTemplate){
      this.deleteSavedTaskTemplate(taskTemplate.id).then(()=>{
        taskTemplate.isSaveDocument=false
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