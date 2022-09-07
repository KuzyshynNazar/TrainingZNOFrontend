<template>
  <div>
    <w-toolbar vertical fixed left style="height: calc(100vh - 40px); top:40px"
               bg-color="grey-dark5"
               color="white">
      <w-tooltip right>
        <template #activator="{ on }">
          <w-icon v-on="on" md @click="openCreateNewsDialog">mdi mdi-account-multiple-plus</w-icon>
        </template>
        Створити тест
      </w-tooltip>
    </w-toolbar>
    <w-flex column fill-height style="margin-left: 36px;" class="pa1">
      <w-card no-border style="height: calc(100vh - 50px)">
        <w-input
            color="grey-dark5"
            v-model="keywordNews"
            placeholder="Пошук"
            inner-icon-left="wi-search"
            class="mb3">
        </w-input>
        <w-table
            :headers="tableHeaderNews"
            :items="news"
            fixed-headers
            :filter="keywordFilterNews(keywordNews)"
            style="width: 100%"
        >
          <template #item="{ item, classes, index  }">
            <tr :class="classes">
              <td>
                <div class="ml3">{{ index }}</div>
              </td>
              <td>{{ item.description }}</td>
              <td>
                <w-icon>{{ item.status ? 'mdi mdi-plus' : 'mdi mdi-minus' }}</w-icon>
              </td>
              <td style="text-align: right">
                <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer;"
                        @click="openShowNewsDialog(item)">
                  mdi mdi-eye
                </w-icon>
                <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer"
                        @click="openEditNewsDialog(item)">
                  mdi mdi-pencil
                </w-icon>
                <w-icon class="mr1 pa3 icon" md color="grey-dark5" style="cursor: pointer"
                        @click="openDeleteNewsDialog(item)">
                  mdi mdi-delete
                </w-icon>
              </td>
            </tr>
          </template>
        </w-table>
      </w-card>
    </w-flex>
    <!--    News Modal Start     -->
    <w-dialog title="Створити новину"
              width="90vw"
              title-class="grey-dark5--bg white"
              v-model="showCreateNewsDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showCreateNewsDialog=false"></w-button>
      <w-flex fill-height>
        <w-card class="mr3" title="Форма створення новини" style="width: 100%">
          <div class="mb4">
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsNews.title"
                     label="Заголовок новини"></w-input>
            <span v-if="errors && errors.title" style="font-size: 10px; color: red">{{ errors.title[0] }}</span>
          </div>
          <div class="mb4">
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsNews.description"
                     label="Опис новини"></w-input>
            <span v-if="errors && errors.description" style="font-size: 10px; color: red">{{
                errors.description[0]
              }}</span>
          </div>
          <div class="mb4">
            <ckeditor
                :editor="editor"
                v-model="inputsNews.text"
                :config="editorConfig"
                @focus.once="focus"
            ></ckeditor>
          </div>
          <div class="mb4">
            <w-input
                v-model="inputsNewsPhotos.photos"
                color="grey-dark5" label-color="grey-dark5"
                type="file"
                label="Завантажити фото"
                accept=".jpg, .jpeg, .png, .gif, .svg"
                multiple>
            </w-input>
          </div>
          <div class="mb4">
            <w-input
                v-model="inputsNewsDocuments.documents"
                color="grey-dark5" label-color="grey-dark5"
                type="file"
                label="Завантажити документ"
                accept=".pdf,.djvu"
                multiple>
            </w-input>
          </div>
          <div class="mb4">
            <w-input
                v-model="inputsNewsVideos.videos"
                color="grey-dark5" label-color="grey-dark5"
                type="file"
                label="Завантажити відео"
                accept=".mp4"
                multiple>
            </w-input>
          </div>
          <div class="mb4">
            <w-checkbox color="grey-dark5" label-color="grey-dark5" v-model="inputsNews.status" label="Статус">
              {{ inputsNews.status ? 'Відображати' : 'Не відображати' }}
            </w-checkbox>
          </div>
          <w-flex>
            <w-button bg-color="grey-dark5"
                      color="white" @click="create" class="mt3 grow">Створити новину
            </w-button>
          </w-flex>
        </w-card>
      </w-flex>
    </w-dialog>
    <w-dialog title="Показати новину"
              title-class="grey-dark5--bg white"
              width="95vw"
              v-model="showShowNewsDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showShowNewsDialog=false"></w-button>
      <w-flex style="height: 85vh; overflow-y: auto">

        <w-flex column class="pl2">
          <w-card title="Заголовок новини" class="mb3">
            {{ oneNews.title }}
          </w-card>

          <w-card title="Опис новини" class="mb3">
            {{ oneNews.description }}
          </w-card>

          <w-card title="Текст новини" class="mb3">
            <div v-html="oneNews.text"></div>
          </w-card>

          <w-card title="Фото новини" class="mb3" no-border content-class="pa0" title-class="bd1">
            <w-table
                :headers="tableHeaderNewsPhoto"
                :items="oneNews.photos"
                fixed-headers
                style="width: 100%"
            >
              <template #item="{ item, classes, index  }">
                <tr :class="classes">
                  <td>
                    <div class="ml3">{{ index }}</div>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>
                    <a
                        class="black"
                        :href="urlStorage + item.path"
                        target="_blank">
                      <w-image :src="urlStorage + item.path" tag="img" width="20px"></w-image>
                    </a>
                  </td>
                </tr>
              </template>
            </w-table>
          </w-card>
          <w-card title="Документи новини" class="mb3" no-border content-class="pa0" title-class="bd1">
            <w-table
                :headers="tableHeaderNewsDocument"
                :items="oneNews.documents"
                fixed-headers
                style="width: 100%"
            >
              <template #item="{ item, classes, index  }">
                <tr :class="classes">
                  <td>
                    <div class="ml3">{{ index }}</div>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>
                    <a
                        class="black"
                        :href="urlStorage + item.path"
                        target="_blank">
                      <w-icon xl>
                        mdi mdi-eye-outline
                      </w-icon>
                    </a>
                  </td>
                </tr>
              </template>
            </w-table>
          </w-card>
          <w-card title="Відео новини" no-border content-class="pa0" title-class="bd1">
            <w-table
                :headers="tableHeaderNewsVideo"
                :items="oneNews.videos"
                fixed-headers
                style="width: 100%"
            >
              <template #item="{ item, classes, index  }">
                <tr :class="classes">
                  <td>
                    <div class="ml3">{{ index }}</div>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>
                    <a
                        class="black"
                        :href="urlStorage + item.path"
                        target="_blank">
                      <w-icon xl>
                        mdi mdi-play
                      </w-icon>
                    </a>
                  </td>
                </tr>
              </template>
            </w-table>
          </w-card>

        </w-flex>

      </w-flex>

    </w-dialog>
    <w-dialog title="Видалити новину"
              width="600px"
              title-class="grey-dark5--bg white"
              v-model="showDeleteNewsDialog"
    >
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showDeleteNewsDialog=false">
      </w-button>
      Ви хочеревидалити студента <strong>{{ inputsNews.title }}</strong>?

      <w-flex align-center justify-center>
        <w-button bg-color="grey-dark5"
                  color="white"
                  width="50px"
                  @click="destroy" class="mt3 mr5">Так
        </w-button>
        <w-button bg-color="grey-dark5" width="50px"
                  color="white" @click="showDeleteNewsDialog=false" class="mt3">Ні
        </w-button>
      </w-flex>
    </w-dialog>
    <w-dialog title="Редагувати тест"
              width="80vw"
              title-class="grey-dark5--bg white"
              v-model="showEditNewsDialog">
      <w-button absolute top right bg-color="grey-dark5"
                color="white" icon="wi-cross" tile @click="showEditNewsDialog=false"></w-button>
      <w-flex fill-height style="height: 80vh; overflow-y: auto">
        <w-card class="mr3" no-border title="Форма редагування новини" style="width: 100%;">
          <div class="mb4">
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsNews.title"
                     label="Заголовок новини"></w-input>
            <span v-if="errors && errors.title" style="font-size: 10px; color: red">{{ errors.title[0] }}</span>
          </div>
          <div class="mb4">
            <w-input color="grey-dark5" label-color="grey-dark5" v-model="inputsNews.description"
                     label="Опис новини"></w-input>
            <span v-if="errors && errors.description" style="font-size: 10px; color: red">{{
                errors.description[0]
              }}</span>
          </div>
          <div class="mb4">
            <ckeditor
                :editor="editor"
                v-model="inputsNews.text"
                :config="editorConfig"
            ></ckeditor>
          </div>
          <div class="mb4 d-flex" style="flex-direction: column">
            <w-input
                v-model="inputsNewsPhotos.photos"
                color="grey-dark5" label-color="grey-dark5"
                type="file"
                label="Завантажити фото"
                accept=".jpg, .jpeg, .png, .gif, .svg"
                multiple>
            </w-input>
          </div>
          <w-flex class="mb4">
            <w-table
                :headers="tableHeaderNewsPhoto"
                :items="inputsNews.photos"
                fixed-headers
                style="width: 100%"
            >
              <template #item="{ item, classes, index  }">
                <tr :class="classes">
                  <td>
                    <div class="ml3">{{ index }}</div>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>
                    <a
                        class="black"
                        :href="urlStorage + item.path"
                        target="_blank">
                      <w-image :src="urlStorage + item.path" tag="img" width="20px"></w-image>
                    </a>
                  </td>
                  <td>
                    <w-button class="grow" color="white" bg-color="grey-dark5" @click="destroyNewsPhoto(item.id)">
                      <w-icon class="mr2" color="white">
                        mdi mdi-trash-can-outline
                      </w-icon>
                      Видалити
                    </w-button>
                  </td>
                </tr>
              </template>
            </w-table>
            <!--            <div class="xs2  pr2 pt2" v-for="(photo,index) in inputsNews.photos" :key="index">-->
            <!--              <div class="d-flex" style="flex-direction: column">-->
            <!--                <div class="d-flex align-center justify-center bd1">-->
            <!--                  <w-image :src="urlStorage + photo.path" tag="img" style="width: 100px"></w-image>-->
            <!--                </div>-->
            <!--                <w-flex>-->
            <!--                  <w-button class="grow" color="white" bg-color="grey-dark5" @click="destroyNewsPhoto(photo.id)">-->
            <!--                    <w-icon class="mr2" color="white">-->
            <!--                      mdi mdi-trash-can-outline-->
            <!--                    </w-icon>-->
            <!--                    Видалити-->
            <!--                  </w-button>-->
            <!--                </w-flex>-->
            <!--              </div>-->
            <!--            </div>-->
          </w-flex>
          <div class="mb4">
            <w-input
                v-model="inputsNewsDocuments.documents"
                color="grey-dark5" label-color="grey-dark5"
                type="file"
                label="Завантажити документ"
                accept=".pdf,.djvu"
                multiple>
            </w-input>
          </div>
          <w-flex class="mb4">
            <w-table
                :headers="tableHeaderNewsDocument"
                :items="inputsNews.documents"
                fixed-headers
                style="width: 100%"
            >
              <template #item="{ item, classes, index  }">
                <tr :class="classes">
                  <td>
                    <div class="ml3">{{ index }}</div>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>
                    <a
                        class="black"
                        :href="urlStorage + item.path"
                        target="_blank">
                      <w-icon xl>
                        mdi mdi-eye-outline
                      </w-icon>
                    </a>
                  </td>
                  <td>
                    <w-button class="grow" color="white" bg-color="grey-dark5" @click="destroyNewsDocument(item.id)">
                      <w-icon class="mr2" color="white">
                        mdi mdi-trash-can-outline
                      </w-icon>
                      Видалити
                    </w-button>
                  </td>
                </tr>
              </template>
            </w-table>
          </w-flex>
          <div class="mb4">
            <w-input
                v-model="inputsNewsVideos.videos"
                color="grey-dark5" label-color="grey-dark5"
                type="file"
                label="Завантажити відео"
                accept=".mp4"
                multiple>
            </w-input>
          </div>
          <w-flex class="mb4">
            <w-table
                :headers="tableHeaderNewsVideo"
                :items="inputsNews.videos"
                fixed-headers
                style="width: 100%"
            >
              <template #item="{ item, classes, index  }">
                <tr :class="classes">
                  <td>
                    <div class="ml3">{{ index }}</div>
                  </td>
                  <td>{{ item.name }}</td>
                  <td>
                    <a
                        class="black"
                        :href="urlStorage + item.path"
                        target="_blank">
                      <w-icon xl>
                        mdi mdi-play
                      </w-icon>
                    </a>
                  </td>
                  <td>
                    <w-button class="grow" color="white" bg-color="grey-dark5" @click="destroyNewsVideo(item.id)">
                      <w-icon class="mr2" color="white">
                        mdi mdi-trash-can-outline
                      </w-icon>
                      Видалити
                    </w-button>
                  </td>
                </tr>
              </template>
            </w-table>
          </w-flex>
          <div class="mb4">
            <w-checkbox color="grey-dark5" label-color="grey-dark5" v-model="inputsNews.status" label="Статус">
              {{ inputsNews.status ? 'Відображати' : 'Не відображати' }}
            </w-checkbox>
          </div>
          <w-flex>
            <w-button bg-color="grey-dark5"
                      color="white" @click="edit" class="mt3 grow">Редагувати новину
            </w-button>
          </w-flex>
        </w-card>
      </w-flex>
    </w-dialog>
    <!--    News Modal End     -->
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
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ClassicEditor from "ckeditor5-mathtype/build/ckeditor"

