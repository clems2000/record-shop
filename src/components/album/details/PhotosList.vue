<template>
  <v-row justify="center">
    <v-col cols="auto"
    v-for="photo in photos"
    :key="photo.id">

      <PhotoItem :image="photo.url"/>

    </v-col>
  </v-row>
</template>

<script setup>
import PhotoItem from '@/components/album/details/PhotoItem.vue'

defineProps({
  photos: {
    type: Array,
    required: true
  }
})

</script>

<style scoped>

</style>