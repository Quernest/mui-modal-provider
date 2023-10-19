import React, { ReactNode, FC } from 'react';
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

export const NoSuspenseModalProviderWrapper: FC<Props> = ({ children }) => (
  <ModalProvider suspense={false}>{children}</ModalProvider>
);
