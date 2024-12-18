import VegemiteView from '@/views/viewsInBackGround/VegemiteView.vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import vuetify from '@/plugins/vuetify.js'
import { i18n } from '@/utils/languages/i18n.js'

describe('VegemiteView', () => {
  it('should show "vegemite" after button click', async () => {
    const component = mount(VegemiteView, {
      global: {
        plugins: [vuetify, i18n],
      }
    });
    expect(component.find('button')).not.toBe(null);
    await component.find('button').trigger('click');
    expect(component.find('[data-test="vegemite-card-test"]').exists()).toBe(true);
  });
})