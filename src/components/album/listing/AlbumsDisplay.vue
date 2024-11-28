<template>
  <v-sheet>
    <div class="header">
      <h1 class>Albums</h1>
      <v-btn :to="{ name: 'createAlbum'}"
             data-test="add-album-button">Add</v-btn>
    </div>

    <v-sheet class="albums-list">
      <AlbumsList :albums="albumsReference"
                  @reloadPageAndDeleteAlbum="reloadPageAndDeleteAlbum"/>
    </v-sheet>

    <v-sheet class="page-buttons">
      <PaginationButtons :prevBtnDisabled="prevBtnDisabledReference"
                         :nextBtnDisabled="nextBtnDisabledReference"
                         @previousPage="previousPage"
                         @nextPage="nextPage"/>
    </v-sheet>

    <AlertMessage v-model="showAlertReference"
                  :message="alertMessageReference"/>

  </v-sheet>

</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import AlertMessage from '@/components/common/alert/AlertMessage.vue'
import AlbumsList from '@/components/album/listing/AlbumsList.vue'
import PaginationButtons from '@/components/album/listing/PaginationButtons.vue'
import { useAlbumsStore } from '@/stores/albumStore.js'
import { findAllAlbums } from '@/services/albumsApi.js'
import { handleError } from '@/utils/handleDisplayError.js'

//All code for store:
const albumsStore = useAlbumsStore();

const albumsReference = ref([]);

const prevBtnDisabledReference = computed(()=> albumsStore.pageNumber <= 1)
const nextBtnDisabledReference = ref(false);

const showAlertReference = ref(false);
const alertMessageReference = ref('');

const reloadBecauseOfDelete = ref(false);

onMounted(() => {
  loadAlbumsListIntoStore();
})

function reloadPageAndDeleteAlbum(id) {
  reloadBecauseOfDelete.value = true;
  albumsStore.deleteAlbumFromStore(id);
  alertMessageReference.value = `Album with Id ${id} deleted`
  showAlertReference.value = true;
  displayAlbumsOnPage()
}

async function loadAlbumsListIntoStore() {
  if (albumsStore.albumsList.length === 0) {

    try {
      albumsStore.albumsList = await findAllAlbums()
      displayAlbumsOnPage()
    } catch (error) {
      alertMessageReference.value = handleError(error)
      showAlertReference.value = true;
    }

  } else {
    displayAlbumsOnPage()
  }
}

function displayAlbumsOnPage() {
  let albumsOnPage = albumsStore.findAlbumsForEachPageFromStore()
  if (checkIncomingResultLength(albumsOnPage)) {
    albumsReference.value = albumsOnPage;
  }
}

function checkIncomingResultLength(result) {
  if (result.length === 0) {
    disableNextButtonAndShowAlert();
    albumsStore.previousPage()
    if (reloadBecauseOfDelete.value) {
      reloadBecauseOfDelete.value = false;
      displayAlbumsOnPage()
    }
    return false;
  }
  if (result.length < albumsStore.paginationLimit) {
    nextBtnDisabledReference.value = true;
  }
  return true;
}

function disableNextButtonAndShowAlert() {
  nextBtnDisabledReference.value = true;
  alertMessageReference.value = 'You are on the last page you can not go forward';
  showAlertReference.value = true;
}

function nextPage() {
  albumsStore.nextPage()
  displayAlbumsOnPage();
}

function previousPage() {
  nextBtnDisabledReference.value = false;
  albumsStore.previousPage()
  displayAlbumsOnPage();
}



//All code for none store:
// const albumsReference = ref([]);
//
// const prevBtnDisabledReference = computed(()=> pageNumberReference.value <= 1)
// const nextBtnDisabledReference = ref(false);
// const pageNumberReference = ref(1);
//
// const showAlertReference = ref(false);
// const alertMessageReference = ref('');
//
// function previousPage() {
//   nextBtnDisabledReference.value = false;
//   pageNumberReference.value -= 1;
//   loadAlbumsList();
// }
//
// function nextPage() {
//   pageNumberReference.value += 1;
//   loadAlbumsList();
// }
//
// function disableNextButtonAndShowAlert() {
//   nextBtnDisabledReference.value = true;
//   alertMessageReference.value = 'You are on the last page you can not go forward';
//   showAlertReference.value = true;
// }
//
// function checkIncomingResultLength(result) {
//   if (result.length === 0) {
//     disableNextButtonAndShowAlert();
//     pageNumberReference.value -= 1;
//     return false;
//   }
//   if (result.length < PAGINATION_SIZE) {
//     nextBtnDisabledReference.value = true;
//   }
//   return true;
// }
//
// async function loadAlbumsList() {
//   try {
//     const result = await findAlbums(pageNumberReference.value, PAGINATION_SIZE)
//     if (checkIncomingResultLength(result)) {
//       albumsReference.value = result;
//     }
//   } catch (error) {
//     alertMessageReference.value = handleError(error)
//     showAlertReference.value = true;
//   }
// }
//
// onMounted(() => {
//    loadAlbumsList();
// })

</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.albums-list {
  margin: 5px 0;
}
</style>