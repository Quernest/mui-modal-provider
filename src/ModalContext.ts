import { createContext } from 'react';

export interface IModalContext {
  hideModal(id: string): void;
  showModal(component: any, props: Object): void;
  destroyModal(id: string): void;
}

export const ModalContext = createContext<IModalContext>({
  hideModal: () => {},
  showModal: () => {},
  destroyModal: () => {},
});
