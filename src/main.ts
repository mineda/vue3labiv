import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';

import App from './App.vue'
import router from './router'

import './assets/main.css'

axios.defaults.baseURL="https://8080-mineda-springboot3labiv-hkgigshkty9.ws-us106.gitpod.io/"

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
