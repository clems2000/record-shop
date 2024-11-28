<template>
    <v-btn @click="rerouteToAlbums"
           :title="label"
           prepend-icon="mdi-arrow-left"
           data-test="to-albums-button"
           color="blue">Back</v-btn>
</template>

<script setup>
  import { useRouter } from 'vue-router'

  const label = 'To Albums'

  const router = useRouter()

  const rerouteToAlbums = () => {
    router.push({ name: 'albums' })
  }

  //see other implementation in BackToAlbumsButton2.vue and another way of testing
</script>

<style scoped>

</style>