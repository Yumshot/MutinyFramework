import './assets/main.css'

import { createApp } from 'vue'
import Qui from '@qvant/qui-max'
import '@qvant/qui-max/styles'
import App from './App.vue'

const app = createApp(App)
app.use(Qui)

app.mount('#app')
