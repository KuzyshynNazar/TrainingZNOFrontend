<template>
  <w-flex column align-center justify-center style="width: 100vw" class="mt1">
    <w-card class="news-card mb1" bg-color="blue-grey-dark3" v-for="(news, index) in appNews"
            content-class="blue-grey-light3" no-border :key="index" style="width: 70vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5 blue-grey-light3" style="width: 100%">{{ news.title }}</div>
      </template>
      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="body text-right">{{ news.created }}</div>
      </w-flex>
    </w-card>
    <w-card class="news-card mb1" bg-color="blue-grey-dark3" v-for="(news, index) in appNews"
            content-class="blue-grey-light3" no-border :key="index" style="width: 70vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5 blue-grey-light3" style="width: 100%">{{ news.title }}</div>
      </template>
      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="body text-right">{{ news.created }}</div>
      </w-flex>
    </w-card>
    <w-card class="news-card mb1" bg-color="blue-grey-dark3" v-for="(news, index) in appNews"
            content-class="blue-grey-light3" no-border :key="index" style="width: 70vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5 blue-grey-light3" style="width: 100%">{{ news.title }}</div>
      </template>
      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="body text-right">{{ news.created }}</div>
      </w-flex>
    </w-card>
    <w-card class="news-card mb1" bg-color="blue-grey-dark3" v-for="(news, index) in appNews"
            content-class="blue-grey-light3" no-border :key="index" style="width: 70vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5 blue-grey-light3" style="width: 100%">{{ news.title }}</div>
      </template>
      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="body text-right">{{ news.created }}</div>
      </w-flex>
    </w-card>
    <w-card class="news-card mb1" bg-color="blue-grey-dark3" v-for="(news, index) in appNews"
            content-class="blue-grey-light3" no-border :key="index" style="width: 70vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5 blue-grey-light3" style="width: 100%">{{ news.title }}</div>
      </template>
      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="body text-right">{{ news.created }}</div>
      </w-flex>
    </w-card>
    <w-card class="news-card mb1" bg-color="blue-grey-dark3" v-for="(news, index) in appNews"
            content-class="blue-grey-light3" no-border :key="index" style="width: 70vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5 blue-grey-light3" style="width: 100%">{{ news.title }}</div>
      </template>
      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="body text-right">{{ news.created }}</div>
      </w-flex>
    </w-card>
    <w-card class="news-card mb1" bg-color="blue-grey-dark3" v-for="(news, index) in appNews"
            content-class="blue-grey-light3" no-border :key="index" style="width: 70vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5 blue-grey-light3" style="width: 100%">{{ news.title }}</div>
      </template>
      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="body text-right">{{ news.created }}</div>
      </w-flex>
    </w-card>
    <w-card class="news-card mb1" bg-color="blue-grey-dark3" v-for="(news, index) in appNews"
            content-class="blue-grey-light3" no-border :key="index" style="width: 70vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5 blue-grey-light3" style="width: 100%">{{ news.title }}</div>
      </template>
      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="body text-right">{{ news.created }}</div>
      </w-flex>
    </w-card>
    <w-card class="news-card mb1" bg-color="blue-grey-dark3" v-for="(news, index) in appNews"
            content-class="blue-grey-light3" no-border :key="index" style="width: 70vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5 blue-grey-light3" style="width: 100%">{{ news.title }}</div>
      </template>
      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="body text-right">{{ news.created }}</div>
      </w-flex>
    </w-card>
    <w-card class="news-card mb1" bg-color="blue-grey-dark3" v-for="(news, index) in appNews"
            content-class="blue-grey-light3" no-border :key="index" style="width: 70vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5 blue-grey-light3" style="width: 100%">{{ news.title }}</div>
      </template>
      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="body text-right">{{ news.created }}</div>
      </w-flex>
    </w-card>
    <w-card class="news-card mb1" bg-color="blue-grey-dark3" v-for="(news, index) in appNews"
            content-class="blue-grey-light3" no-border :key="index" style="width: 70vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5 blue-grey-light3" style="width: 100%">{{ news.title }}</div>
      </template>
      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="body text-right">{{ news.created }}</div>
      </w-flex>
    </w-card>
    <w-card class="news-card mb1" bg-color="blue-grey-dark3" v-for="(news, index) in appNews"
            content-class="blue-grey-light3" no-border :key="index" style="width: 70vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5 blue-grey-light3" style="width: 100%">{{ news.title }}</div>
      </template>
      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="body text-right">{{ news.created }}</div>
      </w-flex>
    </w-card>
    <w-card class="news-card mb1" bg-color="blue-grey-dark3" v-for="(news, index) in appNews"
            content-class="blue-grey-light3" no-border :key="index" style="width: 70vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5 blue-grey-light3" style="width: 100%">{{ news.title }}</div>
      </template>
      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="body text-right">{{ news.created }}</div>
      </w-flex>
    </w-card>
    <w-card class="news-card mb1" bg-color="blue-grey-dark3" v-for="(news, index) in appNews"
            content-class="blue-grey-light3" no-border :key="index" style="width: 70vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5 blue-grey-light3" style="width: 100%">{{ news.title }}</div>
      </template>
      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="body text-right">{{ news.created }}</div>
      </w-flex>
    </w-card>
  </w-flex>
