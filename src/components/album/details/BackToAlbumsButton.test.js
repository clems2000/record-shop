import { describe, expect, it, vi } from 'vitest'
import { useRouter } from 'vue-router'
import BackToAlbumsButton from '@/components/album/details/BackToAlbumsButton.vue'
import { mountComponent } from '@/utils/testHelper.js'


vi.mock('vue-router', async () => {
  const actual = await vi.importActual('vue-router')
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: () => {}
    }))
  }
})


describe('BackToAlbumsButton', () => {

  it('should route to correct path with button click', async () => {
    const push = vi.fn();
    useRouter.mockImplementationOnce(() => ({
      push
    }))

    const component = mountComponent(BackToAlbumsButton)

    expect(component.find('[data-test="to-albums-button"]').exists()).toBe(true);
    expect(push).not.toHaveBeenCalled();
    expect(push).toHaveBeenCalledTimes(0);
    await component.find('[data-test="to-albums-button"]').trigger('click');

    expect(push).toHaveBeenCalledTimes(1);
    expect(push).toHaveBeenCalledWith({name: 'albums'});

  })
})