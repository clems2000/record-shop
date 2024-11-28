<template>
    <v-btn @click="rerouteToAlbums"
           :title="label"
           prepend-icon="mdi-arrow-left"
           data-test="to-albums-button"
           color="blue">{{ t('buttons.back') }}</v-btn>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const label = 'To Albums'

const router = useRouter()

const rerouteToAlbums = () => {
  router.push({ name: 'albums' })
}

//see other implementation in BackToAlbumsButton2.vue and another way of testing
</script>

<style scoped>

</style>