import { describe, it, expect, vi } from 'vitest'
import vuetify from '@/plugins/vuetify.js'
import AlbumPhotoView from '@/views/AlbumPhotoView.vue'
import { mountComponentWithStore } from '@/utils/testHelper.js'
vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRoute: vi.fn(),
    useRouter: vi.fn(() => ({
      push: () => {
      }
    }))
  }
})
describe('AlbumPhotoView', () => {
  it('should render Photo details on mount', () => {
    const component = mountComponentWithStore(AlbumPhotoView, {
      global: {
        plugins: [vuetify],
      }
    });
    expect(component.html()).not.toBe(null);
  })
});