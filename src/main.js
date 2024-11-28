import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from '@/utils/languages/i18n.js'

import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')