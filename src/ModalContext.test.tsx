import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import ModalContext, { initialContextState } from './ModalContext';
import { ModalContextProviderWrapper as wrapper } from './test-utils';

describe('ModalContext', () => {
  const rootId = '123';
  const modalId = '321';

  test('should be initialized with correct state', () => {
    const { result } = renderHook(() => React.useContext(ModalContext), {
      wrapper,
    });

    expect(result.current).toMatchObject(initialContextState);

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
