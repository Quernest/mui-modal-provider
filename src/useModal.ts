import { useContext, useEffect, useCallback, useRef } from 'react';
import ModalContext from './ModalContext';
import { IProps } from './State';
import { uid } from './utils';

interface IOptions {
  disableAutoDestroy?: boolean;
}

export default function useModal({ disableAutoDestroy }: IOptions = {}) {
  const rootIdRef = useRef<string>(uid(6));
  const { showModal, destroyModalsByRootId, ...ctx } = useContext(ModalContext);

  const handleShowModal = useCallback(
    (component: React.ComponentType<any>, props: IProps) => {
      const id = `${rootIdRef.current}.${uid(8)}`;
      return showModal(id, component, props);
    },
    [showModal]
  );

  useEffect(
    () => () => {
      if (!disableAutoDestroy) {
        destroyModalsByRootId(rootIdRef.current);
      }
    },
    [destroyModalsByRootId]
  );

  return { showModal: handleShowModal, ...ctx };
}
