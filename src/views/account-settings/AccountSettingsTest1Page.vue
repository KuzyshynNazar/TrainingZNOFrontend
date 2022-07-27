<template>

<div>Налаштування особистого кабінету сторінка тест1</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'HelloWorld',
  data() {
    return {
      openDrawer1:true
    }
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