<!--  <w-image :src="require('./../assets/math-logo.png')" tag="img"-->
<!--           style="max-width: 10vw; position: fixed; top:40px; left: 10px; transform: rotate(180deg)"></w-image>-->
  <w-image :src="require('./../assets/math-logo.png')" tag="img"
           style="max-width: 10vw; position: fixed; bottom:40px; right: 10px"></w-image>

  <w-dialog
      width="75vw"
      overlay-opacity="0.9"
      v-model="showNewsDialog"
      :title="newsRead?newsRead.title:''"
      content-class="blue-grey-light3--bg blue-grey-dark5"
      title-class="blue-grey-dark5--bg blue-grey-light3"
  >
    <w-button absolute top right bg-color="blue-grey-dark5"
              color="blue-grey-light3" text icon="wi-cross" tile @click="showNewsDialog=false"></w-button>
    <w-flex column style="width: 95%; margin: 0 auto; overflow-y: auto">
      <w-flex class="pa2">
        <div v-html="newsRead.text" style="text-align: justify"></div>

      </w-flex>
      <w-flex class="pa2" style="width: 100%">
        <w-grid
            style="width: 100%"
            :columns="{ xs: 3, sm: 4, md: 4, lg: 6, xl:6 }"
            gap="3"
        >
          <div v-for="(photo, index) in newsRead.photos" :key="index" class="video-item d-flex align-center justify-center sh1 pa1"
               @click="fullScreenPhoto(newsRead.photos,index)">
              <w-image :src="urlStorage + photo.path" tag="img" style="max-width: 10vw; cursor: pointer"
                       ></w-image>
          </div>
        </w-grid>
      </w-flex>
      <w-flex class="pa2" column align-start justify-start style="width: 70%">
        <div class="mb1 pl2 title2 blue-grey-dark5">Відео матеріали</div>
        <div v-for="(video, index) in newsRead.videos" :key="index" style="width: 100%;" class="pl2 video-item d-flex justify-space-between align-center">
          <div class="title3 text-italic blue-grey-dark5">{{video.name}}</div>
          <w-button
              tile
              text
              icon="mdi mdi-play"
              color="blue-grey-dark4"
              :route="urlStorage + video.path"
              target="_blank"
              xl
          >
          </w-button>
        </div>
      </w-flex>
      <w-flex class="pa2" column align-start justify-start style="width: 70%">
        <div class="mb1 pl2 title2 blue-grey-dark5">Документи</div>
        <div v-for="(document, index) in newsRead.documents" :key="index" style="width: 100%;" class="pl2 video-item d-flex justify-space-between align-center">
          <div class="title3 text-italic blue-grey-dark5">{{document.name}}</div>
          <w-button
              tile
              text
              icon="mdi mdi-book-open-page-variant"
              color="blue-grey-dark4"
              :route="urlStorage + document.path"
              target="_blank"
              xl
          >
          </w-button>
        </div>
      </w-flex>
    </w-flex>
    <w-image :src="require('./../assets/math-logo.png')" tag="img"
             style="max-width: 10vw; position: absolute; bottom:0px; right: 10px"></w-image>
  </w-dialog>
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
  <w-overlay
      v-model="overlay"
      bg-color="rgba(69, 86, 94, 1)"
  >
    <w-button tile
              width="50px"
              height="50px"
              outline
              bg-color="blue-grey-dark5"
              absolute top right
              @click="overlay=false">
      <w-icon>wi-cross</w-icon>
    </w-button>
    <w-button tile
              width="50px"
              height="80vh"
              outline
              bg-color="blue-grey-dark5"
              style="top:10vh; opacity: 0.8"
              absolute top left
              @click="prevPhoto(newsRead.photos)">
      <w-icon>mdi mdi-arrow-left-thick</w-icon>
    </w-button>

    <w-button absolute top right
              tile
              outline
              bg-color="blue-grey-dark5"
              style="top:10vh; opacity: 0.8"
              width="50px"
              height="80vh"
              @click="nextPhoto(newsRead.photos)">
      <w-icon>mdi mdi-arrow-right-thick</w-icon>
    </w-button>
    <w-flex fill-height align-center justify-center >
      <w-image :src="urlStorage + pathPhoto"
               tag="img" style="max-width: 90vw;"
      >

      </w-image>
    </w-flex>
  </w-overlay>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

