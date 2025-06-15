import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'

import en from './location/en'
import pt from './location/pt'
import App from './App.vue'
import './style.css'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'pt',
  messages: {
    en,
    pt
  }
})
const pinia = createPinia()

createApp(App)
  .use(i18n)
  .use(pinia)
  .mount('#app')
