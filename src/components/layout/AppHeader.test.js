import AppHeader from '@/components/layout/AppHeader.vue'
import { expect, describe, it, beforeEach } from 'vitest'
import { mountComponentWithStoreAndRouter } from '@/utils/testHelper.js'
import { useUserStore } from '@/stores/userStore.js'
import { flushPromises } from '@vue/test-utils'

describe('AppHeader', () => {

  let component;
  let store;
  beforeEach(() => {
    component = mountComponentWithStoreAndRouter(AppHeader, {}, {stubActions: false, initialState: {userDetails: {language: 'en', currentTheme: false}}});
    store = useUserStore();
  })

  it('should render Record shop in the header on mount', () => {
    expect(component.find('[data-test="record-shop-page-link"]').exists()).toBe(true);
  })
  it('should render language tab', () => {
    expect(component.find('[data-test="language-tab"]').exists()).toBe(true);
  })
  it('should render the language tab with a default of english', () => {
    expect(component.find('[data-test="language-tab"]').text()).toContain('English');
  })

  it('should render the title in german if language is set to german in store', async () => {
    store.currentLanguage = 'de';
    await flushPromises();
    expect(component.find('[data-test="record-shop-page-link"]').text()).toContain("Schallplattenladen");
  })

  it('should render the theme tab', () => {
    expect(component.find('[data-test="theme-switch-toggle"]').exists()).toBe(true);
  })

  it('should toggle the theme when v-switch is clicked', async () => {
    expect(component.find('[data-test="theme-switch-toggle"]').exists()).toBe(true)
    const store = useUserStore()
    expect(store.currentTheme).toBe(false)

    await component.vm.toggleTheme()

    await flushPromises()

    expect(store.changeTheme).toHaveBeenCalledTimes(1)
    expect(store.changeTheme).toHaveBeenCalledWith(true)




    expect(store.currentTheme).toBe(true)

    await component.vm.toggleTheme()

    await flushPromises()

    expect(store.changeTheme).toHaveBeenCalledTimes(2)
    expect(store.changeTheme).toHaveBeenCalledWith(false)
  })

});