import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
import './axios'
import store from './store'
import router from './router'
import App from './App.vue'

const pinia = createPinia();
createApp(App)
    .use(store)
    .use(pinia)
    .use(router)
    .mount('#app')

