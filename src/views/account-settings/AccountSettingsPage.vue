<template>
  <w-drawer
      v-model="openDrawer1"
      width="250px"
      absolute
      bg-color="grey-dark5"
      left
      no-overlay>
    <w-flex column>
      <w-list  style="margin-top: 40px; width: 100%; display: inline-grid" :items="items" nav hover item-class="ma0">
        <template #item="{ item }" >
          <div>{{ item.label }}</div>
          <div class="spacer"></div>
          <w-icon md>{{ item.icon }}</w-icon>
        </template>
      </w-list>
    </w-flex>

  </w-drawer>
  <div style="margin-left: 250px" class="pa3">
    <router-view></router-view>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'HelloWorld',
  data() {
    return {      openDrawer1: true,
      items: [
        {label: 'Item 1', id: 'item1', color: 'amber',icon: 'mdi mdi-star', route: '/account-settings/test1'},
        {label: 'Item 2', id: 'item2', color: 'warning',icon: 'mdi mdi-star', route: '/account-settings/test2'},
      ]  }
  },
  created() { },
  computed: {
    ...mapGetters({
    }),


  },
  methods: {
    ...mapActions({
    }),
  }
}
</script>

<style>

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
