import AboutView from '@/views/viewsInBackGround/AboutView.vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import vuetify from '@/plugins/vuetify.js'

describe('AboutView', () => {
  it('should render correctly', () => {
    const component = mount(AboutView, {
      global: {
        plugins: [vuetify],
      }
    });
    expect(component.text()).toContain('about');
  });
})

// these are component tests