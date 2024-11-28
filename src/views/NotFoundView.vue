<template>
  <h1>{{ $t('pageNotFound.title') }}</h1>
  <p>{{ t('pageNotFound.message') }}</p>
  <v-btn data-test="back-to-albums-button" color="primary" :to="{ name: 'albums' }">{{ t('buttons.backToAlbums') }}</v-btn>
</template>



<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>


<style scoped>
</style>