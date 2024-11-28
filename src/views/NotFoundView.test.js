import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import vuetify from '@/plugins/vuetify.js'
import router from '@/router/index.js'
import NotFoundView from '@/views/NotFoundView.vue'
import { i18n } from '@/utils/languages/i18n.js'


describe('NotFoundView', () => {

  it('should route to correct path with button click 2', async () => {
    const push = vi.spyOn(router, 'push')

    const component = mount(NotFoundView, {
      global: {
        plugins: [
          vuetify, router, i18n
        ],
      }
    })

    expect(component.find('[data-test="back-to-albums-button"]').exists()).toBe(true);
    expect(push).not.toHaveBeenCalled();
    expect(push).toHaveBeenCalledTimes(0);
    await component.find('[data-test="back-to-albums-button"]').trigger('click');

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith({name: 'albums'});

  })
})