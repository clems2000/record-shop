<template>
  <v-row>
    <v-col cols="12" sm="6" md="4" lg="3"
           v-for="album in albums"
           :key="album.id">

      <AlbumItem :id="album.id" :title="album.title"
                 @sendDeleteIdToAlbumsList="sendDeleteIdToAlbumsList"/>

    </v-col>
  </v-row>
</template>

<script setup>
import AlbumItem from '@/components/album/listing/AlbumItem.vue'

defineProps({
  albums: {
    type: Array,
    required: true
  }
})

const emit = defineEmits([
  'reloadPageAndDeleteAlbum'
])

function sendDeleteIdToAlbumsList(id) {
  emit('reloadPageAndDeleteAlbum', id)
}
</script>

<style scoped>
</style>

