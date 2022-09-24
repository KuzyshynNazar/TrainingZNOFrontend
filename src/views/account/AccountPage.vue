<template>
  <w-drawer
      v-model="openDrawer1"
      width="250px"
      absolute
      bg-color="blue-grey-dark5"
      color="blue-grey-light3"
      left
      no-overlay>
    <w-flex column>
      <w-list  style="margin-top: 40px; display: inline-grid; width: 100%" :items="items" nav hover item-class="ma0">
        <template #item="{ item }" >
          <div class="blue-grey-light4 title3">{{ item.label }}</div>
          <div class="spacer"></div>
          <w-icon lg class="blue-grey-light4">{{ item.icon }}</w-icon>

        </template>
      </w-list>
    </w-flex>
    <w-image :src="require('./../../assets/photo5.png')" tag="img"
             style="max-width: 10vw; position: absolute; bottom:40px; left:calc(50% - 5vw);"></w-image>
  </w-drawer>
  <main class="grow">
    <router-view></router-view>
  </main>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'HelloWorld',
  data() {
    return {
      openDrawer1: true,
      items: [
        {label: 'Мої тести', id: 'item1', color: 'white',icon: 'mdi mdi-ab-testing', route: '/account/my-tests'},
        {label: 'Мої книги', id: 'item2', color: 'white',icon: 'mdi mdi-book-open-page-variant', route: '/account/my-books'},
        {label: 'Мої формули і правила', id: 'item3', color: 'white',icon: 'mdi mdi-function-variant', route: '/account/my-formulas-and-rules'},
        {label: 'Мої зразки тестів', id: 'item4', color: 'white',icon: 'mdi mdi-ballot-outline', route: '/account/my-test-samples'},
        {label: 'Мої шаблони завдань', id: 'item5', color: 'white',icon: 'mdi mdi-calculator-variant-outline', route: '/account/my-task-templates'},
        {label: 'Мої завданя', id: 'item5', color: 'white',icon: 'mdi mdi-calendar-check', route: '/account/my-tasks'},
        {label: 'Мої оцінки', id: 'item4', color: 'white',icon: 'mdi mdi-star', route: '/account/my-grades'},
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
  }
}
</script>

<style>

</style>
