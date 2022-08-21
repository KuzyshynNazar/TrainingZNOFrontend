<template>
<div>Books</div>


</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'HelloWorld',
  data() {
    return {

    }
  },
  created() {


  },
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
p{
  text-align: justify;
  line-height: 1.6;
  margin-bottom: 10px;
  text-indent: 1.5em;
  margin-top: 0
}
p + p {

}
.active-class {
  background-color: #dadada;
}

.news-card {
  /*box-shadow: 0.3rem 0.3rem 0.6rem #212121, -0.2rem -0.2rem 0.5rem #757575 !important;*/

  transform: scale(1);
  /*background-color: #424242 !important;*/
  -webkit-transition: .2s ease-in-out;
  transition: .2s ease-in-out;
  border-radius: 8px !important;
  border: 4px solid rgba(255, 255, 255, 0) !important;
  cursor: pointer;
}

.news-card:hover {
  /*box-shadow: inset 0.2rem 0.2rem 0.5rem #212121, inset -0.2rem -0.2rem 0.5rem #757575 !important;*/
  /*transform: scale(1.02);*/
  background-color: #dadada;
  /*background-color: #212121 !important;*/
  /*border-color: #212121 !important;*/
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
