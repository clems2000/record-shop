import { describe, it, expect } from 'vitest'
import { mountComponentWithStoreAndRouter } from '@/utils/testHelper.js'
import CreateAlbumView from '@/views/CreateAlbumView.vue'


describe('CreateAlbumView', () => {
  it('should not have an empty UI', () => {
    const component = mountComponentWithStoreAndRouter(CreateAlbumView)
    expect(component.text()).not.toBe('')
  })
})