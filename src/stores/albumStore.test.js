import { setActivePinia, createPinia } from 'pinia'
import { useAlbumsStore } from '@/stores/albumStore.js'
import { describe, it, beforeEach, expect, afterEach, vi } from 'vitest'
import {
  createAlbumListDataPerNumber,
  createAlbumListDataPerPaginationSize
} from '@/components/album/mocks/albumTestMocks.js'
import { flushPromises } from '@vue/test-utils'
import { PAGINATION_SIZE } from '@/components/album/listing/paginationConstant.js'

describe('AlbumStore', () => {
  let albumMockData
  let albumListPaginationSize
  beforeEach(() => {
    setActivePinia(createPinia())
    albumMockData = createAlbumListDataPerPaginationSize(3)
    albumListPaginationSize = createAlbumListDataPerPaginationSize(1)
  })

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    localStorage.clear();
  })

  it('should have an empty list of albums', () => {
    const albumsStore = useAlbumsStore()
    expect(albumsStore.albumsList).toEqual([])
  })

  it('should have 1 as initial value for page Number', () => {
    const albumsStore = useAlbumsStore()
    expect(albumsStore.pageNumber).toEqual(1)
  })

  it('should have 10 as pagination site value', () => {
    const albumsStore = useAlbumsStore()
    expect(albumsStore.paginationLimit).toEqual(PAGINATION_SIZE)
  })

  it('should return the albums on a page with findAlbumsForEachPageFromStore action', async()=> {
    const albumsStore = useAlbumsStore()
    albumsStore.albumsList = albumMockData
    albumsStore.pageNumber = 1
    const result = albumsStore.findAlbumsForEachPageFromStore()
    expect(result).toEqual(albumListPaginationSize)
  })

  it('should find an album by id with findAlbumByIdFromStore action', () => {
    const albumsStore = useAlbumsStore()
    albumsStore.albumsList = albumMockData
    const result = albumsStore.findAlbumByIdFromStore(1)
    expect(result).toEqual({id: 1, title: 'test1 '})
  })

  it('should return false when a given id is not in albumsList', () => {
    const albumsStore = useAlbumsStore()
    albumsStore.albumsList = albumMockData
    const result = albumsStore.isIdExistent(500)
    expect(result).toBe(false)
  })

  it('should return true when a given id is in albumsList', () => {
    const albumsStore = useAlbumsStore()
    albumsStore.albumsList = albumMockData
    const result = albumsStore.isIdExistent(1)
    expect(result).toBe(true)
  })

  it('should delete an album, when give an Id', async () => {
    const albumsStore = useAlbumsStore()
    albumsStore.albumsList = [...albumMockData];
    const firstAlbum = albumsStore.albumsList[0]
    expect(albumsStore.albumsList[0]).toEqual(firstAlbum)
    albumsStore.deleteAlbumFromStore(1)
    expect(albumsStore.albumsList).not.toEqual(firstAlbum)
    expect(albumsStore.albumsList).toHaveLength(albumMockData.length - 1)
  })

  it('should change the title of an album, when given an Id and a new title', async () => {
    const albumsStore = useAlbumsStore()
    albumsStore.albumsList = albumMockData
    await flushPromises()
    const firstAlbum = albumsStore.albumsList[0]
    expect(albumsStore.albumsList[0]).toEqual(firstAlbum)
    albumsStore.changeAlbumTitle(1, "new title")
    expect(albumsStore.albumsList[0].title).toBe("new title")
  })

  it('should append a new album to the albumsList', async () => {
    const albumsStore = useAlbumsStore()
    albumsStore.albumsList = [...albumMockData];
    await flushPromises()
    let albumObject = {userId: 12, id: 500, title: "new album"}
    albumsStore.createNewAlbum(albumObject)
    await flushPromises()
    expect(albumsStore.albumsList).toContainEqual(albumObject)
    expect(albumsStore.albumsList).toHaveLength(albumMockData.length + 1)
  })

  it('should return the id for the new album when last Id smaller than 100', async () => {
    const albumsStore = useAlbumsStore()
    albumsStore.albumsList = albumMockData
    await flushPromises()
    const result = albumsStore.getNewAlbumId()
    expect(result).toBe(101)
  })

  it('should return the id for the new album when last Id larger than 100', async () => {
    const albumsStore = useAlbumsStore()
    albumsStore.albumsList = createAlbumListDataPerNumber(110)
    await flushPromises()
    const result = albumsStore.getNewAlbumId()
    expect(result).toBe(albumsStore.albumsList[109].id + 1)
  })
})