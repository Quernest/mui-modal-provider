import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';

import * as utils from './utils';
import ModalContext from './ModalContext';
import {
  ModalProviderWrapper as wrapper,
  Modal,
  ModalProps,
  OnCloseEvent,
  OnExitedEvent,
} from './test-utils';
import { Options, ShowFnOutput, State } from './types';
import { MISSED_MODAL_ID_ERROR_MESSAGE } from './constants';

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
  };

  let uidSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    uidSpy = jest.spyOn(utils, 'uid').mockReturnValueOnce(modalId);
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    uidSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  test('happy path scenario (with options)', () => {
    const { result } = renderHook(() => React.useContext(ModalContext), {
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
    const { result } = renderHook(() => React.useContext(ModalContext), {
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

  test('happy path scenario (without options)', () => {
    const { result } = renderHook(() => React.useContext(ModalContext), {
      wrapper,
    });

    act(() => {
      modal = result.current.showModal(Modal, modalProps);
    });

    const expectedState: State = {
      [modalId]: {
        component: Modal,
        props: {
          open: true,
          ...modalProps,
        },
      },
    };

    expect(result.current.state).toEqual(expectedState);
  });

  it('should automaticaly destroy on close', () => {
    const { result } = renderHook(() => React.useContext(ModalContext), {
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
    const { result } = renderHook(() => React.useContext(ModalContext), {
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

  it('should fire onExited prop event on hide', () => {
    const { result } = renderHook(() => React.useContext(ModalContext), {
      wrapper,
    });

    const onExited = jest.fn();

    act(() => {
      modal = result.current.showModal(
        Modal,
        { ...modalProps, onExited },
        modalOptions
      );

      modal.hide();
    });

    expect(onExited).toHaveBeenCalledWith(OnExitedEvent);
    expect(result.current.state[id]).toEqual(undefined);
  });
});
