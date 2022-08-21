<template>
  <w-app row class="pa0" style="padding: 0 !important;">
    <w-flex column>
      <header>
        <w-toolbar shadow class="pa0" bg-color="grey-dark5" color="white" height="40px">
          <!--          <w-icon-->
          <!--              class="ml3 mr3"-->
          <!--              color="white"-->
          <!--              xl-->
          <!--              @click="home"-->
          <!--              style="cursor: pointer"-->
          <!--          >-->
          <!--            car-bmw-->
          <!--          </w-icon>-->
          <div class="ml3 mr3" @click="home" style="cursor: pointer">K.I.M ZNO</div>
          <div class="spacer"></div>
          <w-tooltip left>
            <template #activator="{ on }">
              <w-button v-on="on" icon="mdi mdi-backburger" color="white" @click="openDrawer = true" tile text md
                        class="mr2">
              </w-button>
            </template>
            Розгорнути бічну панель
          </w-tooltip>
        </w-toolbar>
      </header>
      <main class="grow">
        <w-drawer
            v-model="openDrawer"
            right
            bg-color="grey-dark5"
            color="white"
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
                  color="white"
                  bg-color="grey-dark5"
                  icon="mdi mdi-forwardburger">
              </w-button>
            </template>
            Згорнути бічну панель
          </w-tooltip>
          <w-flex column class="mt2">
            <w-list style="display: inline-grid" :items="items" nav hover>
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
      <footer>
        <w-toolbar shadow class="pa0" bg-color="grey-dark5" color="white" height="40px">
          <w-tooltip top>
            <template #activator="{ on }">
              <w-button v-on="on" :icon="!isFullscreen?iconFullscreen1:iconFullscreen2" tile color="white"
                        @click="fullScreen" text md
                        class="ml3 mr3">
              </w-button>
            </template>
            {{ !isFullscreen ? 'Повноноекраний режим' : 'Звичайний режим' }}
          </w-tooltip>
          <w-tooltip top>
            <template #activator="{ on }">
              <w-button v-on="on" icon="mdi mdi-location-exit" color="white" v-if="user.isAdmin" @click="logOutAdmin" tile text md
                        class="mr2"></w-button>
              <w-button v-else v-on="on" icon="mdi mdi-logout-variant" color="white" @click="logOutStudent" tile text md
                        class="mr2"></w-button>
            </template>
            Вихід
          </w-tooltip>
          <div class="spacer"></div>
          <w-tooltip  v-if="!user.isAdmin" top color="white" bg-color="grey-dark5">
            <template #activator="{ on }">
              <w-button v-on="on" icon="mdi mdi-account" color="white" @click="goToAccount" tile text md
                        class="ml3 mr3"></w-button>
            </template>
            Особистий кабінет
          </w-tooltip>
          <w-tooltip v-if="user.isAdmin" top color="white" bg-color="grey-dark5">
            <template #activator="{ on }">
              <w-button v-on="on" icon="mdi mdi-monitor-dashboard" color="white" @click="goToAdminPanel" tile text md
                        class="ml3 mr3"></w-button>
            </template>
            Адмін панель
          </w-tooltip>
          <w-tooltip top color="white" bg-color="grey-dark5">
            <template #activator="{ on }">
              <w-button v-on="on" icon="mdi mdi-cog-outline" color="white" @click="goToSettings" tile text md
                        class="ml3 mr3"></w-button>
            </template>
            Налаштування сайту
          </w-tooltip>
          <w-tooltip  top color="white" bg-color="grey-dark5">
            <template #activator="{ on }">
              <w-button v-on="on" icon="mdi mdi-account-cog" color="white" @click="goToSettingsAccount" tile text md
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
        {label: 'Книги', id: 'students', color: 'white', icon: 'mdi mdi-bookshelf', route: '/books'},
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