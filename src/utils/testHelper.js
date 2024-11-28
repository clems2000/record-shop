import { mount } from '@vue/test-utils'
import vuetify from '@/plugins/vuetify.js'
import { vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import router from '@/router/index.js'

export function mountComponent(component, options) {
  return mount(component, {
    global: {
      plugins: [
        vuetify,
      ],
    },
    ...options
  });
}

export function mountComponentWithRouter(component, options = {}) {
  return mount(component, {
    global: {
      plugins: [
        vuetify,
        router
      ],
    },
    ...options
  });
}

export function mountComponentWithStore(component, options = {}, storeOptions = {}) {
  return mount(component, {
    global: {
      plugins: [
        vuetify,
        createTestingPinia(storeOptions)
      ],
    },
    ...options
  });
}

export function mountComponentWithStoreAndRouter(component, options = {}, storeOptions = {}) {
  return mount(component, {
    global: {
      plugins: [
        vuetify,
        router,
        createTestingPinia(storeOptions)
      ],
    },
    ...options
  });
}

export function setMockData(mockData, statusCode = 200, ok = true) {
  const fetchMock = vi.fn().mockResolvedValue({ status: statusCode, ok, json: vi.fn().mockResolvedValue(mockData) });
  global.fetch = fetchMock;
  return fetchMock;
}

