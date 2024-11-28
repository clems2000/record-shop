import PhotosList from './PhotosList.vue';
import { describe, it, expect} from 'vitest'
import { mountComponent } from '@/utils/testHelper.js'

describe('PhotoList', () => {
  it('should render a list of albums', async () => {
    const component = mountComponent(PhotosList, {
      props: {
        photos: [
          { image: 'test' },
          { image: 'test2' }
        ]
      }
    })
    const numberOfCardsRendered = component.findAll('.v-card').length
    expect(numberOfCardsRendered).toBe(2)
  })
})