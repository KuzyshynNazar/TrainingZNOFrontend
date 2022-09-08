<template>
  <w-app row class="pa0" style="padding: 0 !important;">
    <w-flex column>
      <header>
        <w-toolbar  class="pa0" bg-color="blue-grey-dark5" color="blue-grey-light3" height="40px">
          <!--          <w-icon-->
          <!--              class="ml3 mr3"-->
          <!--              color="white"-->
          <!--              xl-->
          <!--              @click="home"-->
          <!--              style="cursor: pointer"-->
          <!--          >-->
          <!--            car-bmw-->
          <!--          </w-icon>-->

          <div class="ml3 mr3" @click="home" style="cursor: pointer">
            <w-icon sm>mdi mdi-format-superscript</w-icon>
            <w-icon sm>mdi mdi-plus</w-icon>
            <w-icon sm>mdi mdi-square-root</w-icon>
            <w-icon sm>mdi mdi-equal</w-icon>
            <w-icon sm>mdi mdi-chart-bell-curve</w-icon>
          </div>
          <div class="spacer"></div>
          <w-tooltip left>
            <template #activator="{ on }">
              <w-button v-on="on" icon="mdi mdi-backburger" color="blue-grey-light3" @click="openDrawer = true" tile text md
                        class="mr2">
              </w-button>
            </template>
            Розгорнути бічну панель
          </w-tooltip>
        </w-toolbar>
      </header>
      <main class="grow blue-grey-light3--bg" style="height: calc(100vh - 80px); overflow-y: auto">
        <w-drawer
            v-model="openDrawer"
            right
            bg-color="blue-grey-dark5"
            color="blue-grey-light3"
        >
          <w-tooltip left>
            <template #activator="{ on }">
              <w-button
                  v-on="on"
                  @click="openDrawer = false"
                  sm
                  absolute
                  left
                  text
                  tile
                  style="left: -20px"
                  bg-color="blue-grey-dark5"
                  color="blue-grey-light3"
                  icon="mdi mdi-forwardburger">
              </w-button>
            </template>
            Згорнути бічну панель
          </w-tooltip>
          <w-flex column>
            <w-list style="display: inline-grid" :items="items" nav hover item-class="ma0">
              <template #item="{ item }">
                <div class="blue-grey-light3">{{ item.label }}</div>
                <div class="spacer"></div>
                <w-icon md color="blue-grey-light3">{{ item.icon }}</w-icon>
              </template>
            </w-list>
          </w-flex>
          <w-image :src="require('./../assets/photo8.png')" tag="img"
                   style="max-width: 20vw; position: absolute; bottom:0; left:calc(50% - 10vw)"></w-image>
        </w-drawer>
        <router-view></router-view>
      </main>
      <footer>
        <w-toolbar shadow class="pa0"  bg-color="blue-grey-dark5" color="blue-grey-light3" height="40px">
          <w-tooltip right color="blue-grey-light3" bg-color="blue-grey-dark5">
            <template #activator="{ on }">
              <w-button v-on="on" :icon="!isFullscreen?iconFullscreen1:iconFullscreen2" tile color="white"
                        @click="fullScreen" text md
                        class="ml3 mr3">
              </w-button>
            </template>
            {{ !isFullscreen ? 'Повноноекраний режим' : 'Звичайний режим' }}
          </w-tooltip>
          <w-tooltip top color="blue-grey-light3" bg-color="blue-grey-dark5">
            <template #activator="{ on }">
              <w-button v-on="on" icon="mdi mdi-location-exit" color="blue-grey-light3" v-if="user.isAdmin" @click="logOutAdmin" tile text md
                        class="mr2"></w-button>
              <w-button v-else v-on="on" icon="mdi mdi-logout-variant" color="blue-grey-light3" @click="logOutStudent" tile text md
                        class="mr2"></w-button>
            </template>
            Вихід
          </w-tooltip>
          <div class="spacer"></div>
          <w-tooltip  v-if="!user.isAdmin" top color="blue-grey-light3" bg-color="blue-grey-dark5">
            <template #activator="{ on }">
              <w-button v-on="on" icon="mdi mdi-account" color="blue-grey-light3" @click="goToAccount" tile text md
                        class="ml3 mr3"></w-button>
            </template>
            Особистий кабінет
          </w-tooltip>
          <w-tooltip v-if="user.isAdmin" top color="blue-grey-light3" bg-color="blue-grey-dark5">
            <template #activator="{ on }">
              <w-button v-on="on" icon="mdi mdi-monitor-dashboard" color="blue-grey-light3" @click="goToAdminPanel" tile text md
                        class="ml3 mr3"></w-button>
            </template>
            Адмін панель
          </w-tooltip>
          <w-tooltip top color="white" bg-color="blue-grey-dark5">
            <template #activator="{ on }">
              <w-button v-on="on" icon="mdi mdi-cog-outline" color="blue-grey-light3" @click="goToSettings" tile text md
                        class="ml3 mr3"></w-button>
            </template>
            Налаштування сайту
          </w-tooltip>
          <w-tooltip  left color="blue-grey-light3" bg-color="blue-grey-dark5">
            <template #activator="{ on }">
              <w-button v-on="on" icon="mdi mdi-account-cog" color="blue-grey-light3" @click="goToSettingsAccount" tile text md
                        class="ml3 mr3"></w-button>
            </template>
            Налаштування особистого кабінету
          </w-tooltip>
        </w-toolbar>
      </footer>
    </w-flex>
  </w-app>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "HomePage",
  data() {
    return {
      inputs: {
        username: '',
        password: ''
      },
      iconFullscreen1: 'mdi mdi-fullscreen',
      iconFullscreen2: 'mdi mdi-fullscreen-exit',
      isFullscreen: false,
      openDrawer: false,
      items: [
        {label: 'Новина', id: 'tests', color: 'white', icon: 'mdi mdi-newspaper-variant-outline', route: '/home'},
        {label: 'Книги', id: 'books', color: 'white', icon: 'mdi mdi-bookshelf', route: '/books'},
        {label: 'Формули та правила', id: 'formulas', color: 'white', icon: 'mdi mdi-function-variant', route: '/formulas-and-rules'},
        {label: 'Зразки тестів', id: 'TestSamples', color: 'white', icon: 'mdi mdi-ballot-outline', route: '/test-samples'},
        // {label: 'Додаткові матеріали', id: 'treeCategories', color: 'white', icon: 'mdi mdi-file-tree-outline', route: '/dashboard/tree-categories'},
      ]
    }
  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  created() {
    // console.log(this.user)
  },
  methods: {
    ...mapActions({
      logoutAdmin: "auth/logoutAdmin",
      logoutStudent: "auth/logoutStudent",
    }),
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
    logOutAdmin() {
      this.logoutAdmin().then(() => {
        this.$router.push({path: '/login-admin'});
      })
    },
    logOutStudent() {
      this.logoutStudent().then(() => {
        this.$router.push({path: '/login'});
      })
    },
    home() {
      this.$router.push({path: '/home'});
    },
    goToAccount() {
      this.$router.push({path: '/account'});
    },
    goToSettingsAccount() {
      this.$router.push({path: '/account-settings'});
    },
    goToSettings() {
      this.$router.push({path: '/settings'});
    },
    goToAdminPanel() {
      this.$router.push({path: '/dashboard/students'});
    }

  },
}
</script>

<style>
.w-list__item{
  margin: 0;
}
::-webkit-scrollbar {
  /*display: none;*/
  width: 6px;
  height: 5px;
}


::-webkit-scrollbar:horizontal {
  width: 5px;
  height: 10px;
}

::-webkit-scrollbar:vertical {
  width: 6px;
  height: 5px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  /*border-radius: 5px;*/
  background: #2b363b;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b3c0c7;
}

#shape {
  -webkit-animation: spin 10s infinite linear;
}

@-webkit-keyframes spin {
  from {
    transform: rotateY(0);
  }
  to {
    transform: rotateY(360deg);
  }
}
</style>