const URL_STORAGE = process.env.VUE_APP_URL_STORAGE
const BASE_URL = process.env.VUE_APP_API_URL
export default {
  name: 'NewsPage',
  data() {
    return {
      urlStorage: URL_STORAGE,
      baseUrlApi: BASE_URL,
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {},
      showProgress: false,
      /**
       * Test
       */
      showCreateNewsDialog: false,
      showEditNewsDialog: false,
      showShowNewsDialog: false,
      showDeleteNewsDialog: false,
      tableHeaderNews: [
        {label: 'id', key: 'id', width: 50},
        {label: 'Опис', key: 'description', width: '80%'},
        {label: 'Статус', key: 'status'},
      ],
      tableHeaderNewsVideo: [
        {label: 'id', key: 'id', width: 50},
        {label: 'Назва', key: 'name', width: '80%'},
        {label: 'Дія'},
      ],
      tableHeaderNewsDocument: [
        {label: 'id', key: 'id', width: 50},
        {label: 'Назва', key: 'name', width: '80%'},
        {label: 'Дія'},
      ],
      tableHeaderNewsPhoto: [
        {label: 'id', key: 'id', width: 50},
        {label: 'Назва', key: 'name', width: '80%'},
        {label: 'Дія'},
      ],
      keywordNews: '',
      keywordFilterNews: keywordNews => item => {
        const allTheColumns = `${item.id} ${item.title} ${item.text} ${item.description}`
        return new RegExp(keywordNews, 'i').test(allTheColumns)
      },
      tableItemTest: null,
      inputsNews: {
        title: null,
        description: null,
        text: 'Введіть текст новини',
        status: null,
      },
      inputsNewsPhotos: {
        newsId: null,
        photos: null
      },
      inputsNewsDocuments: {
        newsId: null,
        documents: null
      },
      inputsNewsVideos: {
        newsId: null,
        videos: null
      }
    }
  },
  created() {

    this.showProgress = true
    this.getAll().then(() => {
      this.showProgress = false
    })
  },
  computed: {
    ...mapGetters({
      news: 'news/news',
      oneNews: 'news/oneNews',
      errors: 'news/errors',
      newsPhotos: 'newsPhotos/newsPhotos',
      newsDocuments: 'newsDocuments/newsDocuments',
      newsVideos: 'newsVideos/newsVideos',
    }),
  },
  methods: {
    ...mapActions({
      getAll: 'news/getAll',
      store: 'news/store',
      show: 'news/show',
      update: 'news/update',
      delete: 'news/delete',
      storeNewsPhotos: 'newsPhotos/store',
      deleteNewsPhoto: 'newsPhotos/delete',
      storeNewsDocuments: 'newsDocuments/store',
      deleteNewsDocument: 'newsDocuments/delete',
      storeNewsVideos: 'newsVideos/store',
      deleteNewsVideo: 'newsVideos/delete',
    }),
    /**
     * Test
     */
    openCreateNewsDialog() {
      this.inputsNews = Object.assign({}, {})
      this.inputsNews.text = 'Введіть текст новини'
      this.showCreateNewsDialog = true
    },
    openShowNewsDialog(item) {
      this.showProgress = true
      this.show(item.id).then(() => {
        this.showProgress = false
        this.showShowNewsDialog = true
      })

    },
    openEditNewsDialog(item) {
      this.inputsNews = Object.assign({}, item)
      this.showEditNewsDialog = true
    },
    openDeleteNewsDialog(item) {
      this.inputsNews = Object.assign({}, item)
      this.showDeleteNewsDialog = true
    },
    create() {
      this.inputsNews.status ? this.inputsNews.status = 1 : this.inputsNews.status = 0
      this.store(this.inputsNews).then(() => {
        if (this.inputsNewsPhotos.photos !== null) {
          this.inputsNewsPhotos.newsId = this.oneNews.id
          this.storeNewsPhotos(this.inputsNewsPhotos).then(() => {
            let index = this.news.findIndex((c) => c.id === this.oneNews.id);
            if (index > -1) {
              this.news[index].photos = this.newsPhotos
            }
            this.inputsNewsPhotos.newsId = null
            this.inputsNewsPhotos.photos = null
          })
        }
        if (this.inputsNewsDocuments.documents !== null) {
          this.inputsNewsDocuments.newsId = this.oneNews.id
          this.storeNewsDocuments(this.inputsNewsDocuments).then(() => {
            let index = this.news.findIndex((c) => c.id === this.oneNews.id);
            if (index > -1) {
              this.news[index].documents = this.newsDocuments
            }
            this.inputsNewsDocuments.newsId = null
            this.inputsNewsDocuments.documents = null

          })
        }
        if (this.inputsNewsVideos.videos !== null) {
          this.inputsNewsVideos.newsId = this.oneNews.id
          this.storeNewsVideos(this.inputsNewsVideos).then(() => {
            let index = this.news.findIndex((c) => c.id === this.oneNews.id);
            if (index > -1) {
              this.news[index].videos = this.newsVideos
            }
            this.inputsNewsVideos.newsId = null
            this.inputsNewsVideos.documents = null

          })
        }
        this.notify('Новину створено.')
        this.showCreateNewsDialog = false
      })
    },
    edit() {
      this.inputsNews.status ? this.inputsNews.status = 1 : this.inputsNews.status = 0
      this.update(this.inputsNews).then(() => {
        if (this.inputsNewsPhotos.photos !== null) {
          this.inputsNewsPhotos.newsId = this.inputsNews.id
          this.storeNewsPhotos(this.inputsNewsPhotos).then(() => {
            let index = this.news.findIndex((c) => c.id === this.inputsNews.id);
            if (index > -1) {
              this.news[index].photos = this.newsPhotos
            }
            this.inputsNewsPhotos.newsId = null
            this.inputsNewsPhotos.photos = null
          })
        }
        if (this.inputsNewsDocuments.documents !== null) {
          this.inputsNewsDocuments.newsId = this.inputsNews.id
          this.storeNewsDocuments(this.inputsNewsDocuments).then(() => {
            let index = this.news.findIndex((c) => c.id === this.inputsNews.id);
            if (index > -1) {
              this.news[index].documents = this.newsDocuments
            }
            this.inputsNewsDocuments.newsId = null
            this.inputsNewsDocuments.documents = null
          })
        }
        if (this.inputsNewsVideos.videos !== null) {
          this.inputsNewsVideos.newsId = this.inputsNews.id
          this.storeNewsVideos(this.inputsNewsVideos).then(() => {
            let index = this.news.findIndex((c) => c.id === this.inputsNews.id);
            if (index > -1) {
              this.news[index].videos = this.newsVideos
            }
            this.inputsNewsVideos.newsId = null
            this.inputsNewsVideos.documents = null
          })
        }
        this.showEditNewsDialog = false
        this.notify('Новину оновлено.')
      })
    },
    destroy() {
      this.delete(this.inputsNews.id).then(() => {
        this.notify('Тест видалено.')
        this.showDeleteNewsDialog = false
      })
    },
    destroyNewsPhoto(id) {
      this.deleteNewsPhoto(id).then(() => {
        let index = this.inputsNews.photos.findIndex((c) => c.id === id);
        if (index > -1) {
          this.inputsNews.photos.splice(index, 1);
        }
      })
    },
    destroyNewsVideo(id) {
      this.deleteNewsVideo(id).then(() => {
        let index = this.inputsNews.videos.findIndex((c) => c.id === id);
        if (index > -1) {
          this.inputsNews.videos.splice(index, 1);
        }
      })
    },
    destroyNewsDocument(id) {
      this.deleteNewsDocument(id).then(() => {
        let index = this.inputsNews.documents.findIndex((c) => c.id === id);
        if (index > -1) {
          this.inputsNews.documents.splice(index, 1);
        }
      })
    },
    /**
     * Other
     * @param message
     */
    notify(message) {
      this.$waveui.notify({
        message: message,
        timeout: 2000,
        success: true
      })
    },
    focus() {
      this.inputsNews.text = ''
    },
  }
}
</script>

<style>
.ML__keystroke-caption {
  padding: 0 !important;
}

.w-list__item {
  width: 100% !important;
  cursor: pointer;
}

.tree-node:hover {
  background-color: #dadada;
}

.icon:hover {
  background-color: #dadada;
}

.icon {
  line-height: 0 !important;
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
