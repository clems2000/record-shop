import { flushPromises } from '@vue/test-utils'
import DeleteDialogWindow from '@/components/album/listing/DeleteDialogWindow.vue'
import { describe, it, expect } from 'vitest'
import { mountComponent } from '@/utils/testHelper.js'


describe('DeleteDialogWindow', () => {

  it('emits "closeDialog" when cancel button is clicked', async () => {
    const component = mountComponent(DeleteDialogWindow, {props: {
        id: 1,
        title: 'Title'
      }})
    await component.find('[data-test="cancel-button"]').trigger('click');
    expect(component.emitted().closeDialog).toBeTruthy();
  });

  it('emits "closeDialogWithDelete" when delete button is clicked', async () => {
    const id = 1
    const component = mountComponent(DeleteDialogWindow, {props: {
        id: id,
        title: 'Title'
      }})
    await component.find('[data-test="confirm-delete-button"]').trigger('click');
    expect(component.emitted().closeDialogWithDelete, id).toBeTruthy();
    expect(component.emitted().closeDialogWithDelete[0][0]).toEqual(1);
  });

  it('should contain the title of the album', async () => {
    const title = 'Title';
    const component = mountComponent(DeleteDialogWindow,  {
      props: {
        id: 1,
        title: title
      }
    })
    await flushPromises();
    expect(component.text()).toContain(title);
  });

});