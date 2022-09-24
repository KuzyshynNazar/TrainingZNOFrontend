<template>
  <w-flex align-center justify-center fill-height style="width: 100vw">
    <w-grid
        style="width: 75vw"
        :columns="{ xs: 1, sm: 1, md:2, lg: 3, xl: 3 }"
        gap="2"

    >
      <w-flex fill-height style="width: 100%">
        <w-card title="Змінити фото" style="width: 100%;" color="blue-grey-light5" bg-color="blue-grey-dark3" shadow
                content-class="blue-grey-light3 " no-border>
          <w-flex column align-center justify-start fill-height style="width: 100%">
            <div style="width: 100%"><w-input color="blue-grey-dark3" bg-color="blue-grey-light5" label-color="blue-grey-dark3" class="mt0 mb3" type="file" >Завантажити фото</w-input></div>
            <div><w-icon size="100px">mdi mdi-account-circle</w-icon></div>
          </w-flex>
        </w-card>

      </w-flex>
      <w-flex fill-height style="width: 100%">
        <w-card title="Змінити нікнейм" style="width: 100%;" color="blue-grey-light5" bg-color="blue-grey-dark3" shadow
                content-class="blue-grey-light3" no-border>
          <w-flex column align-center justify-start fill-height style="width: 100%">
            <div style="width: 100%"><w-input color="blue-grey-dark3" bg-color="blue-grey-light5" label-color="blue-grey-dark3" v-model="student.nick_name" placeholder="Завантажити фото"></w-input></div>
          </w-flex>
        </w-card>
      </w-flex>
      <w-flex fill-height style="width: 100%" >
        <w-card title="Змінити пароль" style="width: 100%;" color="blue-grey-light5" bg-color="blue-grey-dark3" shadow
                content-class="blue-grey-light3" no-border>
          <w-flex column align-center justify-start fill-height style="width: 100%">
            <div style="width: 100%"><w-input color="blue-grey-dark3" bg-color="blue-grey-light5" label-color="blue-grey-dark3" class="mb3" type="password"  placeholder="Введіть новий пароль"></w-input></div>
            <div style="width: 100%"><w-input color="blue-grey-dark3" bg-color="blue-grey-light5" label-color="blue-grey-dark3" type="password"  placeholder="Повторіть пароль"></w-input></div>
          </w-flex>
        </w-card>
      </w-flex>

    </w-grid>
  </w-flex>
  <!--  <w-drawer-->
  <!--      v-model="openDrawer1"-->
  <!--      width="250px"-->
  <!--      absolute-->
  <!--      bg-color="grey-dark5"-->
  <!--      left-->
  <!--      no-overlay>-->
  <!--    <w-flex column>-->
  <!--      <w-list style="margin-top: 40px; width: 100%; display: inline-grid" :items="items" nav hover item-class="ma0">-->
  <!--        <template #item="{ item }">-->
  <!--          <div>{{ item.label }}</div>-->
  <!--          <div class="spacer"></div>-->
  <!--          <w-icon md>{{ item.icon }}</w-icon>-->

  <!--        </template>-->
  <!--      </w-list>-->
  <!--    </w-flex>-->

  <!--  </w-drawer>-->
  <!--  <div style="margin-left: 250px" class="pa3">-->
  <!--    <router-view></router-view>-->
  <!--  </div>-->
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'HelloWorld',
  data() {
    return {
      openDrawer1: true,
      items: [
        {label: 'Item 1', id: 'item1', color: 'amber', icon: 'mdi mdi-star', route: '/settings/test1'},
        {label: 'Item 2', id: 'item2', color: 'warning', icon: 'mdi mdi-star', route: '/settings/test2'},
      ],
      inputsStudentPassword: {
        password: null,
        password_confirmation: null,
      },
      inputsStudent: {
        nick_name: null,
      },
    }
  },
  created() {
  },
  computed: {
    ...mapGetters({
      testStudent: 'testStudents/testStudent',
      student:'auth/user'
    }),


  },
  methods: {
    ...mapActions({}),
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
