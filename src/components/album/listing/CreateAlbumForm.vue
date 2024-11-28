<template>
  <h1>{{ t('albumPageDetails.createAlbum') }}</h1>


  <v-form ref="form" v-model="valid" @submit.prevent="createNewAlbum">
    <v-text-field
      disabled
      data-test="id-input-create-album"
    >ID: {{id}}</v-text-field>

    <v-text-field
      v-model="Title"
      :label = "t('albumPageDetails.title')"
      :rules="[rules.required]"
      type="text"
      data-test="title-input-create-album"
    ></v-text-field>

    <v-text-field
      v-model="userId"
      label="userId"
      :rules="[rules.required]"
      data-test="user-id-input-create-album"
    >
    </v-text-field>

    <v-container fluid class="submit-save-button-container">
      <v-row>
        <v-col class="d-flex justify-start">
          <BackToAlbumsButton data-test="back-to-albums-from-create"/>
        </v-col>
        <v-col class="d-flex justify-end">
          <v-btn
            type="submit"
            :disabled="!valid"
            color="green"
            data-test="submit-create-album"
          >{{ t('buttons.create') }}</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAlbumsStore } from '@/stores/albumStore.js'
import { useRouter } from 'vue-router'
import BackToAlbumsButton from '@/components/album/details/BackToAlbumsButton.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const router = useRouter()

const albumsStore = useAlbumsStore()

const valid = ref(true)

const userId = ref('')
const id = ref()
const Title = ref('')

function createNewAlbum() {
  let album = {
    userId: userId.value,
    id: id.value,
    title: Title.value
  }
  albumsStore.createNewAlbum(album)
  rerouteToAlbumDetails()
}

const rerouteToAlbumDetails = () => {
  router.push({ name: 'albumDetails', params: { id: id.value }})
}

const rules = {
  required: (v) => !!v || t('formMessages.required')
}

function getNewAlbumId() {
  id.value = albumsStore.getNewAlbumId()
}

onMounted(() => {
  getNewAlbumId()
})

</script>

<style scoped>
.submit-save-button-container {
  width: 100%;
  margin: 0;
  padding: 20px 0;
}
</style>