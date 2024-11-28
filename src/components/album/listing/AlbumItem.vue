<template>
  <v-card :to="{ name: 'albumDetails', params: { id: id }}"
          data-test="v-card-to-detail-page">
    <v-row>
      <v-col class="text-start align-self-start">
        <v-card-title>{{ id }} - {{ title }}</v-card-title>
      </v-col>
    </v-row>

    <v-row>
      <v-col class="text-end align-self-end"
             id="action-buttons">
        <v-btn :to="{ name: 'albumDetails', params: { id: id }}"
               class="edit-button"
               color="primary"
               icon="mdi-pencil-outline"
               data-test="edit-album-button"></v-btn>
        <v-btn @click.prevent=""
               @click="dialogWindowActive = !dialogWindowActive"
               color="error"
               icon="mdi-delete-outline"
               data-test="delete-button"></v-btn>
      </v-col>
    </v-row>
  </v-card>

  <CommonDialog v-model="dialogWindowActive">
   <DeleteDialogWindow :title="title"
                       :id="id"
                       @closeDialog="closeDialog"
                       @closeDialogWithDelete="closeDialogWithDelete"/>
  </CommonDialog>

</template>


<script setup>

import { ref } from 'vue'
import DeleteDialogWindow from '@/components/album/listing/DeleteDialogWindow.vue'
import CommonDialog from '@/components/common/CommonDialog.vue'

defineProps({
  id: Number,
  title: String
})

const emit = defineEmits([
  'sendDeleteIdToAlbumsList'
])

const dialogWindowActive = ref(false)

function closeDialog() {
  dialogWindowActive.value = false;
}

function closeDialogWithDelete(id) {
  dialogWindowActive.value = false;
  emit('sendDeleteIdToAlbumsList', id)
}

</script>

<style>
#action-buttons {
  margin: 10px;
}
.edit-button {
  margin: 5px;
}
</style>