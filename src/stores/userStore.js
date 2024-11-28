import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'


export const useUserStore = defineStore('userDetails', {
  state: () => {
    return {
      currentLanguage: useLocalStorage('language', 'en'),
      languages: [{title: "English", id: 'en' }, { title: "German", id: 'de'}],
      currentTheme: useLocalStorage('darkMode', false)
    }
  },
  getters: {
    getCurrentTheme(state) {
      return state.currentTheme
    }
  },
  actions: {
    changeLanguage(newLanguageId) {
      const languageExists = this.languages.find(language => language.id === newLanguageId);
      if(languageExists) {
        this.currentLanguage = newLanguageId
      }
    },
    changeTheme(newTheme) {
      this.currentTheme = newTheme
    }
  }
});