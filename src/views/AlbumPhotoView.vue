<template>
  <AlbumInformationView :id="id"/>
  <AlbumPhotos :id="id"/>

</template>

<script setup>
import AlbumInformationView from '@/components/album/details/AlbumInformationHeader.vue'
import AlbumPhotos from '@/components/album/details/AlbumPhotos.vue'

defineProps({
  id: String
})
</script>

<style scoped>

</style>