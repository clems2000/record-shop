import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { PAGINATION_SIZE } from '@/components/album/listing/paginationConstant.js'

export const useAlbumsStore = defineStore('listsOfAlbums', {
  state: () => {
    return {
      albumsList: useLocalStorage('albumsList', []),
      pageNumber: useLocalStorage('pageNumber', 1),
      paginationLimit: PAGINATION_SIZE
    }
  },
  actions: {
    findAlbumsForEachPageFromStore() {
      const start = (this.pageNumber - 1) * this.paginationLimit
      const end = start + this.paginationLimit
      return this.albumsList.slice(start, end)
    },
    findAlbumByIdFromStore(id) {
      return this.albumsList.find(album => album.id === id)
    },
    isIdExistent(albumId) {
      const checkAlbumId = obj => obj.id === albumId
      return this.albumsList.some(checkAlbumId)
    },
    deleteAlbumFromStore(albumId) {
      const index = this.albumsList.findIndex(album => album.id === albumId)
      this.albumsList.splice(index, 1)
    },
    changeAlbumTitle(id, newTitle) {
      const album = this.albumsList.find(album => album.id === id)
      album.title = newTitle;
    },
    nextPage() {
      this.pageNumber += 1
    },
    previousPage() {
      if (this.pageNumber > 1) {
        this.pageNumber -= 1
      }
    },
    createNewAlbum(album) {
      this.albumsList.push(album)
    },
    getNewAlbumId() {
      if(this.albumsList[this.albumsList.length - 1].id >= 100) {
        return (this.albumsList[this.albumsList.length - 1].id) + 1
      }
      return 101
    }
  }
});