<template>
  <w-drawer
      v-model="openDrawer1"
      width="250px"
      absolute
      bg-color="grey-dark5"
      left
      no-overlay>
    <w-flex column>
      <w-list  style="margin-top: 50px; display: inline-grid" :items="items" nav hover>
        <template #item="{ item }" >
          <div>{{ item.label }}</div>
          <div class="spacer"></div>
          <w-icon md>{{ item.icon }}</w-icon>

        </template>
      </w-list>
    </w-flex>

  </w-drawer>
  <main class="grow">
<!--  <div style="margin-left: 250px; width: 100%"  >-->

    <router-view></router-view>
<!--  </div>-->
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
        {label: 'Ваші тести', id: 'item1', color: 'white',icon: 'mdi mdi-ab-testing', route: '/account/tests'},
        {label: 'Мої книги', id: 'item2', color: 'white',icon: 'mdi mdi-book-open-page-variant', route: '/account/my-books'},
        {label: 'Мої оцінки', id: 'item3', color: 'white',icon: 'mdi mdi-star', route: '/account/my-grades'},
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
