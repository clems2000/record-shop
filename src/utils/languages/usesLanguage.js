import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/userStore.js'

export default function noOne() {
  const userStore = useUserStore()
  const { locale } = useI18n()
  const selectedLanguage = ref(userStore.currentLanguage)
  const changeLocale = (lang) => {
    locale.value = lang
    selectedLanguage.value = lang

    userStore.changeLanguage(lang)
  }

  return { selectedLanguage, changeLocale, languages: userStore.languages }
}