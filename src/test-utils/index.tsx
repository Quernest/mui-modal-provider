import React, { ReactNode, FC } from 'react';

import ModalContext, { initialContextState } from '../modal-context';
import ModalProvider from '../modal-provider';

export const OnCloseEvent = new Event('close');
export const OnExitedEvent = new Event('exited');

interface Props {
  children: ReactNode;
}

export const ModalProviderWrapper: FC<Props> = ({ children }) => (
  <ModalProvider>{children}</ModalProvider>
);

export const LegacyModalProviderWrapper: FC<Props> = ({ children }) => (
  <ModalProvider legacy>{children}</ModalProvider>
);

export const ModalContextProviderWrapper: FC<Props> = ({ children }) => (
  <ModalContext.Provider value={initialContextState}>
    {children}
  </ModalContext.Provider>
);
