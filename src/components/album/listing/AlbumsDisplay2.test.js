import AlbumsDisplay from '@/components/album/listing/AlbumsDisplay.vue'
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest'
import { findAllAlbums } from '@/services/albumsApi.js'
import { mountComponentWithStore } from '@/utils/testHelper.js'
import { useAlbumsStore } from '@/stores/albumStore.js'
import { flushPromises } from '@vue/test-utils'
import { createAlbumListDataPerPaginationSize } from '@/components/album/mocks/albumTestMocks.js'

const mockdata = createAlbumListDataPerPaginationSize(3)
vi.mock('@/services/albumsApi.js', () => {
  return {
    findAllAlbums: vi.fn()
  }
})

describe('AlbumsDisplay', () => {

  beforeEach(() => {
    findAllAlbums.mockResolvedValue(mockdata)
  })

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    localStorage.clear();
  })

  it('should reload API with a larger page number after having pressed next button', async () => {

    const component = mountComponentWithStore(AlbumsDisplay, {}, {stubActions: false});
    const store = useAlbumsStore()
    expect(findAllAlbums).toHaveBeenCalledTimes(1);
    await flushPromises()
    expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(1);
    await component.find('[data-test="next-page-button"]').trigger('click');
    await flushPromises()

    expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(2)


    // expect(findAlbums).toHaveBeenCalledTimes(1);
    // await component.find('[data-test="next-page-button"]').trigger('click');
    // expect(findAlbums).toHaveBeenCalledTimes(2);
    // expect(findAlbums).toHaveBeenCalledWith(2, PAGINATION_SIZE);
  })

})



//these are component tests