const URL_STORAGE = process.env.VUE_APP_URL_STORAGE
const BASE_URL = process.env.VUE_APP_API_URL
export default {
  name: 'HelloWorld',
  data() {
    return {
      urlStorage: URL_STORAGE,
      baseUrlApi: BASE_URL,
      showProgress: false,
      showNewsDialog: false,
      newsRead: null,
      pathPhoto: '',
      i: 0,
      overlay: false

    }
  },
  created() {
    this.showProgress = true
    this.getAllNews().then(() => {
      this.showProgress = false
    })

  },
  computed: {
    ...mapGetters({
      appNews: 'appNews/appNews',
    }),


  },
  methods: {
    ...mapActions({
      getAllNews: 'appNews/getAll',
    }),
    openNewsDialog(event, news) {
      this.showNewsDialog = true
      this.newsRead = news
      this.isActive(event)

    },
    isActive(event) {
      let active = document.querySelectorAll('.active-class');
      active.forEach((link) => link.classList.remove('active-class'));
      let elem = event.target.offsetParent
      if (elem) {
        elem.classList.add('active-class')
      }
    },
    fullScreenPhoto(path, index) {
      this.i = index
      this.overlay = true
      console.log(path[this.i].path)
      this.pathPhoto = path[this.i].path
    },
    nextPhoto(path) {
      this.i++
      if (this.i === path.length) {
        this.i = path.length - 1
      }
      this.pathPhoto = path[this.i].path
    },
    prevPhoto(path) {
      this.i--
      if (this.i <= 0) {
        this.i = 0
      }
      this.pathPhoto = path[this.i].path

    },
  }
}
</script>

<style scoped>
.video-item:hover{
  background-color:#a5b1b9;
}
.photo-detail__overlay-content {
  position: relative;
}

.photo-detail__overlay-img {
  height: 100%
}

.photo-detail__overlay-btn {
  height: 100% !important;
  opacity: 0.8
}

.photo-detail__overlay-close {
  z-index: 100;
  position: fixed;
  top: 10px;
  right: 10px
}

.photo-detail__overlay-bookmark {
  z-index: 100;
  position: fixed;
  top: 10px;
  right: 84px
}

p {
  text-align: justify;
  line-height: 1.6;
  margin-bottom: 10px;
  text-indent: 1.5em;
  margin-top: 0;

}

.news-description {
  width: 75%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

p + p {

}

.active-class {
  background-color: #5f7681;
}

.news-card {
  -webkit-transition: .2s ease-in-out;
  transition: .2s ease-in-out;
  cursor: pointer;
}

.news-card:hover {
  background-color: #5f7681;
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
