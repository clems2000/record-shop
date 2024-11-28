import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import vuetify from '@/plugins/vuetify.js'
import AlbumInformationHeader from '@/components/album/details/AlbumInformationHeader.vue'
import router from '@/router/index.js'

describe('AlbumInformationHeader', () => {
  it('should route to details path with tab click', async () => {
    const push = vi.spyOn(router, 'push')
    const component = mount(AlbumInformationHeader, {
      global: {
        plugins: [
          vuetify, router
        ],
      },
      props: {
        id: "1"
      }
    })

    expect(component.find('[data-test="tab-to-details"]').exists()).toBe(true);
    expect(push).not.toHaveBeenCalled();
    expect(push).toHaveBeenCalledTimes(0);
    await component.find('[data-test="tab-to-details"]').trigger('click');

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith({name: 'albumDetails', params: {id: "1"}});

  })


  it('should route to photos path with tab click', async () => {
    const push = vi.spyOn(router, 'push')

    const component = mount(AlbumInformationHeader, {
      global: {
        plugins: [
          vuetify, router
        ],
      },
      props: {
        id: "1"
      }
    })

    expect(component.find('[data-test="tab-to-photos"]').exists()).toBe(true);
    expect(push).not.toHaveBeenCalled();
    expect(push).toHaveBeenCalledTimes(0);
    await component.find('[data-test="tab-to-photos"]').trigger('click');

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith({name: 'albumPhotos', params: {id: "1"}});

  })

  it('should have the photos tab active when it is not a new album', async () => {
    const push = vi.spyOn(router, 'push')

    const component = mount(AlbumInformationHeader, {
      global: {
        plugins: [
          vuetify, router
        ],
      },
      props: {
        id: "99"
      }
    })

    expect(component.find('[data-test="tab-to-photos"]').exists()).toBe(true);
    expect(push).not.toHaveBeenCalled();
    expect(push).toHaveBeenCalledTimes(0);
    await component.find('[data-test="tab-to-photos"]').trigger('click');

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith({name: 'albumPhotos', params: {id: "99"}});
  })


  it('should not have the photos tab active when it is not a new album', async () => {
    const push = vi.spyOn(router, 'push')

    const component = mount(AlbumInformationHeader, {
      global: {
        plugins: [
          vuetify, router
        ],
      },
      props: {
        id: "101"
      }
    })

    expect(component.find('[data-test="tab-to-photos"]').exists()).toBe(true);
    expect(push).not.toHaveBeenCalled();
    expect(push).toHaveBeenCalledTimes(0);
    expect(component.find('[data-test="tab-to-photos"]').attributes('disabled'))

    expect(push).toHaveBeenCalledTimes(0);

  })
})