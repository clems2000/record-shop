import { describe, it, expect, afterEach, vi } from 'vitest'
import { mountComponent } from '@/utils/testHelper.js'
import PhotoItem from '@/components/album/details/PhotoItem.vue'

describe('PhotoItem', () => {

  afterEach(() => {
    vi.restoreAllMocks();
  })

  it('should have contain a v-card with image', () => {
    const component = mountComponent(PhotoItem, {
      props: {
        image: 'test'
      },
    })
    expect(component.find('[data-test="photo-item-card"]').exists()).toBe(true)
    expect(component.find('[data-test="photo-url"]').exists()).toBe(true)
  })
})