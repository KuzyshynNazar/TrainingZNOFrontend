<template>
  <w-app row class="pa0" style="padding: 0 !important;">
    <w-flex column>
      <header>
        <w-toolbar shadow class="pa0" bg-color="grey-dark5" color="white" height="40px">
          <w-tooltip right>
            <template #activator="{ on }">
              <w-button v-on="on" icon="mdi mdi-forwardburger" color="white" @click="openDrawer = true" text tile md
                        class="ml2 mr2">
              </w-button>
            </template>
            Розгорнути бічну панель
          </w-tooltip>
          <div class="mr3" @click="dashboard" style="cursor: pointer">Панель адміністратора</div>
          <div class="spacer"></div>
          <w-tooltip left>
            <template #activator="{ on }">
              <w-button v-on="on" icon="mdi mdi-home" color="white" @click="home" text tile md
                        class="ml1 mr2">
              </w-button>
            </template>
            На головну сторінку
          </w-tooltip>
          <w-tooltip right>
            <template #activator="{ on }">
              <w-button v-on="on" :icon="!isFullscreen?iconFullscreen1:iconFullscreen2" color="white"
                        @click="fullScreen" text tile md
                        class="mr2">
              </w-button>
            </template>
            {{ !isFullscreen ? 'Повноноекраний режим' : 'Звичайний режим' }}
          </w-tooltip>
        </w-toolbar>
      </header>
      <main class="grow">
        <w-drawer
            v-model="openDrawer"
            left
            width="300px"
            bg-color="grey-dark5"
            color="white"
        >
          <w-tooltip right>
            <template #activator="{ on }">
              <w-button
                  style="right: -20px"
                  v-on="on"
                  @click="openDrawer = false"
                  sm
                  absolute
                  right
                  tile
                  bg-color="grey-dark5"
                  color="white"
                  icon="mdi mdi-backburger"
              >
              </w-button>
            </template>
            Згорнути бічну панель
          </w-tooltip>
          <w-flex column>
            <w-list style="display: inline-grid" :items="items" nav hover item-class="ma0">
              <template #item="{ item }">
                <div>{{ item.label }}</div>
                <div class="spacer"></div>
                <w-icon md>{{ item.icon }}</w-icon>
              </template>
            </w-list>
          </w-flex>

        </w-drawer>
        <router-view></router-view>
      </main>

    </w-flex>
  </w-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'HelloWorld',
  data() {
    return {
      iconFullscreen1: 'mdi mdi-fullscreen',
      iconFullscreen2: 'mdi mdi-fullscreen-exit',
      isFullscreen: false,
      openDrawer: false,
      items: [
        {label: 'Студенти', id: 'students', color: 'white', icon: 'mdi mdi-account-school', route: '/dashboard/students'},
        {label: 'Дерево категорій', id: 'treeCategories', color: 'white', icon: 'mdi mdi-file-tree-outline', route: '/dashboard/tree-categories'},
        {label: 'Тест', id: 'tests', color: 'white', icon: 'mdi mdi-ab-testing', route: '/dashboard/tests'},
        {label: 'Новина', id: 'tests', color: 'white', icon: 'mdi mdi-newspaper-variant', route: '/dashboard/news'},
        {label: 'Книги', id: 'tests', color: 'white', icon: 'mdi mdi-bookshelf', route: '/dashboard/books'},
        {label: 'Формули та правила', id: 'tests', color: 'white', icon: 'mdi mdi-function-variant', route: '/dashboard/formulas-and-rules'},
      ]
    }
  },
  created() {
  },
  computed: {
    ...mapGetters({}),


  },
  methods: {
    ...mapActions({}),
    dashboard(){
      this.$router.push({path: '/dashboard'});
    },
    home() {
      this.$router.push({path: '/home'});
    },
    fullScreen() {
      let doc = window.document;
      let docEl = doc.documentElement;

      let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen;
      let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen;

      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement) {
        this.isFullscreen = true
        requestFullScreen.call(docEl);
      } else {
        this.isFullscreen = false
        cancelFullScreen.call(doc);
      }
    },
  }
}
</script>

<style>

h3 {
  margin: 40px 0 0;
}
.w-list__item{
  margin: 0 !important;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
  margin: 0;
}

a {
  color: #42b983;
}
</style>
