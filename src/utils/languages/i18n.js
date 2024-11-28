import { createI18n } from 'vue-i18n'
import en from './english.js'
import de from './german.js'

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: {
    en,
    de,
    fallbackLocale: 'en'
  }
})