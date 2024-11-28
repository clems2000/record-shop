import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import vuetify from '@/plugins/vuetify.js'
import RouteToAlbumsButton2 from '@/components/album/details/BackToAlbumsButton2.vue'
import router from '@/router/index.js'


describe('BackToAlbumsButton2', () => {

  it('should route to correct path with button click 2', async () => {
   const push = vi.spyOn(router, 'push')

    const component = mount(RouteToAlbumsButton2, {
      global: {
        plugins: [
          vuetify, router
        ],
      }
    })

    expect(component.find('[data-test="to-albums-button2"]').exists()).toBe(true);
    expect(push).not.toHaveBeenCalled();
    expect(push).toHaveBeenCalledTimes(0);
    await component.find('[data-test="to-albums-button2"]').trigger('click');

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith({name: 'albums'});

  })
})