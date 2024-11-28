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

  it('should set a different language', () => {
    const store = useUserStore()
    expect(store.currentLanguage).toEqual('en')
    store.changeLanguage('de')
    expect(store.currentLanguage).toEqual('de')
  })

  it('should change the theme', () => {
    const store = useUserStore()
    expect(store.currentTheme).toEqual(false)
    store.changeTheme(true)
    expect(store.currentTheme).toEqual(true)
  })

  it('should get the current theme being used', () => {
    const store = useUserStore()
    expect(store.getCurrentTheme).toEqual(false)
  })

})