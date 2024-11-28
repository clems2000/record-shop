import { setActivePinia, createPinia } from 'pinia'
import { describe, it, beforeEach, expect, afterEach, vi } from 'vitest'
import { useUserStore } from '@/stores/userStore.js'
describe('UserStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllMocks();
    localStorage.clear();
  })

  it('set language', () => {
    const store = useUserStore()
    expect(store.currentLanguage).toEqual('en')
    store.changeLanguage('de')
    expect(store.currentLanguage).toEqual('de')
  })
})