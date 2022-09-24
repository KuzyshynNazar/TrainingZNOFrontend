<template>
  <w-toolbar vertical absolute left style="height: calc(100vh - 40px); top:40px"
             bg-color="grey-dark5"
             color="white">
    <w-tooltip right>
      <template #activator="{ on }">
        <w-icon class="mb2" v-on="on" md @click="openCreateDialog">mdi mdi-account-multiple-plus</w-icon>
      </template>
      Створити батьківську категорію
    </w-tooltip>
    <w-tooltip right>
      <template #activator="{ on }">
        <w-icon v-on="on" md @click="openCategoryAndFilesDialog">mdi mdi-text-box-outline</w-icon>
      </template>
      Категорії і тести
    </w-tooltip>
  </w-toolbar>

  <w-flex style="margin-left: 40px;" fill-height>
    <w-card class="grow" no-border style=" height: calc(100vh - 40px); overflow: auto;">
      <div style="width:100%">
        <Tree :value="treeCategories">
          <template v-slot="{node,  path, tree}">
            <w-flex justify-space-between align-center class="hover-tree">
              <w-flex align-center>
                <div class="mr2">
                  <w-button bg-color="grey-dark5"
                            color="white" v-if="node.children.length!==0" @click="tree.toggleFold(node, path)" tile>
                    <w-icon>
                      {{ node.$folded ? 'mdi mdi-plus' : 'mdi mdi-minus' }}
                    </w-icon>
                  </w-button>
                  <w-button v-else tile bg-color="grey-dark5"
                            color="white">
                    <w-icon>

                    </w-icon>
                  </w-button>

                </div>
                <div class="mr2">
                  {{ node.text }}
                </div>
              </w-flex>
              <div>
                <w-button bg-color="grey-dark5"
                          color="white" @click="openCreateChildDialog(node)" class="mr2">
                  <w-icon>
                    mdi mdi-plus
                  </w-icon>
                </w-button>
                <w-button bg-color="grey-dark5"
                          color="white" @click="openEditDialog(node)" class="mr2">
                  <w-icon>
                    mdi mdi-pencil
                  </w-icon>
                </w-button>
                <w-button bg-color="grey-dark5"
                          color="white" @click="openDeleteDialog(node)">
                  <w-icon>
                    mdi mdi-delete
                  </w-icon>
                </w-button>
              </div>
            </w-flex>
          </template>
        </Tree>
      </div>
    </w-card>
  </w-flex>
  <w-dialog title="Створити Батьківську Категорію"
            width="800px"
            title-class="grey-dark5--bg white"
            v-model="showCreateDialog">
    <w-button absolute top right bg-color="grey-dark5"
              color="white" icon="wi-cross" tile @click="showCreateDialog=false"></w-button>
    <div class="mb4">
      <w-input v-model="inputsCategory.text"  color="grey-dark5" label-color="grey-dark5" label="Name"></w-input>
      <span v-if="errors && errors.text" style="font-size: 10px; color: red">{{ errors.text[0] }}</span>
    </div>
    <div class="mb4">
      <w-input v-model="inputsCategory.slug"  color="grey-dark5" label-color="grey-dark5" label="slug"></w-input>
      <span v-if="errors && errors.slug" style="font-size: 10px; color: red">{{ errors.slug[0] }}</span>
    </div>
    <w-flex>
      <w-button @click="storeCategory" bg-color="grey-dark5"
                color="white" class="mt3 grow">Створити студента</w-button>
    </w-flex>
  </w-dialog>
  <w-dialog title="Створити категорію"
            width="800px"
            title-class="grey-dark5--bg white"
            v-model="showCreateChildDialog">
    <w-button absolute top right bg-color="grey-dark5"
              color="white" icon="wi-cross" tile @click="showCreateChildDialog=false"></w-button>
    <div class="mb4">
      <w-input v-model="inputsCategory.text" color="grey-dark5" label-color="grey-dark5" label="Name"></w-input>
      <span v-if="errors && errors.text" style="font-size: 10px; color: red">{{ errors.text[0] }}</span>
    </div>
    <div class="mb4">
      <w-input v-model="inputsCategory.slug" color="grey-dark5" label-color="grey-dark5" label="slug"></w-input>
      <span v-if="errors && errors.slug" style="font-size: 10px; color: red">{{ errors.slug[0] }}</span>
    </div>

    <div class="mb4">
      <w-input v-model="inputsCategoryParent" color="grey-dark5" label-color="grey-dark5" disabled label="батьківська категорія"></w-input>
      <span v-if="errors && errors.parent_id" style="font-size: 10px; color: red">{{ errors.parent_id[0] }}</span>
    </div>

    <w-flex>
      <w-button @click="storeChildCategory" bg-color="grey-dark5"
                color="white" class="mt3 grow">Створити студента</w-button>
    </w-flex>
  </w-dialog>
  <w-dialog title="Редагувати категорію"
            width="1200px"
            title-class="grey-dark5--bg white"
            v-model="showEditDialog">
    <w-button absolute top right bg-color="grey-dark5"
              color="white" icon="wi-cross" tile @click="showEditDialog=false"></w-button>
    <w-flex fill-height>
      <w-card class="grow mr3" title="Відображення дерева категорії" style="height: 500px; width: 60%">
        <div style="width:100%; height: 430px; overflow: auto;">
          <Tree :value="treeCategories">
            <template v-slot="{node,  path, tree}">
              <w-flex justify-space-between align-center>
                <w-flex align-center>
                  <div class="mr2">
                    <w-button v-if="node.children.length!==0"  bg-color="grey-dark5"
                              color="white" @click="tree.toggleFold(node, path)" tile class="mr2">
                      <w-icon>
                        {{ node.$folded ? 'mdi mdi-plus' : 'mdi mdi-minus' }}
                      </w-icon>
                    </w-button>

                    <w-button v-else tile class="mr2" bg-color="grey-dark5"
                              color="white">
                      <w-icon>

                      </w-icon>
                    </w-button>
                    <w-radio :disabled="node.parent_id===inputsCategory.id" class="mr2"  bg-color="grey-dark5"
                             color="white" name="name"
                             @change="parentCategory(node)"></w-radio>
                  </div>
                  <div class="mr2">
                    {{ node.text }}
                  </div>
                </w-flex>
                <div class="mr2">
                  <w-button @click="openCreateChildDialog(node)" bg-color="grey-dark5"
                            color="white" class="mr2">
                    <w-icon>
                      mdi mdi-plus
                    </w-icon>
                  </w-button>
                  <w-button @click="openEditDialog(node)" bg-color="grey-dark5"
                            color="white" class="mr2">
                    <w-icon>
                      mdi mdi-pencil
                    </w-icon>
                  </w-button>
                  <w-button @click="openDeleteDialog(node)" bg-color="grey-dark5"
                            color="white" class="mr2">
                    <w-icon>
                      mdi mdi-delete
                    </w-icon>
                  </w-button>
                </div>
              </w-flex>
            </template>
          </Tree>
        </div>
      </w-card>
      <w-card title="Форма редагування" style="width: 40%">
        <div class="mb4" style="width: 100%">
          <w-input v-model="inputsCategory.text" color="grey-dark5" label-color="grey-dark5" label="Name"></w-input>
          <span v-if="errors && errors.text" style="font-size: 10px; color: red">{{ errors.text[0] }}</span>
        </div>
        <div class="mb4" style="width: 100%">
          <w-input v-model="inputsCategory.slug" color="grey-dark5" label-color="grey-dark5" label="slug"></w-input>
          <span v-if="errors && errors.slug" style="font-size: 10px; color: red">{{ errors.slug[0] }}</span>
        </div>
        <w-flex>
          <w-button @click="editCategory" class="mt3 grow" bg-color="grey-dark5"
                    color="white">Створити студента</w-button>
        </w-flex>
      </w-card>
    </w-flex>
  </w-dialog>
  <w-dialog title="Видалити категорію"
            width="400px"
            title-class="grey-dark5--bg white"
            v-model="showDeleteDialog">
    <w-button absolute top right bg-color="grey-dark5"
              color="white" icon="wi-cross" tile @click="showDeleteDialog=false">
    </w-button>
    Ви хочеревидалити студента <strong>{{ inputsCategory.text }}</strong>?

    <w-flex>
      <w-button @click="deleteCategory" bg-color="grey-dark5"
                color="white" class="mt3 mr5 grow">Так</w-button>
      <w-button @click="showDeleteDialog=false" bg-color="grey-dark5"
                color="white" class="mt3 grow">Ні</w-button>
    </w-flex>
  </w-dialog>
  <w-dialog title="Показати категорії і тести"
            fullscreen width="90vw"
            title-class="grey-dark5--bg white"
            v-model="showCategoryAndFilesDialog">
    <w-button absolute top right bg-color="grey-dark5"
              color="white" icon="wi-cross" tile @click="showCategoryAndFilesDialog=false"></w-button>
    <w-flex fill-height>
      <w-card class="grow" no-border content-class="pa0" style="height: calc(100vh - 65px); overflow: auto;">
        <div>
          <Tree :value="categoryAndTests">
            <template v-slot="{node,  path, tree}">
              <w-flex justify-space-between align-center>
                <w-flex align-center>
                  <div class="mr2">
                      <w-icon xl v-if="node.children && node.children.length!==0" @click="tree.toggleFold(node, path)" class="mr2">
                        {{ node.$folded ? 'mdi mdi-folder-plus' : 'mdi mdi-folder-minus' }}
                      </w-icon>
                      <w-icon xl v-else-if="node.children && node.children.length===0"  class="mr2">
                            mdi mdi-folder-outline
                      </w-icon>
                    <w-icon xl v-else class="mr2">
                      mdi mdi-file
                    </w-icon>
                  </div>
                  <div class="mr2">
                    {{ node.text }}
                  </div>
                </w-flex>
              </w-flex>
            </template>
          </Tree>
        </div>
      </w-card>
    </w-flex>
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
import 'he-tree-vue/dist/he-tree-vue.css'
import {Tree, Fold} from 'he-tree-vue'
import {mapActions, mapGetters} from "vuex";

