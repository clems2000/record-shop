import AlbumsDisplay from '@/components/album/listing/AlbumsDisplay.vue'
import { flushPromises } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { PAGINATION_SIZE } from '@/components/album/listing/paginationConstant.js'
import { ApiException } from '@/services/apiException.js'
import { errorHandling } from '@/utils/apiErrorHandling.js'
import { mountComponentWithStore, mountComponentWithStoreAndRouter, setMockData } from '@/utils/testHelper.js'
import { useAlbumsStore } from '@/stores/albumStore.js'
import { createAlbumListDataPerPaginationSize } from '@/components/album/mocks/albumTestMocks.js'
import router from '@/router/index.js'


describe('AlbumsDisplay', () => {

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    localStorage.clear();
  })

  describe('with API data', () => {

    let component
    let mockData = createAlbumListDataPerPaginationSize(4)
    let fetchMock
    let store
    beforeEach(async () => {
      fetchMock = setMockData(mockData)
      component = mountComponentWithStore(AlbumsDisplay, {props: { id: "1" }}, {stubActions: false});
      store = useAlbumsStore()
      // store.findAlbumsForEachPageFromStore.mockImplementation(() => {
      //   store.albumsOnPage = mockData
      // })
      await flushPromises()
    })

    it('should load API data and display first pagination', async () => {
      expect(store.albumsList).toEqual(mockData)
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums`);
      expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(1);

      expect(component.text()).toContain(mockData[0].title)
      expect(component.text()).toContain(mockData[PAGINATION_SIZE - 1].title)
      expect(component.text()).not.toContain(mockData[PAGINATION_SIZE].title)
      expect(component.text()).not.toContain(mockData[(PAGINATION_SIZE * 2) - 1].title)
    })

    it('should load action with larger page number after having pressed next button', async () => {
      expect(store.albumsList).toEqual(mockData)
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums`);

      expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(1);
      await component.find('[data-test="next-page-button"]').trigger('click');
      expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(2);

      expect(component.text()).not.toContain(mockData[0].title)
      expect(component.text()).not.toContain(mockData[PAGINATION_SIZE - 1].title)
      expect(component.text()).toContain(mockData[PAGINATION_SIZE].title)
      expect(component.text()).toContain(mockData[(PAGINATION_SIZE * 2) - 1].title)
    })

    it('should load action with a smaller page number after having pressed previous button', async () => {
      expect(store.albumsList).toEqual(mockData)
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums`);

      await component.find('[data-test="next-page-button"]').trigger('click');
      expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(2);
      await component.find('[data-test="previous-page-button"]').trigger('click');
      expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(3);

      expect(component.text()).toContain(mockData[0].title)
      expect(component.text()).toContain(mockData[PAGINATION_SIZE - 1].title)
      expect(component.text()).not.toContain(mockData[PAGINATION_SIZE].title)
      expect(component.text()).not.toContain(mockData[(PAGINATION_SIZE * 2) - 1].title)
    })

    it('should not load action with a smaller page number after having pressed previous button', async () => {
      expect(store.albumsList).toEqual(mockData)
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums`);

      await component.find('[data-test="previous-page-button"]').trigger('click');
      expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(1);

      expect(component.text()).toContain(mockData[0].title)
      expect(component.text()).toContain(mockData[PAGINATION_SIZE - 1].title)
      expect(component.text()).not.toContain(mockData[PAGINATION_SIZE].title)
      expect(component.text()).not.toContain(mockData[(PAGINATION_SIZE * 2) - 1].title)
    })
  })

  describe('pagination size tests', () => {

    it('should have an enabled next button, when there are just as many items returned as the pagination size', async() => {
      const mockDataTest5 = createAlbumListDataPerPaginationSize(1)
      const fetchMock = setMockData(mockDataTest5)
      const component = mountComponentWithStore(AlbumsDisplay, {props: { id: "1" }}, {stubActions: false});
      const store = useAlbumsStore()

      await flushPromises()
      expect(store.albumsList).toEqual(mockDataTest5)

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums`);

      await flushPromises()
      expect(component.find('[data-test="next-page-button"]').element.disabled).toBe(false)
      expect(component.text()).toContain(mockDataTest5[PAGINATION_SIZE - 1].title)
      expect(component.text()).toContain(mockDataTest5[0].title)

    })

    it('should have a disabled next button, when there are less items returned than the pagination size', async() => {
      const mockDataTest6 = createAlbumListDataPerPaginationSize(1).slice(0, PAGINATION_SIZE - 1);
      const fetchMock = setMockData(mockDataTest6)
      const component = mountComponentWithStore(AlbumsDisplay,{}, {stubActions: false})
      const store = useAlbumsStore()

      await flushPromises()
      expect(store.albumsList).toEqual(mockDataTest6)

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums`);

      expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(1);
      await flushPromises()

      expect(component.find('[data-test="next-page-button"]').element.disabled).toBe(true)
      expect(component.text()).toContain(mockDataTest6[0].title)
      expect(component.text()).toContain(mockDataTest6[mockDataTest6.length - 1].title)
    })

    it('button should disable when an empty array is returned after next page click, end of pagination with pagination a multiple of albums list size', async() => {
      const mockDataTest4 = createAlbumListDataPerPaginationSize(1)
      const fetchMock= setMockData(mockDataTest4);
      const component = mountComponentWithStore(AlbumsDisplay, {}, {stubActions: false});
      const store = useAlbumsStore()
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums`);
      await flushPromises()
      expect(store.albumsList).toEqual(mockDataTest4)
      await flushPromises()
      await component.find('[data-test="next-page-button"]').trigger('click');


      await flushPromises()
      expect(component.find('[data-test="next-page-button"]').element.disabled).toBe(true)
      expect(component.text()).toContain(createAlbumListDataPerPaginationSize(1)[0].title)
      expect(component.text()).toContain(createAlbumListDataPerPaginationSize(1)[PAGINATION_SIZE - 1].title)
    })

    it('should have both buttons disabled when an empty array is returned', async() => {
      const mockDataTest7 = [];
      const fetchMock = setMockData(mockDataTest7);
      const component = mountComponentWithStore(AlbumsDisplay, {}, {stubActions: false});
      const store = useAlbumsStore()

      await flushPromises()
      expect(store.albumsList).toEqual(mockDataTest7)
      await flushPromises()

      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums`);

      expect(component.find('[data-test="next-page-button"]').element.disabled).toBe(true)
      expect(component.find('[data-test="previous-page-button"]').element.disabled).toBe(true)
      expect(component.text()).not.toContain(createAlbumListDataPerPaginationSize(1)[0].title)
      expect(component.text()).not.toContain(createAlbumListDataPerPaginationSize(1)[PAGINATION_SIZE - 1].title)
    })
  })

  describe('with errorApi', () => {

    it('should save the correct alert message when an ApiException error is thrown', async() => {
      const mockData = {};
      const fetchMock = setMockData(mockData, 404, false);

      const expectedError = new ApiException(404)
      const message = errorHandling(expectedError)
      const component = mountComponentWithStore(AlbumsDisplay);
      await flushPromises()
      expect(component.vm.alertMessageReference).toEqual(message)
    })

    it('should save the correct alert message with default error when response is not okay', async() => {
      const mockData = {};
      const fetchMock= vi.fn().mockResolvedValue({status: 200, ok: true, json: vi.fn().mockRejectedValue(mockData)});
      global.fetch = fetchMock;

      const message = "Something went wrong"
      const component = mountComponentWithStore(AlbumsDisplay);
      await flushPromises()
      expect(component.vm.alertMessageReference).toEqual(message)
    })

    it('should save the correct alert message when response is not okay, given by await json', async() => {
      const mockData = {"message": "test response"};
      const fetchMock= vi.fn().mockResolvedValue({status: 200, ok: true, json: vi.fn().mockRejectedValue(mockData)});
      global.fetch = fetchMock;

      const message = mockData.message
      const component = mountComponentWithStore(AlbumsDisplay);
      await flushPromises()
      expect(component.vm.alertMessageReference).toEqual(message)
    })
  })

  describe("delete actions", () => {

    let component
    let mockData = createAlbumListDataPerPaginationSize(2)
    let fetchMock
    let store
    beforeEach(async () => {
      fetchMock = setMockData(mockData)
      component = mountComponentWithStore(AlbumsDisplay, {props: { id: "1" }}, {stubActions: false});
      store = useAlbumsStore()
      // store.findAlbumsForEachPageFromStore.mockImplementation(() => {
      //   store.albumsOnPage = mockData
      // })
      await flushPromises()
    })

    it("should reload page to previous page when the last album of a page is deleted", async () => {
      expect(store.albumsList).toEqual(mockData)
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums`);
      expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(1);
      expect(store.pageNumber).toBe(1);

      await component.find('[data-test="next-page-button"]').trigger('click');
      expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(2);
      expect(store.pageNumber).toBe(2);

      await component.find('[data-test="next-page-button"]').trigger('click');
      expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(3);
      expect(store.pageNumber).toBe(2);

      expect(component.find('[data-test="next-page-button"]').element.disabled).toBe(true)

      for (let i = 0; i < PAGINATION_SIZE; i++) {
        await component.find('[data-test="delete-button"]').trigger('click');
        const dialogComponent = component.findComponent({ name: 'DeleteDialogWindow' })
        expect(dialogComponent.exists()).toBe(true)
        await dialogComponent.find('[data-test="confirm-delete-button"]').trigger('click')
        expect(dialogComponent.exists()).toBe(false)

      }
      expect(store.deleteAlbumFromStore).toHaveBeenCalledTimes(PAGINATION_SIZE);
      // expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(13);
      expect(store.pageNumber).toBe(1);
    })
  })

  describe('adding albums', () => {
      let push
      let component
      let store
      beforeEach(async () => {
        push = vi.spyOn(router, 'push')
        component = mountComponentWithStoreAndRouter(AlbumsDisplay, {props: { id: "1" }},
          {stubActions: false,
            initialState: { listsOfAlbums: { albumsList: createAlbumListDataPerPaginationSize(4) }}});
        store = useAlbumsStore()
        // store.findAlbumsForEachPageFromStore.mockImplementation(() => {
        //   store.albumsOnPage = mockData
        // })
        await flushPromises()
      })

    it('should have an add button in UI', () => {
      expect(component.find('[data-test="add-album-button"]').exists()).toBe(true);
    })

    it('should reroute to create album view with add button click', async() => {
      expect(push).not.toHaveBeenCalled();
      expect(push).toHaveBeenCalledTimes(0);
      await component.find('[data-test="add-album-button"]').trigger('click');
      await flushPromises()

      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith({name: 'createAlbum'});
    })
  })

  describe('receive emitted events', () => {
    it('should receive emit and then delete an album with certain id and display albums again', async () => {
      const mockData = createAlbumListDataPerPaginationSize(4)
      const fetchMock = setMockData(mockData)

      const component = mountComponentWithStore(AlbumsDisplay, {props: { id: "1" }}, {stubActions: false});
      const store = useAlbumsStore()
      store.albumsList = mockData
      await flushPromises()
      expect(store.albumsList).toEqual(mockData)
      expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(1);

      const albumListComponent = component.findComponent({name: 'AlbumsList', mockData})

      const albumItemComponent = albumListComponent.findComponent({name: 'AlbumItem', id: 1, title: "test"})
      await albumItemComponent.find('[data-test="delete-button"]').trigger('click')
      expect(albumItemComponent.vm.dialogWindowActive).toBe(true)
      const dialogComponent = albumItemComponent.findComponent({name: 'DeleteDialogWindow'})
      expect(dialogComponent.exists()).toBe(true)
      await dialogComponent.find('[data-test="confirm-delete-button"]').trigger('click')
      expect(albumItemComponent.vm.dialogWindowActive).toBe(false)
      expect(albumItemComponent.emitted().sendDeleteIdToAlbumsList).toBeTruthy();
      expect(albumListComponent.emitted().reloadPageAndDeleteAlbum).toBeTruthy();
      expect(albumListComponent.emitted().reloadPageAndDeleteAlbum[0][0]).toBe(1)

      expect(store.deleteAlbumFromStore).toHaveBeenCalledTimes(1);
      expect(store.deleteAlbumFromStore).toHaveBeenCalledWith(1);
      expect(component.vm.alertMessageReference).toBe(`Album with Id 1 deleted`)
      expect(store.findAlbumsForEachPageFromStore).toHaveBeenCalledTimes(2);
    })
  })
})

// these are component tests