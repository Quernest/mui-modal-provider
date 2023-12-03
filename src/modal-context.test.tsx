import React from 'react';
import {
  act,
  renderHook,
  WrapperComponent,
} from '@testing-library/react-hooks';
import { ModalProviderWrapper } from './test-utils';
import useModal from './use-modal';
import { ModalContextState } from './modal-context';

describe('ModalContext', () => {
  const rootId = '123';
  const modalId = '321';

  const testHook = (wrapper?: WrapperComponent<any>) => {
    const { result } = renderHook(() => useModal(), { wrapper });
    const ctx = result.current as ModalContextState;

    const performModalActions = (modal: any) => {
      act(() => {
        modal.update({});
        modal.hide();
        modal.destroy();
      });
    };

    return { ctx, performModalActions };
  };

  const runTests = (
    context: ModalContextState,
    wrapper?: WrapperComponent<any>
  ) => {
    const { performModalActions } = testHook(wrapper);

    act(() => {
      const modal = context.showModal(() => <div>test</div>);
      performModalActions(modal);
    });

    act(() => {
      context.updateModal(modalId, {});
    });

    act(() => {
      context.hideModal(modalId);
    });

    act(() => {
      context.destroyModal(modalId);
    });

    act(() => {
      context.destroyModalsByRootId(rootId);
    });
  };

  test('should be initialized with correct state', () => {
    const { ctx } = testHook(ModalProviderWrapper);
    expect(ctx).toMatchObject({
      destroyModal: expect.any(Function),
      destroyModalsByRootId: expect.any(Function),
      hideModal: expect.any(Function),
      showModal: expect.any(Function),
      state: {},
      updateModal: expect.any(Function),
    });

    runTests(ctx, ModalProviderWrapper);
  });

  test('should be initialized without context provider and return fallback', () => {
    const { ctx } = testHook(undefined);
    expect(ctx).toMatchObject({
      destroyModal: expect.any(Function),
      destroyModalsByRootId: expect.any(Function),
      hideModal: expect.any(Function),
      showModal: expect.any(Function),
      state: {},
      updateModal: expect.any(Function),
    });

    runTests(ctx);
  });
});
