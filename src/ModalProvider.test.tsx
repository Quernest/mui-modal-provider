import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import { ModalProviderWrapper as wrapper, Modal } from './test-utils';
import ModalContext from './ModalContext';
import * as utils from './utils';

describe('ModalProvider', () => {
  const rootId = '123';
  const modalId = '321';
  const id = `${rootId}.${modalId}`;

  jest.spyOn(utils, 'uid').mockReturnValueOnce(modalId);

  test('dialog', () => {
    const onCloseFn = jest.fn();
    const onExitedFn = jest.fn();

    const { result } = renderHook(() => React.useContext(ModalContext), {
      wrapper,
    });

    act(() => {
      result.current.showModal(
        Modal,
        {
          text: 'text',
          onClose: onCloseFn,
          onExited: onExitedFn,
        },
        { rootId }
      );
    });

    expect(result.current.state).toEqual({
      [id]: {
        component: Modal,
        options: {
          rootId,
        },
        props: {
          open: true,
          text: 'text',
          onClose: onCloseFn,
          onExited: onExitedFn,
        },
      },
    });

    act(() => {
      result.current.updateModal(id, { text: 'updated text' });
    });

    expect(result.current.state).toEqual({
      [id]: {
        component: Modal,
        options: {
          rootId,
        },
        props: {
          open: true,
          text: 'updated text',
          onClose: onCloseFn,
          onExited: onExitedFn,
        },
      },
    });
  });
});
