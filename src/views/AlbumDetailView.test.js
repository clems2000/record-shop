import { describe, it, expect, vi } from 'vitest'
import AlbumDetailView from '@/views/AlbumDetailView.vue'
import { mountComponentWithStore } from '@/utils/testHelper.js'


vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: () => {}
    }))
  }
})

describe('AlbumDetailView', () => {
  it('should render Album details on mount', () => {
    const component = mountComponentWithStore(AlbumDetailView, {props: { id : "1"}})
    expect(component.html()).not.toBe(null);
  })
});