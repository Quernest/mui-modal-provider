import { useCallback, useEffect, useRef } from 'react';
import { ShowFn } from './types';
import { uid } from './utils';
import useModalContext from './use-modal-context';

export interface UseModalOptions {
  disableAutoDestroy?: boolean;
}

const defaultOptions: UseModalOptions = {
  disableAutoDestroy: false,
};

export default function useModal(options: UseModalOptions = defaultOptions) {
  const { disableAutoDestroy } = { ...defaultOptions, ...options };
  const {
    showModal,
    destroyModalsByRootId: destroy,
    ...otherContextProps
  } = useModalContext();
  const id = useRef<string>(uid(6));

  useEffect(
    () => () => {
      if (!disableAutoDestroy) {
        destroy(id.current);
      }
    },
    [disableAutoDestroy, destroy]
  );

  return {
    showModal: useCallback<ShowFn>(
      (component, props, options) =>
        showModal(component, props, { rootId: id.current, ...options }),
      [showModal]
    ),
    ...otherContextProps,
  };
}
