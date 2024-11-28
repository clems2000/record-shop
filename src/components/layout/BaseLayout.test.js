import BaseLayout from './BaseLayout.vue'
import { expect, describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import vuetify from '@/plugins/vuetify.js'
import router from '@/router/index.js'


describe('BaseLayout', () => {
  it('should have a slot for the base layout', () => {
    const component = mount(BaseLayout, {
      global: {
        plugins: [vuetify, router],
      }
    });
    expect(component.html()).not.toBe(null);
  })
})