<template>
  <AlbumInformationHeader :id="id"/>
  <AlbumDetails :id='id' />
</template>

<script setup>
import AlbumDetails from '@/components/album/details/AlbumDetails.vue'
  import AlbumInformationHeader from '@/components/album/details/AlbumInformationHeader.vue'

defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>

<style scoped>

</style>