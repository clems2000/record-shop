<template>
  <v-toolbar>
    <v-toolbar-title>
      <router-link data-test="record-shop-page-link" to="/" class="record-shop">{{ t('recordShop') }}</router-link>
    </v-toolbar-title>

    <v-card class="switch-theme-card" @clicl="handleClickOutside" variant="flat">
      <v-switch
        v-model="userStore.currentTheme"
        class="text-yellow-darken-4 no-color custom-switch-background"
        id="theme-toggle"
        data-test="theme-switch-toggle"
        true-icon="mdi-weather-night"
        false-icon="mdi-white-balance-sunny"
        hide-details
        @click="toggleTheme"
        @click.prevent="(e) => e.stopPropagation()"
        :inset="true" cover
      >
      </v-switch>
    </v-card>

    <v-select
      data-test="language-tab"
      :items="userStore.languages"
      item-text="title"
      item-value="id"
      label="Language"
      class="language-tab"
      v-model="userStore.currentLanguage"
      @change="langId => changeLanguage(langId)"
      outlined
      density="compact">
    </v-select>
  </v-toolbar>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/userStore.js'
import { useTheme } from 'vuetify'

const theme = useTheme()

const { t, locale } = useI18n()

const userStore = useUserStore()

function changeLanguage (langId) {
  userStore.changeLanguage(langId)
  locale.value = userStore.currentLanguage
}

const handleClickOutside = (event) => {
  event.stopPropagation()
}

function toggleTheme() {
  userStore.changeTheme(!userStore.getCurrentTheme);
  theme.global.name.value = userStore.getCurrentTheme ? 'dark' : 'light'
}

watch(() => userStore.currentLanguage, (newLangID) => {
  locale.value = newLangID
})

watch(() => userStore.getCurrentTheme, (newTheme) => {
  theme.global.name.value = newTheme ? 'dark' : 'light'
})

onMounted(() => {
  locale.value = userStore.currentLanguage
  theme.global.name.value = userStore.getCurrentTheme ? 'dark' : 'light'
})

</script>

<style scoped>
router-link {
  text-decoration: none;
  color: inherit;
}

v-toolbar {
  display: flex;
  align-items: center;
}

.record-shop {
  margin-right: auto;
}

.language-tab {
  margin-top: 25px;
  margin-right: 16px;
  max-width: 200px;
}

.switch-theme-card {
  background-color: transparent;
  box-shadow: none;
  margin-right: 16px;
}
#theme-toggle {
  margin: 0;
  padding: 0;
}
</style>