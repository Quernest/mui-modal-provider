import { act, renderHook } from '@testing-library/react-hooks';
import * as utils from './utils';
import {
  LegacyModalProviderWrapper as legacyWrapper,
  ModalProviderWrapper as wrapper,
  NoSuspenseModalProviderWrapper as noSuspenseWrapper,
  OnCloseEvent,
  OnExitedEvent,
} from './test-utils';
import Modal, { ModalProps } from './test-utils/modal';
import LegacyModal from './test-utils/legacy-modal';
import { Options, ShowFnOutput, State } from './types';
import { MISSED_MODAL_ID_ERROR_MESSAGE } from './constants';
import useModal from './use-modal';

describe('ModalProvider', () => {
  const rootId = '000';
  const modalId = '111';
  const delimiter = '.';
  const id = `${rootId}${delimiter}${modalId}`;

  let modal: ShowFnOutput<ModalProps>;

  const modalProps: ModalProps = {
    text: 'text',
  };

  const modalOptions: Options = {
    rootId,
    hideOnClose: true,
  };

  let uidSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    uidSpy = jest.spyOn(utils, 'uid').mockReturnValue(modalId);
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    uidSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  test('happy path scenario (with options)', () => {
    uidSpy = jest.spyOn(utils, 'uid').mockReturnValueOnce(rootId);
    const { result } = renderHook(() => useModal(), {
      wrapper,
    });

    const expectedState: State = {
      [id]: {
        component: Modal,
        options: modalOptions,
        props: {
          open: true,
          ...modalProps,
        },
      },
    };

    const updatedTextProp: string = 'updated text';

    act(() => {
      modal = result.current.showModal(Modal, modalProps, modalOptions);
    });

    expect(result.current.state).toEqual(expectedState);
    expect(modal.id).toBe(id);

    act(() => {
      modal.update({ text: updatedTextProp });
    });

    expect(result.current.state[id].props).toEqual({
      ...modalProps,
      open: true,
      text: updatedTextProp,
    });

    act(() => {
      modal.hide();
      modal.destroy();
    });

    expect(result.current.state[id]).toBe(undefined);
  });

  test('unhappy path (missed ID errors)', () => {
    const { result } = renderHook(() => useModal(), {
      wrapper,
    });

    act(() => {
      modal = result.current.showModal(Modal, modalProps);
    });

    act(() => {
      result.current.hideModal('');
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        MISSED_MODAL_ID_ERROR_MESSAGE
      );
    });

    act(() => {
      result.current.destroyModal('');
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        MISSED_MODAL_ID_ERROR_MESSAGE
      );
    });

    act(() => {
      result.current.updateModal('', {});
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        MISSED_MODAL_ID_ERROR_MESSAGE
      );
    });

    act(() => {
      result.current.destroyModalsByRootId('');
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        MISSED_MODAL_ID_ERROR_MESSAGE
      );
    });
  });

  test('happy path scenario (without options provided)', () => {
    uidSpy = jest.spyOn(utils, 'uid').mockReturnValueOnce(rootId);
    const { result } = renderHook(() => useModal(), {
      wrapper,
    });

    act(() => {
      modal = result.current.showModal(Modal, modalProps);
    });

    const expectedState: State = {
      [id]: {
        component: Modal,
        options: {
          hideOnClose: true,
          rootId: rootId,
        },
        props: {
          open: true,
          ...modalProps,
        },
      },
    };

    expect(result.current.state).toEqual(expectedState);
  });

  it('should automaticaly destroy on close', () => {
    const { result } = renderHook(() => useModal(), {
      wrapper,
    });

    act(() => {
      modal = result.current.showModal(Modal, modalProps, {
        ...modalOptions,
        destroyOnClose: true,
      });

      modal.hide();
    });

    expect(result.current.state[id]).toEqual(undefined);
  });

  it('should fire onClose prop event on hide', () => {
    const { result } = renderHook(() => useModal(), {
      wrapper,
    });

    const onClose = jest.fn();

    act(() => {
      modal = result.current.showModal(
        Modal,
        { ...modalProps, onClose },
        modalOptions
      );

      modal.hide();
    });

    expect(onClose).toHaveBeenCalledWith(OnCloseEvent);
    expect(result.current.state[id]).toEqual(undefined);
  });

  it('should fire TransitionProps.onExited prop event on hide', () => {
    const { result } = renderHook(() => useModal(), {
      wrapper: noSuspenseWrapper,
    });

    const onExited = jest.fn();

    act(() => {
      modal = result.current.showModal(
        Modal,
        { ...modalProps, TransitionProps: { onExited } },
        modalOptions
      );

      modal.hide();
    });

    expect(onExited).toHaveBeenCalledWith(OnExitedEvent);
    expect(result.current.state[id]).toEqual(undefined);
  });

  it('should fire onExited prop event on hide', () => {
    const { result } = renderHook(() => useModal(), {
      wrapper: legacyWrapper,
    });

    const onExited = jest.fn();

    act(() => {
      modal = result.current.showModal(
        LegacyModal,
        { onExited, text: '' },
        modalOptions
      );

      modal.hide();
    });

    expect(onExited).toHaveBeenCalledWith(OnExitedEvent);
    expect(result.current.state[id]).toEqual(undefined);
  });
});
