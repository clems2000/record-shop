import { describe, it, expect, afterEach, vi } from 'vitest'
import vuetify from '@/plugins/vuetify.js'
import AlbumPhotos from '@/components/album/details/AlbumPhotos.vue'
import { flushPromises, mount } from '@vue/test-utils'
import router from '@/router/index.js'
import { beforeEach } from 'vitest'
import { createAlbumListDataPerPaginationSize, createPhotoListData } from '@/components/album/mocks/albumTestMocks.js'
import { mountComponentWithStore, mountComponentWithStoreAndRouter, setMockData } from '@/utils/testHelper.js'
import { PAGINATION_SIZE } from '@/components/album/listing/paginationConstant.js'
import { ApiException } from '@/services/apiException.js'
import { errorHandling } from '@/utils/apiErrorHandling.js'
import { createTestingPinia } from '@pinia/testing'
import { nextTick } from 'vue'

describe('AlbumPhotos', () => {
  afterEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  describe('rendering', () => {
    let component
    beforeEach(() => {
      component = mountComponentWithStore(AlbumPhotos, {
        global: {
          plugins: [
            vuetify, router
          ],
        },
        props: {
          id: "1"
        }
      })
    })

    it('should have the correct id from the path of this component', () => {
      expect(component.find("h1").text()).toContain(1)
    })

    it('should have a next page and previous page button', () => {
      expect(component.find('[data-test="next-page-button"]').exists()).toBe(true);
      expect(component.find('[data-test="previous-page-button"]').exists()).toBe(true);
    })

    it('should have a back to albums button', () => {
      expect(component.find('[data-test="to-albums-button"]').exists()).toBe(true);
    })
  })

  describe("with API data", () => {
    afterEach(() => {
      vi.clearAllMocks()
      localStorage.clear()
    })

    let component
    let mockData
    let fetchMock

    beforeEach(async () => {
      mockData = createPhotoListData(1)
      fetchMock = setMockData(mockData)
      component = mountComponentWithStoreAndRouter(AlbumPhotos, {
        props: {
          id: "1"
        }
      },
      {
          stubActions: false, initialState: { listsOfAlbums: { albumsList: createAlbumListDataPerPaginationSize(3) } }
      })
    await flushPromises()
    })

    it('should load API data and display first pagination', async () => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=1&_limit=${PAGINATION_SIZE}`);
      await flushPromises()
      const numberOfCardsRendered = component.findAll('.v-card').length
      expect(numberOfCardsRendered).toBe(PAGINATION_SIZE)
    })

    it('should load API with larger page number after having pressed next button', async () => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=1&_limit=${PAGINATION_SIZE}`);

      await component.find('[data-test="next-page-button"]').trigger('click');
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=2&_limit=${PAGINATION_SIZE}`);
      expect(fetchMock).toHaveBeenCalledTimes(2);
      await flushPromises()

      const numberOfCardsRendered = component.findAll('.v-card').length
      expect(numberOfCardsRendered).toBe(PAGINATION_SIZE)
    })

    it('should load API with smaller page number after having pressed next button', async () => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=1&_limit=${PAGINATION_SIZE}`);

      await component.find('[data-test="next-page-button"]').trigger('click');
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=2&_limit=${PAGINATION_SIZE}`);
      expect(fetchMock).toHaveBeenCalledTimes(2);
      await flushPromises()

      await component.find('[data-test="previous-page-button"]').trigger('click');
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=1&_limit=${PAGINATION_SIZE}`);
      expect(fetchMock).toHaveBeenCalledTimes(3);
      await flushPromises()

      const numberOfCardsRendered = component.findAll('.v-card').length
      expect(numberOfCardsRendered).toBe(PAGINATION_SIZE)
    })

  })

  describe('pagination size tests', () => {
    afterEach(() => {
      vi.clearAllMocks()
    })

    it('should be on 2nd page if there is no 3rd page after button click to 3rd page and when going back to 1st page there should be no issues when page sizes are equal to pagination size', async() => {
      const mockDataTest = createPhotoListData(1)
      let fetchMock = setMockData(mockDataTest)
      global.fetch = fetchMock
      const component = mount(AlbumPhotos, {
        global: {
          plugins: [
            vuetify, router, createTestingPinia({
                stubActions: false, initialState: { listsOfAlbums: { albumsList: createAlbumListDataPerPaginationSize(1) } }
              }
            )
          ],
        },
        props: {
          id: "1"
        }
      })
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=1&_limit=${PAGINATION_SIZE}`);

      await flushPromises()
      expect(component.find('[data-test="next-page-button"]').element.disabled).toBe(false)
      await component.find('[data-test="next-page-button"]').trigger('click');
      expect(fetchMock).toHaveBeenCalledTimes(2);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=2&_limit=${PAGINATION_SIZE}`);
      expect(component.vm.pageNumberReference).toBe(2)

      await flushPromises()
      const fetchMockEmptyPage = setMockData([], 200, true);
      expect(component.find('[data-test="next-page-button"]').element.disabled).toBe(false)
      await component.find('[data-test="next-page-button"]').trigger('click');
      expect(fetchMockEmptyPage).toHaveBeenCalledTimes(1);
      expect(fetchMockEmptyPage).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=3&_limit=${PAGINATION_SIZE}`);
      expect(component.vm.pageNumberReference).toBe(3)
      await flushPromises()
      await nextTick()
      expect(component.vm.pageNumberReference).toBe(2)


      fetchMock = setMockData(mockDataTest)
      expect(component.find('[data-test="next-page-button"]').element.disabled).toBe(true)
      await component.find('[data-test="previous-page-button"]').trigger('click');
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=1&_limit=${PAGINATION_SIZE}`);
      await flushPromises()
      expect(component.vm.pageNumberReference).toBe(1)
      expect(component.find('[data-test="next-page-button"]').element.disabled).toBe(false)
      expect(component.find('[data-test="previous-page-button"]').element.disabled).toBe(true)

      const numberOfCardsRendered = component.findAll('.v-card').length
      expect(numberOfCardsRendered).toBe(PAGINATION_SIZE)
    })


    it('should have an enabled next button, when there are just as many items returned as the pagination size', async() => {
      const mockDataTest = createPhotoListData(1)
      const fetchMock = setMockData(mockDataTest)
      global.fetch = fetchMock
      const component = mount(AlbumPhotos, {
        global: {
          plugins: [
            vuetify, router, createTestingPinia({
                stubActions: false, initialState: { listsOfAlbums: { albumsList: createAlbumListDataPerPaginationSize(1) } }
              }
            )
          ],
        },
        props: {
          id: "1"
        }
      })
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=1&_limit=${PAGINATION_SIZE}`);

      await flushPromises()
      expect(component.find('[data-test="next-page-button"]').element.disabled).toBe(false)

      const numberOfCardsRendered = component.findAll('.v-card').length
      expect(numberOfCardsRendered).toBe(PAGINATION_SIZE)
    })

    it('should have a disabled next button, when there are less items returned than the pagination size', async () => {
      const mockDataTest = createAlbumListDataPerPaginationSize(1).slice(0, PAGINATION_SIZE - 1)
      const fetchMock = setMockData(mockDataTest)
      global.fetch = fetchMock
      const component = mount(AlbumPhotos, {
        global: {
          plugins: [
            vuetify, router, createTestingPinia({
                stubActions: false, initialState: { listsOfAlbums: { albumsList: mockDataTest } }
              }
            )
          ],
        },
        props: {
          id: "1"
        }
      })
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=1&_limit=${PAGINATION_SIZE}`);

      await flushPromises()
      expect(component.find('[data-test="next-page-button"]').element.disabled).toBe(true)

      const numberOfCardsRendered = component.findAll('.v-card').length
      expect(numberOfCardsRendered).toBe(PAGINATION_SIZE - 1)
    })

    it('button should disable when an empty array is returned after next page click, end of pagination with pagination a multiple of albums list size', async() => {
      const mockDataTest4 = createPhotoListData(1);
      const fetchMockFirstPage = setMockData(mockDataTest4);
      const component = mount(AlbumPhotos, {
        global: {
          plugins: [
            vuetify, router, createTestingPinia({
                stubActions: false, initialState: { listsOfAlbums: { albumsList: createAlbumListDataPerPaginationSize(1) } }
              }
            )
          ],
        },
        props: {
          id: "1"
        }
      })

      expect(fetchMockFirstPage).toHaveBeenCalledTimes(1);
      expect(fetchMockFirstPage).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=1&_limit=${PAGINATION_SIZE}`);
      await flushPromises()

      const fetchMockEmptyPage = setMockData([], 200, true);

      await component.find('[data-test="next-page-button"]').trigger('click');

      await flushPromises()
      expect(fetchMockEmptyPage).toHaveBeenCalledTimes(1);
      expect(fetchMockEmptyPage).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=2&_limit=${PAGINATION_SIZE}`);
      expect(component.find('[data-test="next-page-button"]').element.disabled).toBe(true)
      const numberOfCardsRendered = component.findAll('.v-card').length
      expect(numberOfCardsRendered).toBe(PAGINATION_SIZE)
    })

    it('should have both buttons disabled when an empty array is returned', async () => {
      const mockDataTest = []
      const fetchMock = setMockData(mockDataTest)
      const component = mount(AlbumPhotos, {
        global: {
          plugins: [
            vuetify, router, createTestingPinia({
                stubActions: false, initialState: { listsOfAlbums: { albumsList: createAlbumListDataPerPaginationSize(1) } }
              }
            )
          ],
        },
        props: {
          id: "1"
        }
      })
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchMock).toHaveBeenCalledWith(`https://jsonplaceholder.typicode.com/albums/1/photos?_page=1&_limit=${PAGINATION_SIZE}`);
      await flushPromises()

      expect(component.find('[data-test="next-page-button"]').element.disabled).toBe(true)
      expect(component.find('[data-test="previous-page-button"]').element.disabled).toBe(true)

      const numberOfCardsRendered = component.findAll('.v-card').length
      expect(numberOfCardsRendered).toBe(0)
    })
  })


  describe('with errorApi', () => {

    afterEach(() => {
      vi.clearAllMocks()
    })

    it('should save the correct alert message when an ApiException error is thrown', async() => {
      const mockData = {};
      const fetchMock= setMockData(mockData, 404, false);

      const expectedError = new ApiException(404)
      const message = errorHandling(expectedError)
      const component = mount(AlbumPhotos, {
        global: {
          plugins: [
            vuetify, router, createTestingPinia({
                stubActions: false, initialState: { listsOfAlbums: { albumsList: createAlbumListDataPerPaginationSize(1) } }
              }
              )
          ],
        },
        props: {
          id: "1"
        }
      })
      await flushPromises()
      expect(component.vm.alertMessage).toEqual(message)
    })

    it('should save the correct alert message with default error when response is not okay', async() => {
      const mockData = {};
      const fetchMock= vi.fn().mockResolvedValue({status: 200, ok: true, json: vi.fn().mockRejectedValue(mockData)});
      global.fetch = fetchMock;

      const message = "Something went wrong"
      const component = mount(AlbumPhotos, {
        global: {
          plugins: [
            vuetify, router, createTestingPinia({
                stubActions: false, initialState: { listsOfAlbums: { albumsList: createAlbumListDataPerPaginationSize(1) } }
              }
            )
          ],
        },
        props: {
          id: "1"
        }
      })
      await flushPromises()
      expect(component.vm.alertMessage).toEqual(message)
    })

    it('should save the correct alert message when response is not okay, given by await json', async() => {
      const mockData = {"message": "test response"};
      const fetchMock= vi.fn().mockResolvedValue({status: 200, ok: true, json: vi.fn().mockRejectedValue(mockData)});
      global.fetch = fetchMock;

      const message = mockData.message
      const component = mount(AlbumPhotos, {
        global: {
          plugins: [
            vuetify, router, createTestingPinia({
                stubActions: false, initialState: { listsOfAlbums: { albumsList: createAlbumListDataPerPaginationSize(1) } }
              }
            )
          ],
        },
        props: {
          id: "1"
        }
      })
      await flushPromises()
      expect(component.vm.alertMessage).toEqual(message)
    })

  })
})