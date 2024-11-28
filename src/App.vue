<template>
  <v-app>
    <AppHeader/>
    <BaseLayout>
      <router-view/>
    </BaseLayout>
  </v-app>
</template>

<script setup>
import AppHeader from '@/components/layout/AppHeader.vue'
import BaseLayout from '@/components/layout/BaseLayout.vue'
import { useUserStore } from '@/stores/userStore.js'
import { onMounted } from 'vue'
import { useTheme } from 'vuetify'

const userStore = useUserStore()
const theme = useTheme()

onMounted(() => {
  theme.global.name.value = userStore.getCurrentTheme ? 'dark' : 'light'
})
</script>