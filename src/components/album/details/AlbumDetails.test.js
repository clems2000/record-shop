import { describe, expect, it, vi, afterEach, beforeEach } from 'vitest'
import AlbumDetails from '@/components/album/details/AlbumDetails.vue'
import { mountComponentWithStore, mountComponentWithStoreAndRouter } from '@/utils/testHelper.js'
import { useAlbumsStore } from '@/stores/albumStore.js'
import { createAlbumListDataPerPaginationSize } from '@/components/album/mocks/albumTestMocks.js'
import { useRouter } from 'vue-router'
import { flushPromises, mount } from '@vue/test-utils'
import router from '@/router/index.js'
import vuetify from '@/plugins/vuetify.js'
import { createTestingPinia } from '@pinia/testing'

vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: () => {}
    }))
  }
})

describe('AlbumDetails', () => {

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    localStorage.clear();
  })

  describe('with store data', () => {

    let component
    let mockData = createAlbumListDataPerPaginationSize(4)
    let store
    beforeEach(async () => {
      component = mountComponentWithStore(AlbumDetails, { props: { id: "1" } }, {
        stubActions: false,
        initialState: { listsOfAlbums: { albumsList: mockData } }
      })
      store = useAlbumsStore()
    })



    it('should render correctly and have a button and the Album Details header', async () => {
      expect(component.find('h1').text()).toBe('Album Details for Id 1')
    })

    it('should have 2 buttons and one input field', async () => {
      expect(component.find('[data-test="save-changes-button"]').exists()).toBe(true)
      expect(component.find('[data-test="to-albums-button2"]').exists()).toBe(true)
      expect(component.find('[data-test="change-title-input-field"]').exists()).toBe(true)
    })

    it('should render correct album details from Store with the correct router parameters after having called the findAlbumByIdFromStore', async () => {
      expect(store.albumsList).toEqual(mockData)
      expect(store.findAlbumByIdFromStore).toHaveBeenCalledTimes(1);

      expect(component.vm.newAlbumTitle).toBe(mockData[0].title)
      expect(component.vm.albumReference.title).toBe(mockData[0].title)

      expect(component.text()).toContain(mockData[0].id)

      const input = component.find('[data-test="change-title-input-field"]').find('input')
      expect(input.element.value).toBe(mockData[0].title)
      expect(store.findAlbumByIdFromStore).toHaveBeenCalledTimes(1);
    })


    it('should change change the album title after save button has been clicked, new title should also be displayed in input field', async() => {
      const newTitle = "New tests"
      expect(store.albumsList).toEqual(mockData)
      expect(store.findAlbumByIdFromStore).toHaveBeenCalledTimes(1);


      const input = component.find('[data-test="change-title-input-field"]').find('input')
      expect(input.element.value).toBe(mockData[0].title)
      expect(component.text()).toContain(mockData[0].id)

      input.setValue(newTitle)
      await input.trigger('input')
      await flushPromises()

      expect(input.element.value).toBe(newTitle)
      expect(component.find('[data-test="save-changes-button"]').exists()).toBe(true)
      expect(component.find('[data-test="save-changes-button"]').element.disabled).toBe(false)
      await component.find('[data-test="save-changes-button"]').trigger('submit')


      await flushPromises()
      expect(input.element.value).toBe(newTitle)
      await flushPromises()
      expect(store.changeAlbumTitle).toHaveBeenCalledTimes(1)
    })

    it('should show the correct album title as the input field default', async () => {
      const input = component.find('[data-test="change-title-input-field"]').find('input')
      expect(input.element.value).toBe(mockData[0].title)
    })

    it('should show required text under input field if input field is empty and disable save button', async () => {
      const input = component.find('[data-test="change-title-input-field"]').find('input')
      input.element.value = ""
      await input.trigger('input')
      expect(component.text()).toContain("Required")
      expect(component.find('[data-test="save-changes-button"]').exists()).toBe(true)
      expect(component.find('[data-test="save-changes-button"]').element.disabled).toBe(true)
    })

    it('should have snackbar alert with change successful', async () => {
      const newTitle = "New tests"
      const input = component.find('[data-test="change-title-input-field"]').find('input')
      input.setValue(newTitle)
      input.trigger('input')
      await component.find('[data-test="save-changes-button"]').trigger('submit')
      await flushPromises()
      expect(component.vm.alertMessageReference).toBe("Album title changed successfully")
    })


    it('should not call change album id from store if the input field is empty', async () => {
      const input = component.find('[data-test="change-title-input-field"]').find('input')
      input.element.value = ""
      await input.trigger('input')
      expect(component.text()).toContain("Required")
      expect(component.find('[data-test="save-changes-button"]').exists()).toBe(true)
      expect(component.find('[data-test="save-changes-button"]').element.disabled).toBe(true)
      await component.find('[data-test="save-changes-button"]').trigger("submit")
      expect(store.changeAlbumTitle).not.toHaveBeenCalledTimes(1)
    })

  })

  describe('with wrong id', () => {
    it('should reroute to albums page if id is not found', async () => {
      const push = vi.fn();
      useRouter.mockImplementationOnce(() => ({
        push
      }))

      const mockData = createAlbumListDataPerPaginationSize(4)
      const component = mountComponentWithStore(AlbumDetails, { props: { id: "500" } }, {
        stubActions: false,
        initialState: { listsOfAlbums: { albumsList: mockData } }
      })
      const store = useAlbumsStore()
      expect(store.albumsList).toEqual(mockData)
      await flushPromises()
      expect(store.isIdExistent).toHaveBeenCalledTimes(1)
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith({name: 'albums'});
    })

    it('should reroute to albums if back button is clicked', async () => {
      const push = vi.spyOn(router, 'push');
      const mockData = createAlbumListDataPerPaginationSize(4)
      const component = mount(AlbumDetails, {
        global: {
          plugins: [
            vuetify, router,
            createTestingPinia(
              { stubActions: false,
                initialState: { listsOfAlbums: { albumsList: mockData } } })
          ]
        }, props: { id: "1" }
      })
      const store = useAlbumsStore()
      expect(store.albumsList).toEqual(mockData)
      await flushPromises()
      expect(store.findAlbumByIdFromStore).toHaveBeenCalledTimes(1)
      expect(push).toHaveBeenCalledTimes(0);
      await component.find('[data-test="to-albums-button2"]').trigger('click');
      expect(push).toHaveBeenCalledTimes(1);
      expect(push).toHaveBeenCalledWith({name: 'albums'});
    })
  })
})


  // describe('with errorAPI', () => {
  //   it('should save the correct alert message when an ApiException error is thrown', async() => {
  //     const mockData = {};
  //     const fetchMock = setMockData(mockData, 404, false);
  //     const expectedError = new ApiException(404)
  //     const message = errorHandling(expectedError)
  //     const component = mountComponent(AlbumDetails);
  //     await flushPromises()
  //     expect(component.vm.alertMessageReference).toEqual(message)
  //   })
  //
  //   it('should save the correct alert message with default error when response is not okay', async() => {
  //     const mockData = {};
  //     const fetchMock= vi.fn().mockResolvedValue({status: 200, ok: true, json: vi.fn().mockRejectedValue(mockData)});
  //     global.fetch = fetchMock;
  //
  //     const message = "Something went wrong"
  //     const component = mountComponent(AlbumDetails)
  //     await flushPromises()
  //     expect(component.vm.alertMessageReference).toEqual(message)
  //   })
  //
  //   it('should save the correct alert message when response is not okay, given by await json', async() => {
  //     const mockData = {"message": "test response"};
  //     const fetchMock= vi.fn().mockResolvedValue({status: 200, ok: true, json: vi.fn().mockRejectedValue(mockData)});
  //     global.fetch = fetchMock;
  //
  //     const message = mockData.message
  //     const component = mountComponent(AlbumDetails)
  //     await flushPromises()
  //     expect(component.vm.alertMessageReference).toEqual(message)
  //   })
  // })
