<template>
  <w-flex justify-center style="width: 100%; padding-left: 250px" fill-height>
    <w-grid
        style="width: 95%"
        :columns="{ xs: 2, sm: 3, md: 4, lg: 6, xl: 6 }"
        gap="3"
        class="pa3"
        v-if="filteredTaskTemplateList!==undefined && filteredTaskTemplateList.length!==0"
    >
      <div v-for="(taskTemplate, index) in filteredTaskTemplateList" :key="index" class="sh1">
        <TaskTemplateCardComponent
            :task-template="taskTemplate"
            :drawer-prop="showDrawer"
        />
      </div>
    </w-grid>
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
  </w-flex>
  <w-button absolute top left bg-color="blue-grey-dark3" color="blue-grey-light3" class="mt3" style="top:40px; left: 250px"
            icon="mdi mdi-magnify" xl tile @click="openDrawer"></w-button>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import TaskTemplateCardComponent from "@/components/student/account/TaskTemplateCardComponent";

export default {
  name: 'MyFormulaPage',
  components: {TaskTemplateCardComponent},

  data() {
    return {
      search: '',
      drawerSearch: false,
      openDrawer1: true,
      showDrawer: false,
    }
  },
  created() {
    this.savedTaskTemplates()
  },
  computed: {
    ...mapGetters({
      saveTaskTemplates: 'saveTaskTemplates/saveTaskTemplates',
    }),
    filteredTaskTemplateList() {
      return this.saveTaskTemplates.filter(taskTemplate => {
        return taskTemplate.title.toLowerCase().includes(this.search.toLowerCase())
      })

    },


  },
  methods: {
    ...mapActions({
      savedTaskTemplates: 'saveTaskTemplates/savedTaskTemplates',
    }),
    openDrawer(){
      this.drawerSearch=true
      this.search=''
    },
  }
}
</script>

<style>
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
