import { act, renderHook } from '@testing-library/react-hooks';

import { ModalProviderWrapper as wrapper } from './test-utils';
import Modal from './test-utils/modal';
import * as utils from './utils';
import { State } from './types';
import useModal from './use-modal';

describe('useModal', () => {
  const modalId = '000';
  const rootId = '111';
  const delimiter = '.';
  const id = `${rootId}${delimiter}${modalId}`;

  let uidSpy: jest.SpyInstance;

  beforeEach(() => {
    uidSpy = jest
      .spyOn(utils, 'uid')
      .mockReturnValueOnce(rootId)
      .mockReturnValueOnce(modalId);
  });

  afterEach(() => {
    uidSpy.mockRestore();
  });

  it('should render hook (without options)', () => {
    renderHook(() => useModal(), { wrapper });
  });

  it('should render hook (with "disableAutoDestroy: true" option)', () => {
    renderHook(() => useModal({ disableAutoDestroy: true }), { wrapper });
  });

  it('should handle show modal (with options)', () => {
    const { result } = renderHook(() => useModal(), { wrapper });

    const expectedState: State = {
      [id]: {
        component: Modal,
        options: {
          rootId,
          destroyOnClose: true,
          hideOnClose: true
        },
        props: {
          open: true,
        },
      },
    };

    act(() => {
      result.current.showModal(Modal, undefined, expectedState[id].options);
    });

    expect(result.current.state).toEqual(expectedState);
  });
});
