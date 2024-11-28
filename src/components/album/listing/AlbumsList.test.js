import AlbumsList from './AlbumsList.vue';
import { describe, it, expect} from 'vitest'
import { mountComponent } from '@/utils/testHelper.js'

describe('AlbumsList', () => {
  it('should render a list of albums', async () => {
    const component = mountComponent(AlbumsList, {
      props: {
        albums: [
            { id: 1, title: 'test' },
            { id: 2, title: 'test2' }
          ]
        }
    })
    expect(component.text()).toContain('test')
    const numberOfCardsRendered = component.findAll('.v-card').length
    expect(numberOfCardsRendered).toBe(2)
  })

  it('should emit reloadPageAndDeleteAlbum with Id', async () => {
    const component = mountComponent(AlbumsList, {
      props: {
        albums: [
          { id: 1, title: 'test' },
          { id: 2, title: 'test2' }
        ]
      },
    })
    const albumItemComponent = component.findComponent({name: 'AlbumItem', id: 1, title: "test"})
    await albumItemComponent.find('[data-test="delete-button"]').trigger('click')
    expect(albumItemComponent.vm.dialogWindowActive).toBe(true)
    const dialogComponent = albumItemComponent.findComponent({name: 'DeleteDialogWindow'})
    expect(dialogComponent.exists()).toBe(true)
    await dialogComponent.find('[data-test="confirm-delete-button"]').trigger('click')
    expect(albumItemComponent.vm.dialogWindowActive).toBe(false)
    expect(albumItemComponent.emitted().sendDeleteIdToAlbumsList).toBeTruthy();
    expect(component.emitted().reloadPageAndDeleteAlbum).toBeTruthy();
    expect(component.emitted().reloadPageAndDeleteAlbum[0][0]).toBe(1)
  })
})