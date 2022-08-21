<template>
  <w-flex column align-center justify-center class="pt2 pr2 pl2" style="margin-left: 250px">
    <w-card class="news-card mb1 " style="width: 100%" v-for="(test, index) in  user.tests" :key="index" shadow
            @click.prevent="openTestDialog($event, test)">
      <template #title>
        <div class="title5">{{ test.name }}</div>
      </template>

      <w-flex align-center justify-space-between style="width: 100%">
        <div class="news-description body"> {{ test.description }}</div>
        <div class="caption text-right">{{ test.created }}</div>
      </w-flex>
    </w-card>
  </w-flex>

  <w-dialog
      fullscreen
      v-model="showTestDialog"
      :title="testRead?testRead.name:''">
    <w-button absolute top right bg-color="grey-dark5"
              color="white" icon="wi-cross" tile @click="showTestDialog=false"></w-button>
    <div>
      {{ testRead.questions }}
    </div>

  </w-dialog>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'HelloWorld',
  data() {
    return {
      showTestDialog: false,
      testRead: null

    }
  },
  created() {


  },
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),


  },
  methods: {
    ...mapActions({}),
    openTestDialog(event, news) {
      this.showTestDialog = true
      this.testRead = news
      this.isActive(event)

    },
    isActive(event) {
      let active = document.querySelectorAll('.active-class');
      active.forEach((link) => link.classList.remove('active-class'));
      let elem = event.target.parentElement
      if (elem) {
        elem.classList.add('active-class')
      }
    },
  }
}
</script>

<style scoped>
.w-card__title {
  padding: 4px 12px !important;
}

p {
  text-align: justify;
  line-height: 1.6;
  margin-bottom: 10px;
  text-indent: 1.5em;
  margin-top: 0;

}

.news-description {
  max-width: 50vw;
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
