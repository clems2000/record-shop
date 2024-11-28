import AlbumItem from '@/components/album/listing/AlbumItem.vue'
import { describe, it, expect, afterEach, vi } from 'vitest'
import { mountComponent } from '@/utils/testHelper.js'
import router from '@/router/index.js'
import vuetify from '@/plugins/vuetify.js'

describe('AlbumItem', () => {

  afterEach(() => {
    vi.restoreAllMocks();
  })

  it('should render the album id', async () => {
    const component = mountComponent(AlbumItem, {
      props: {
        id: 1,
        title: 'test'
      },
    })
    expect(component.text()).toContain('1')
  })

  it('should render the album title', async () => {
    const component = mountComponent(AlbumItem, {
      props: {
        id: 1,
        title: "test"
      },
    })
    expect(component.text()).toContain("test")
  })

  it('should open set dialogWindow to active after delete button is clicked', async () => {
    const component = mountComponent(AlbumItem, {
      props: {
        id: 1,
        title: "test"
      },
    })
    expect(component.vm.dialogWindowActive).toBe(false)
    await component.find('[data-test="delete-button"]').trigger('click')
    expect(component.vm.dialogWindowActive).toBe(true)
  })


  it('should open set dialogWindow to active after delete button is clicked and close again after cancel button', async () => {
    const component = mountComponent(AlbumItem, {
      props: {
        id: 1,
        title: "test"
      },
    })
    await component.find('[data-test="delete-button"]').trigger('click')
    expect(component.vm.dialogWindowActive).toBe(true)
    const childComponent = component.findComponent({name: 'DeleteDialogWindow'})
    expect(childComponent.exists()).toBe(true)
    await childComponent.find('[data-test="cancel-button"]').trigger('click')
    expect(component.vm.dialogWindowActive).toBe(false)
  })

  it('should open set dialogWindow to active after delete button is clicked and close again after confirm delete button', async () => {
    const component = mountComponent(AlbumItem, {
      props: {
        id: 1,
        title: "test"
      },
    })
    await component.find('[data-test="delete-button"]').trigger('click')
    expect(component.vm.dialogWindowActive).toBe(true)
    const dialogComponent = component.findComponent({name: 'DeleteDialogWindow'})
    expect(dialogComponent.exists()).toBe(true)
    await dialogComponent.find('[data-test="confirm-delete-button"]').trigger('click')
    expect(component.vm.dialogWindowActive).toBe(false)
    expect(component.emitted().sendDeleteIdToAlbumsList).toBeTruthy();
  })

  it('should open set dialogWindow to active after delete button is clicked and close again after confirm delete button and send the correct Id', async () => {
    const id = 1
    const component = mountComponent(AlbumItem, {
      props: {
        id: id,
        title: "test"
      },
    })
    await component.find('[data-test="delete-button"]').trigger('click')
    expect(component.vm.dialogWindowActive).toBe(true)
    const childComponent = component.findComponent({name: 'DeleteDialogWindow'})
    expect(childComponent.exists()).toBe(true)
    await childComponent.find('[data-test="confirm-delete-button"]').trigger('click')
    expect(component.vm.dialogWindowActive).toBe(false)
    const emitMessage = component.emitted().sendDeleteIdToAlbumsList
    expect(emitMessage).toBeTruthy();
    expect(emitMessage[0][0]).toEqual(1);
  })

  it('should route to correct path with click on v card', async () => {
    const push = vi.spyOn(router, 'push')
    const component = mountComponent(AlbumItem, {
      global: {
        plugins: [
          vuetify, router
        ],
      },
      props: {
        id: 1
      }
    })
    expect(component.find('[data-test="v-card-to-detail-page"]').exists()).toBe(true);
    expect(push).not.toHaveBeenCalled();
    expect(push).toHaveBeenCalledTimes(0);

    await component.find('[data-test="v-card-to-detail-page"]').trigger('click');

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith({name: 'albumDetails', params: {id: 1}});
  })

  it('should route to the correct path after edit button is clicked', async () => {
    const push = vi.spyOn(router, 'push')
    const component = mountComponent(AlbumItem, {
      global: {
        plugins: [
          vuetify, router
        ],
      },
      props: {
        id: 1
      }
    })
    expect(component.find('[data-test="edit-album-button"]').exists()).toBe(true);
    expect(push).not.toHaveBeenCalled();
    expect(push).toHaveBeenCalledTimes(0);

    await component.find('[data-test="edit-album-button"]').trigger('click');

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith({name: 'albumDetails', params: {id: 1}});
  })
})
