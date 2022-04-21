import React from 'react';

import ModalContext, { initialContextState } from '../modal-context';
import ModalProvider from '../modal-provider';

export const OnCloseEvent = new Event('close');
export const OnExitedEvent = new Event('exited');

export const ModalProviderWrapper: React.FC = ({ children }) => (
  <ModalProvider>{children}</ModalProvider>
);

export const LegacyModalProviderWrapper: React.FC = ({ children }) => (
  <ModalProvider legacy>{children}</ModalProvider>
);

export const ModalContextProviderWrapper: React.FC = ({ children }) => (
  <ModalContext.Provider value={initialContextState}>
    {children}
  </ModalContext.Provider>
);
