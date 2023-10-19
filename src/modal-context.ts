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

const ModalContext = createContext<ModalContextState | undefined>(undefined);

export default ModalContext;
