<template>
  <w-flex align-center justify-center style="width: 100vw">
    <w-grid
        style="width: 70vw"
        :columns="{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1 }"
        gap="3"
        class="pa3"
        v-if="filteredTaskTemplateList!==undefined && filteredTaskTemplateList.length!==0"
    >
      <div v-for="(taskTemplate, index) in filteredTaskTemplateList" :key="index" class="sh2 bdrs3">
        <TaskTemplateCardComponent
            :task-template="taskTemplate"
            :drawer-prop="showDrawer"
        />
      </div>
    </w-grid>
    <w-flex v-else align-center justify-center fill-height column>
      <div class="blue-grey-dark5">
        За вашим запитом нічого не знайдено
      </div>
      <w-button @click="search=''" color="blue-grey-dark5"
                bg-color="blue-grey-light3" text tile icon="mdi mdi-reload" xl>Презавантажити
      </w-button>
    </w-flex>
  </w-flex>
  <w-image :src="require('./../assets/math-logo.png')" tag="img"
           style="max-width: 10vw; position: fixed; bottom:20px; left: 0px;  transform: rotate(30deg) scale(-1, 1);"></w-image>
  <w-button absolute top left bg-color="blue-grey-dark3" color="blue-grey-light3" class="mt3" style="top:40px; left: 0"
            icon="mdi mdi-magnify" xl tile @click="openDrawer"></w-button>
  <w-drawer
      top
      v-model="drawer"
      absolute
      style="top: 40px"
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
import TaskTemplateCardComponent from "@/components/app/taskTemplate/TaskTemplateCardComponent";

export default {
  name: 'TestSamplesPage',
  components: {TaskTemplateCardComponent},
  data() {
    return {
      search: '',
      drawer: false,
      showProgress: false,
      showDrawer: false,

    }
  },
  mounted() {

  },
  created() {
    this.showProgress = true
    this.getAllTaskTemplates().then(() => {
      this.showProgress = false
    })

  },
  computed: {
    ...mapGetters({
      taskTemplates: 'appTaskTemplates/taskTemplates',
    }),
    filteredTaskTemplateList() {
      return this.taskTemplates.filter(testSample => {
        return testSample.title.toLowerCase().includes(this.search.toLowerCase())
      })

    }
  },
  methods: {
    ...mapActions({
      getAllTaskTemplates: 'appTaskTemplates/getAll',

    }),
    openDrawer() {
      this.drawer = true
      this.search = ''
    },
    isActive(event) {
      let active = document.querySelectorAll('.active-class');
      active.forEach((link) => link.classList.remove('active-class'));
      let elem = event.target.offsetParent
      if (elem) {
        elem.classList.add('active-class')
      }
    },
  }
}
</script>

<style>

</style>
