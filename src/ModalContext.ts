import { createContext } from 'react';
import { IState, IProps } from './State';

export interface IModalContext {
  state: IState;
  hideModal(id: string): void;
  showModal(
    component: React.ComponentType<any>,
    props: IProps
  ): {
    id: string;
    hide: () => void;
    destroy: () => void;
    update: (newProps: IProps) => void;
  };
  destroyModal(id: string): void;
}

export const ModalContext = createContext<IModalContext>({
  state: {},
  hideModal: () => {},
  showModal: () => ({
    id: 'id',
    hide: () => {},
    destroy: () => {},
    update: () => {},
  }),
  destroyModal: () => {},
});
