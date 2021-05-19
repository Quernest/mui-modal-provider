import { useContext, useCallback, useEffect, useRef } from 'react';
import { ShowFn } from './types';

import ModalContext from './ModalContext';
import { uid } from './utils';

type Options = {
  disableAutoDestroy?: boolean;
};

const defaultOptions: Options = {
  disableAutoDestroy: false,
};

export default function useModal(options: Options = defaultOptions) {
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
