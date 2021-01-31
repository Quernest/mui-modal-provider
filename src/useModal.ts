import { useContext, useEffect, useRef } from 'react';

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
    makeShowModal,
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

  return { showModal: makeShowModal(id.current), ...otherContextProps };
}