export default {
  components: {Tree: Tree.mixPlugins([Fold]),},
  data: function () {
    return {
      showProgress: false,
      showCreateDialog: false,
      showCategoryAndFilesDialog: false,
      showCreateChildDialog: false,
      showEditDialog: false,
      showDeleteDialog: false,
      isParentCategory: null,
      inputsCategory: {
        text: null,
        slug: null,
        parent_id: null,
        status: null,
      },
      inputsCategoryParent: null
    };
  },
  created() {
    this.showProgress=true
    this.getAll().then(()=>{this.showProgress=false})
  },
  computed: {
    ...mapGetters({
      treeCategories: 'treeCategories/treeCategories',
      categoryAndTests: 'treeCategories/categoryAndTests',
      errors: 'treeCategories/errors',
    }),
  },
  methods: {
    ...mapActions({
      getAll: 'treeCategories/getAll',
      getAllCategoryAndTests: 'treeCategories/getAllCategoryAndTests',
      store: 'treeCategories/store',
      update: 'treeCategories/update',
      delete: 'treeCategories/delete',
    }),
    openCreateDialog() {
      this.inputsCategory = Object.assign({}, [])
      this.inputsCategory.parent_id = null
      this.showCreateDialog = true
    },
    openCreateChildDialog(node) {
      console.log(node)
      this.inputsCategory = Object.assign({}, [])
      this.inputsCategory.parent_id = node.id
      this.inputsCategoryParent = node.parentName
      this.showCreateChildDialog = true
    },
    openEditDialog(node) {
      this.inputsCategory = Object.assign({}, node)
      this.showEditDialog = true
    },
    openDeleteDialog(node) {
      this.inputsCategory = Object.assign({}, node)
      console.log(this.inputsCategory.id)
      this.showDeleteDialog = true
    },
    storeCategory() {
      this.inputsCategory.status ? this.inputsCategory.status = 1 : this.inputsCategory.status = 0
      this.store(this.inputsCategory).then(() => {
        if (this.errors.length === 0)
          this.showCreateDialog = false
      })
    },
    editCategory() {
      this.inputsCategory.status ? this.inputsCategory.status = 1 : this.inputsCategory.status = 0
      this.inputsCategory.parent_id = this.isParentCategory
      if (this.isParentCategory === null) {
        this.inputsCategory.parent_id === null
      }
      this.update(this.inputsCategory).then(() => {
        if (this.errors.length === 0)
          this.getAll()
        this.showEditDialog = false
      })
    },
    deleteCategory() {
      this.delete(this.inputsCategory.id).then(() => {
        if (this.errors.length === 0)
          this.getAll()
        this.showDeleteDialog = false
      })
    },
    storeChildCategory() {
      this.inputsCategory.status ? this.inputsCategory.status = 1 : this.inputsCategory.status = 0
      this.store(this.inputsCategory).then(() => {
        if (this.errors.length === 0)
          this.getAll()
        this.showCreateChildDialog = false
      })
    },
    parentCategory(node) {
      this.isParentCategory = node.id
    },
    openCategoryAndFilesDialog() {
      this.showProgress=true
      this.getAllCategoryAndTests().then(()=>{this.showProgress=false})
      this.showCategoryAndFilesDialog = true
    }
  },
};
</script>
<style>
.tree-level {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.tree-node:hover {
  background-color: #dadada;
}
</style>
