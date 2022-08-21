<template>

  <w-flex column align-center justify-center style="width: 100vw" class="mt1">
    <w-card class="news-card mb1" v-for="(news, index) in appNews" :key="index" shadow style="width: 75vw"
            @click.prevent="openNewsDialog($event, news)">
      <template #title>
        <div class="title5" style="width: 100%">{{ news.title }}</div>
      </template>

      <w-flex align-center justify-space-between>
        <div class="news-description body"> {{ news.description }}</div>
        <div class="caption text-right">{{ news.created }}</div>
      </w-flex>

    </w-card>

  </w-flex>
  <w-dialog
      v-model="showNewsDialog"
      :title="newsRead?newsRead.title:''">
    <w-button absolute top right bg-color="grey-dark5"
              color="white" icon="wi-cross" tile @click="showNewsDialog=false"></w-button>
    <div v-html="newsRead.text" style="text-align: justify">

    </div>

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
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'HelloWorld',
  data() {
    return {
      showProgress: false,
      showNewsDialog: false,
      newsRead: null

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
  }
}
</script>

<style scoped>
p {
  text-align: justify;
  line-height: 1.6;
  margin-bottom: 10px;
  text-indent: 1.5em;
  margin-top: 0;

}

.news-description {
  width: 75vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

p + p {

}

.active-class {
  background-color: #efefef;
}

.news-card {
  -webkit-transition: .2s ease-in-out;
  transition: .2s ease-in-out;
  cursor: pointer;
}

.news-card:hover {
  background-color: #efefef;
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
