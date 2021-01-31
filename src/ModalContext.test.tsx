import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import ModalContext, { initialContextState } from './ModalContext';
import { ModalContextProviderWrapper as wrapper } from './test';

describe('ModalContext (initial state)', () => {
  const rootId = '123';
  const modalId = '321';

  test('should be initialized with correct state', () => {
    const { result } = renderHook(() => React.useContext(ModalContext), {
      wrapper,
    });

    // check initial state
    expect(result.current).toMatchObject(initialContextState);

    // show and modal instance actions
    act(() => {
      const showModal = result.current.makeShowModal(rootId);
      const modal = showModal(() => <div>test</div>, {});

      // actions on modal instance
      modal.update({});
      modal.hide();
      modal.destroy();
    });

    // update modal actions
    act(() => {
      result.current.updateModal(modalId, {});
    });

    // hide modal actions
    act(() => {
      result.current.hideModal(modalId);
    });

    // destroy modal actions
    act(() => {
      result.current.destroyModal(modalId);
    });

    // destroy root modals actions
    act(() => {
      result.current.destroyModalsByRootId(rootId);
    });
  });
});
