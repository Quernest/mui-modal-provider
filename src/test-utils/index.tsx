import React from 'react';

import ModalContext, { initialContextState } from '../ModalContext';
import ModalProvider from '../ModalProvider';

export const OnCloseEvent = new Event('close');
export const OnExitedEvent = new Event('exited');

export const ModalProviderWrapper: React.FC = ({ children }) => (
  <ModalProvider beta>{children}</ModalProvider>
);

export const LegacyModalProviderWrapper: React.FC = ({ children }) => (
  <ModalProvider beta={false}>{children}</ModalProvider>
);

export const ModalContextProviderWrapper: React.FC = ({ children }) => (
  <ModalContext.Provider value={initialContextState}>
    {children}
  </ModalContext.Provider>
);
