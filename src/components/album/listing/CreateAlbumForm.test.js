import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createAlbumListDataPerPaginationSize } from '@/components/album/mocks/albumTestMocks.js'
import { mountComponentWithStoreAndRouter } from '@/utils/testHelper.js'
import CreateAlbumForm from '@/components/album/listing/CreateAlbumForm.vue'
import router from '@/router/index.js'
import { useAlbumsStore } from '@/stores/albumStore.js'
import { flushPromises } from '@vue/test-utils'


describe('CreateAlbumForm', () => {
  let component
  let store
  let push
  beforeEach(async () => {
    push = vi.spyOn(router, 'push')
    component = mountComponentWithStoreAndRouter(CreateAlbumForm,
      {}, {stubActions: false,
        initialState: { listsOfAlbums: { albumsList: createAlbumListDataPerPaginationSize(3)} }
      })
    store = useAlbumsStore()
    await flushPromises()
  })


  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    localStorage.clear();
  })

  describe('UI rendering', () => {
    it('should have a back to albums button that reroutes to /albums ', async() => {
      expect(component.find('[data-test="back-to-albums-from-create"]').exists()).toBe(true)
      await component.find('[data-test="back-to-albums-from-create"]').trigger('click')
      expect(push).toHaveBeenCalledWith({ name: 'albums' })
      expect(push).toHaveBeenCalledTimes(1)
    })

    it('should have a submit button, it should be disabled if Title and userId field are empty', () => {
      expect(component.find('[data-test="submit-create-album"]').exists()).toBe(true)
      const titleInput = component.find('[data-test="title-input-create-album"]').find('input')
      titleInput.setValue('')
      const userIdInput = component.find('[data-test="user-id-input-create-album"]').find('input')
      userIdInput.setValue('')
      expect(component.find('[data-test="submit-create-album"]').element.disabled).toBe(true)
    })

    it('should have three input fields', () => {
      expect(component.find('[data-test="title-input-create-album"]').exists()).toBe(true)
      expect(component.find('[data-test="user-id-input-create-album"]').exists()).toBe(true)
      expect(component.find('[data-test="id-input-create-album"]').exists()).toBe(true)
    })

    it('should have a disabled id input field', () => {
      expect(component.find('[data-test="id-input-create-album"]').exists()).toBe(true)
      expect(component.find('[data-test="id-input-create-album"]').attributes('disabled'))
    })

    //TODO why is the required not being found?
    it('should have a submit button, it should be disabled if Title is empty and show required', async () => {
      const input = component.find('[data-test="title-input-create-album"]').find('input')
      input.element.value = "qwertz"
      await input.trigger('input')
      await flushPromises()
      input.element.value = ""
      await input.trigger('input')
      await flushPromises()
      expect(component.text()).toContain("Required")
      expect(component.find('[data-test="submit-create-album"]').exists()).toBe(true)
      expect(component.find('[data-test="submit-create-album"]').element.disabled).toBe(true)
    })

    //TODO submit is clickable when correct values are entered

    it('should have a submit button, it should be disabled if userId is empty and show required', async () => {
      let newUserId = "123"
      const input = component.find('[data-test="user-id-input-create-album"]').find('input')
      expect(input.element.value).toBe('')

      input.setValue(newUserId)
      await input.trigger('input')
      await flushPromises()

      newUserId = ""
      input.setValue(newUserId)
      await input.trigger('input')
      await flushPromises()

      expect(component.text()).toContain("Required")
      expect(component.find('[data-test="submit-create-album"]').element.disabled).toBe(true)
    })


    it('should have a submit button and it is active when rules have been followed', async () => {
      let newTitle = "New test album"
      const input = component.find('[data-test="title-input-create-album"]').find('input')

      input.setValue(newTitle)
      await input.trigger('input')
      await flushPromises()
      expect(input.element.value).toBe(newTitle)

      const newUserId = "123"
      const userIdInput = component.find('[data-test="user-id-input-create-album"]').find('input')

      userIdInput.setValue(newUserId)
      await userIdInput.trigger('input')
      await flushPromises()

      expect(userIdInput.element.value).toBe(newUserId)

      expect(input.element.value).toBe(newTitle)

      expect(component.find('[data-test="submit-create-album"]').element.disabled).toBe(false)
    })

  })

  describe('After form submission', () => {
    it('should call the createAlbum action with the form values', async () => {
      const albumId = store.getNewAlbumId()

      let newTitle = "New test album"
      const input = component.find('[data-test="title-input-create-album"]').find('input')

      input.setValue(newTitle)
      await input.trigger('input')
      await flushPromises()
      expect(input.element.value).toBe(newTitle)

      const newUserId = "123"
      const userIdInput = component.find('[data-test="user-id-input-create-album"]').find('input')

      userIdInput.setValue(newUserId)
      await userIdInput.trigger('input')
      await flushPromises()

      expect(userIdInput.element.value).toBe(newUserId)

      expect(input.element.value).toBe(newTitle)

      expect(component.find('[data-test="submit-create-album"]').element.disabled).toBe(false)

      await component.find('[data-test="submit-create-album"]').trigger('submit')

      let album = { userId: newUserId, id: albumId, title: newTitle }
      expect(store.createNewAlbum).toHaveBeenCalledWith(album)
      expect(store.createNewAlbum).toHaveBeenCalledTimes(1)
    })

    it('should reroute to /albums/:id/details after form submission', async () => {
      const albumId = store.getNewAlbumId()

      let newTitle = "New test album"
      const input = component.find('[data-test="title-input-create-album"]').find('input')

      input.setValue(newTitle)
      await input.trigger('input')
      await flushPromises()
      expect(input.element.value).toBe(newTitle)

      const newUserId = "123"
      const userIdInput = component.find('[data-test="user-id-input-create-album"]').find('input')

      userIdInput.setValue(newUserId)
      await userIdInput.trigger('input')
      await flushPromises()

      expect(userIdInput.element.value).toBe(newUserId)

      expect(input.element.value).toBe(newTitle)

      expect(component.find('[data-test="submit-create-album"]').element.disabled).toBe(false)

      await component.find('[data-test="submit-create-album"]').trigger('submit')
      await flushPromises()

      expect(push).toHaveBeenCalledWith({ name: 'albumDetails', params: { id: albumId }})
      expect(push).toHaveBeenCalledTimes(1)
    })
  })
})