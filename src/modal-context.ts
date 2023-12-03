import { createContext } from 'react';
import {
  State,
  HideFn,
  ShowFn,
  DestroyFn,
  DestroyByRootIdFn,
  UpdateFn,
} from './types';

export interface ModalContextState {
  state: State;
  updateModal: UpdateFn;
  hideModal: HideFn;
  destroyModal: DestroyFn;
  destroyModalsByRootId: DestroyByRootIdFn;
  showModal: ShowFn;
}

export const modalContextFallback: ModalContextState = {
  state: {},
  updateModal: () => undefined,
  hideModal: () => undefined,
  destroyModal: () => undefined,
  destroyModalsByRootId: () => undefined,
  showModal: () => ({
    id: 'id',
    hide: () => undefined,
    destroy: () => undefined,
    update: () => undefined,
  }),
};

const ModalContext = createContext<ModalContextState | undefined>(undefined);

export default ModalContext;
