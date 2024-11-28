import AppHeader from '@/components/layout/AppHeader.vue'
import { expect, describe, it } from 'vitest'
import { mount } from '@vue/test-utils'
import vuetify from '@/plugins/vuetify.js'
import router from '@/router/index.js'

describe('AppHeader', () => {
  it('should render Record shop in the header on mount', () => {
    const component = mount(AppHeader, {
      global: {
        plugins:
          [vuetify,
          router],
      }
    });
    expect(component.find('[data-test="record-shop-page-link"]').exists()).toBe(true);
  })
  it('should render About in the header on mount', () => {
    const component = mount(AppHeader, {
      global: {
        plugins:
          [vuetify,
            router],
      }
    });
    expect(component.find('[data-test="about-page-link"]').exists()).toBe(true);
  })
  it('should render Vegemite in the header on mount', () => {
    const component = mount(AppHeader, {
      global: {
        plugins:
          [vuetify,
            router],
      }
    });
    expect(component.find('[data-test="Vegemite-page-link"]').exists()).toBe(true);
  })
  it('should render Albums in the header on mount', () => {
    const component = mount(AppHeader, {
      global: {
        plugins:
          [vuetify,
            router],
      }
    });
    expect(component.find('[data-test="albums-page-link"]').exists()).toBe(true);
  })
});