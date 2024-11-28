<template>
<v-sheet class="details">
  <v-sheet class="header">
    <h1>Album Details for Id {{ albumReference.id }}</h1>
  </v-sheet>
  <v-sheet class="album-details">
    <v-form ref="form" v-model="valid" @submit.prevent="checkSubmit">
      <v-toolbar-title>Title:</v-toolbar-title>
            <v-text-field v-model="newAlbumTitle"
                          class="title-text-field"
                          :rules="[rules.required]"
                          data-test="change-title-input-field"
                          ></v-text-field>

      <v-container class="save-submit-buttons">
        <v-row>
          <v-col>
            <BackToAlbumsButton2/>
          </v-col>
          <v-col class="d-flex justify-end">
            <v-btn data-test="save-changes-button"
                   type="submit"
                   :disabled="!valid"
                   class="save-new-title-button"
                   color="green">Save</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-sheet>
  <AlertMessage v-model="showAlertReference"
                :message="alertMessageReference"/>
  </v-sheet>
</template>

<script setup>
import BackToAlbumsButton2 from '@/components/album/details/BackToAlbumsButton2.vue'
import { onMounted, ref } from 'vue'
import AlertMessage from '@/components/common/alert/AlertMessage.vue'
import { useAlbumsStore } from '@/stores/albumStore.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const valid = ref(true)

const rerouteToAlbums = () => {
  router.push({ name: 'albums' })
}

const props = defineProps({
  id: String
})

const albumsStore = useAlbumsStore();
//With store:
const albumId = parseInt(props.id)

const albumReference = ref({"id": 0, "title": 1})

const showAlertReference = ref(false);
const alertMessageReference = ref('');

const newAlbumTitle = ref()

const rules = {
  required: (value) => !!value || 'Required.'
}

function checkSubmit() {
    albumsStore.changeAlbumTitle(albumId, newAlbumTitle.value)
    alertMessageReference.value = 'Album title changed successfully'
    showAlertReference.value = true
    albumReference.value = albumsStore.findAlbumByIdFromStore(albumId)
}

function loadAlbumDetails() {
  albumReference.value = albumsStore.findAlbumByIdFromStore(albumId)
  newAlbumTitle.value = albumReference.value.title
}

onMounted(() => {
  if (albumsStore.isIdExistent(albumId)) {
    loadAlbumDetails()
    return
  }
  rerouteToAlbums()
})

</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.details {
  margin: 10px;
}

.album-details {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.title-text-field {
  width: 400px;
}

.save-submit-buttons {
  padding: 0;
}



</style>