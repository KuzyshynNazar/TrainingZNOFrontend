<template>
  <w-flex align-center justify-center style="width: 100vw">
  <w-grid
      style="width: 70vw"
      :columns="{ xs: 1, sm: 2, md: 4, lg: 5, xl: 5 }"
      gap="3"
      class="pa3"
      v-if="filteredFormulaList!==undefined && filteredFormulaList.length!==0"
  >
    <div v-for="(formula, index) in filteredFormulaList" :key="index" class="sh1">
      <FormulaCardComponent
          :formula="formula"
          :drawer-prop="showDrawer"
      />
    </div>
  </w-grid>
    <w-flex v-else align-center justify-center fill-height column>
      <div class="blue-grey-dark5">
        За вашим запитом нічого не знайдено
      </div>
      <w-button @click="search=''" color="blue-grey-dark5"
                bg-color="blue-grey-light3" text tile icon="mdi mdi-reload" xl>Презавантажити</w-button>
    </w-flex>
  </w-flex>
  <w-image :src="require('./../assets/math-logo.png')" tag="img" style="max-width: 10vw; position: fixed; top:40px; right: 10px; transform: rotate(-180deg) scale(-1, 1);" ></w-image>
<!--  <w-image :src="require('./../assets/math-logo.png')" tag="img" style="max-width: 10vw; position: fixed; bottom:40px; left: 10px; transform:scale(-1, 1);" ></w-image>-->
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
import FormulaCardComponent from "@/components/app/formula/FormulaCardComponent";

export default {
  name: 'BooksPage',
  components: {FormulaCardComponent},
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
    this.getAllFormulas().then(() => {
      this.showProgress = false
    })

  },
  computed: {
    ...mapGetters({
      formulas: 'appFormulas/formulas',
    }),
    filteredFormulaList() {
      return this.formulas.filter(formula => {
        return formula.title.toLowerCase().includes(this.search.toLowerCase())
      })

    }
  },
  methods: {
    ...mapActions({
      getAllFormulas: 'appFormulas/getAll',

    }),
    openDrawer(){
      this.drawer=true
      this.search=''
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
p {
  text-align: justify;
  line-height: 1.6;
  margin-bottom: 10px;
  text-indent: 1.5em;
  margin-top: 0;

}

.w-card__actions {
  padding: 8px;
}

.book-description {
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

p + p {

}

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
