import AlbumsView from '@/views/AlbumsView.vue'
import { describe, it, expect} from 'vitest'
import { mountComponentWithStore } from '@/utils/testHelper.js'

describe('AlbumsView', () => {
  it('should render AlbumsList on mount', () => {
    const component = mountComponentWithStore(AlbumsView)
    expect(component.text()).not.toBe(null);
  })
});