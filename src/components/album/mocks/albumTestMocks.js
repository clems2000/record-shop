import { PAGINATION_SIZE } from '@/components/album/listing/paginationConstant.js'

export function createAlbumListDataPerPaginationSize(multiplier) {
  let albumListArray = []
  for(let i = 1; i <= PAGINATION_SIZE * multiplier; i++) {
    albumListArray.push({id: i, title: `test${i} `});
  }
  return albumListArray
}

export function createAlbumListDataPerNumber(size) {
  let albumListArray = []
  for(let i = 1; i <= size; i++) {
    albumListArray.push({id: i, title: `test${i} `});
  }
  return albumListArray
}


export function createPhotoListData(multiplier) {
  let albumListArray = []
  for(let i = 1; i <= PAGINATION_SIZE * multiplier; i++) {
    albumListArray.push({image: `test${i}`});
  }
  return albumListArray
}

