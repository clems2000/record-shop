import { flushPromises } from '@vue/test-utils'
import PaginationButtons from './PaginationButtons.vue'
import { describe, it, expect } from 'vitest'
import { mountComponent } from '@/utils/testHelper.js'

describe('PaginationButtons', () => {

  it('emits "previousPage" when previous button is clicked', async () => {
    const component = mountComponent(PaginationButtons, {props: {
        prevBtnDisabled: false,
        nextBtnDisabled: false
      }})
    await component.find('[data-test="previous-page-button"]').trigger('click');
    expect(component.emitted().previousPage).toBeTruthy();
  });

  it('emits "nextPage" when next button is clicked', async () => {
    const component = mountComponent(PaginationButtons, {props: {
        prevBtnDisabled: false,
        nextBtnDisabled: false
      }})
    await component.find('[data-test="next-page-button"]').trigger('click');
    expect(component.emitted().nextPage).toBeTruthy();
  });

  it('disables the previous button when prevBtnDisabled is true', async () => {
    const component = mountComponent(PaginationButtons,  {
      props: {
        prevBtnDisabled: true,
        nextBtnDisabled: false
      }
    })
    await flushPromises();
    expect(component.find('[data-test="previous-page-button"]').element.disabled).toBe(true);
  });


  it('disables the next button when nextBtnDisabled is true', async () => {
    const component = mountComponent(PaginationButtons,  {
      props: {
        prevBtnDisabled: false,
        nextBtnDisabled: true
      }
    })
    await flushPromises();
    expect(component.find('[data-test="next-page-button"]').element.disabled).toBe(true);
  });
});