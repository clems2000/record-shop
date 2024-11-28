<template>
  <h1>Photos for Album {{id}}</h1>
  <br>

  <v-sheet>
    <PhotosList :photos="photosReference"/>
  </v-sheet>


  <v-sheet class="page-buttons">
    <PaginationButtons :prevBtnDisabled="prevBtnDisabledReference"
                       :nextBtnDisabled="nextBtnDisabledReference"
                       @previousPage="previousPage"
                       @nextPage="nextPage"/>
  </v-sheet>

  <AlertMessage v-model="showAlert"
                :message="alertMessage"/>

  <br>

  <BackToAlbumsButton />
</template>

<script setup>
import BackToAlbumsButton from '@/components/album/details/BackToAlbumsButton.vue'
import PhotosList from '@/components/album/details/PhotosList.vue'
import { computed, onMounted, ref } from 'vue'
import { findAlbumPhotosByIdAndPaginationSize } from '@/services/albumsApi.js'
import { handleError } from '@/utils/handleDisplayError.js'
import PaginationButtons from '@/components/album/listing/PaginationButtons.vue'
import { PAGINATION_SIZE } from '@/components/album/listing/paginationConstant.js'
import AlertMessage from '@/components/common/alert/AlertMessage.vue'
import { useAlbumsStore } from '@/stores/albumStore.js'
import router from '@/router/index.js'

const props = defineProps({
  id: String
})

const prevBtnDisabledReference = computed(()=> pageNumberReference.value <= 1)
const nextBtnDisabledReference = ref(false);
const pageNumberReference = ref(1);

const showAlert = ref(false);
const alertMessage = ref('');

const photosReference = ref([]);

const idReference = ref(parseInt(props.id));

const albumsStore = useAlbumsStore();

function previousPage() {
  if (prevBtnDisabledReference.value) {
    return
  }
  pageNumberReference.value -= 1;
  nextBtnDisabledReference.value = false;
  loadPhotosList();
}

function nextPage() {
  pageNumberReference.value += 1;
  loadPhotosList();
}

function disableNextButtonAndShowAlert() {
  nextBtnDisabledReference.value = true;
  alertMessage.value = 'You are on the last page you can not go forward';
  showAlert.value = true;
}

function checkIncomingResultLength(result) {
  if (result.length === 0) {
    disableNextButtonAndShowAlert();
    pageNumberReference.value -= 1;
    return false;
  }
  if (result.length < PAGINATION_SIZE) {
    nextBtnDisabledReference.value = true;
  }
  return true;
}

const rerouteToAlbums = () => {
  router.push({ name: 'albums' })
}


async function loadPhotosList() {
  try {
    const result = await findAlbumPhotosByIdAndPaginationSize(idReference.value,
      pageNumberReference.value, PAGINATION_SIZE)

    if (checkIncomingResultLength(result)) {
      photosReference.value = result;
    }

    } catch (error) {
    alertMessage.value = handleError(error)
    showAlert.value = true;
    }
}

onMounted(() => {
  if (albumsStore.isIdExistent(idReference.value)) {
    loadPhotosList();
    return
  }
  rerouteToAlbums();
})

</script>

<style scoped>
</style>