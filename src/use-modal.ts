import { useContext, useCallback, useEffect, useRef } from 'react';
import { ShowFn } from './types';

import ModalContext from './modal-context';
import { uid } from './utils';

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
  } = useContext(ModalContext);
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
