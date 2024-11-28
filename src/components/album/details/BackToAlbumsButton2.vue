<template>
  <v-btn :to="{ name: 'albums'}"
         :title="address"
         prepend-icon="mdi-arrow-left"
         data-test="to-albums-button2"
         color="blue">{{ t('buttons.back') }}</v-btn>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const address = 'To Albums'

</script>

<style scoped>
</style>

