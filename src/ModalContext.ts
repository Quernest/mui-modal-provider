import { createContext } from 'react';
import { IState, IProps } from './State';

interface IModalContext {
  state: IState;
  hideModal(id: string): void;
  showModal(
    id: string,
    component: React.ComponentType<any>,
    props: IProps
  ): {
    id: string;
    hide: () => void;
    destroy: () => void;
    update: (newProps: IProps) => void;
  };
  destroyModal(id: string): void;
  destroyModalsByRootId(rootId: string): void;
  updateModal(id: string, props: IProps): void;
}

const ModalContext = createContext<IModalContext>({
  state: {},
  hideModal: () => {},
  showModal: () => ({
    id: 'id',
    hide: () => {},
    destroy: () => {},
    update: () => {},
  }),
  destroyModal: () => {},
  updateModal: () => {},
  destroyModalsByRootId: () => {},
});

export default ModalContext;
