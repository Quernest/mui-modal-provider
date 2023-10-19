import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { ModalProviderWrapper as wrapper } from './test-utils';
import useModalContext from './use-modal-context';

describe('ModalContext', () => {
  const rootId = '123';
  const modalId = '321';

  test('should be initialized with correct state', () => {
    const { result } = renderHook(() => useModalContext(), {
      wrapper,
    });

    expect(result.current).toMatchObject({
      destroyModal: expect.any(Function),
      destroyModalsByRootId: expect.any(Function),
      hideModal: expect.any(Function),
      showModal: expect.any(Function),
      state: {},
      updateModal: expect.any(Function),
    });

    act(() => {
      const modal = result.current.showModal(() => <div>test</div>);
      modal.update({});
      modal.hide();
      modal.destroy();
    });

    act(() => {
      result.current.updateModal(modalId, {});
    });

    act(() => {
      result.current.hideModal(modalId);
    });

    act(() => {
      result.current.destroyModal(modalId);
    });

    act(() => {
      result.current.destroyModalsByRootId(rootId);
    });
  });
});
