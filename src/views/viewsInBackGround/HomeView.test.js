import HomeView from '@/views/viewsInBackGround/HomeView.vue'
import { expect, describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import vuetify from '@/plugins/vuetify.js'
import router from '@/router/index.js'


describe('HomeView', () => {
  it('should render the base layout of the app', () => {
    const component = mount(HomeView, {
      global: {
        plugins: [vuetify, router],
      }
    });
    expect(component.find('[data-test="render-base-layout"]').exists()).toBe(true);
  })
});