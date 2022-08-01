import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store/index'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
import '@mdi/font/css/materialdesignicons.min.css'
import CKEditor from '@ckeditor/ckeditor5-vue';
// import VueMathjax from 'vue-mathjax-next';
const app = createApp(App)
new WaveUI(app, {
    breakpoints: {
        xs: 768,
        sm: 900,
        md: 1200,
        lg: 1700
    },
})
// console.log(CKEditor)

app.use(CKEditor)
// app.use(VueMathjax)
app.use(router)
app.use(store)
app.mount('#app')
