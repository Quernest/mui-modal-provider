import React from 'react';

import ModalContext, { initialContextState } from '../ModalContext';
import ModalProvider from '../ModalProvider';

export const CloseEvent = new Event('close');
export const ExpitedEvent = new Event('exited');

export type ModalProps = {
  open: boolean;
  text: string;
  onExited?: (args: any) => void;
  onClose?: (args: any) => void;
};

/**
 * Simple modal example for testing cases
 */
export const Modal: React.FC<ModalProps> = ({
  open,
  text,
  onExited,
  onClose,
}) => {
  React.useEffect(() => {
    if (!open) {
      if (onClose) {
        onClose(CloseEvent);
      }

      if (onExited) {
        onExited(ExpitedEvent);
      }
    }
  }, [open, onExited, onClose]);

  if (!open) {
    return null;
  }

  return <div>{text}</div>;
};

/**
 * ModalProvider with functions provided as initial values for ModalContext.Provider
 */
export const ModalProviderWrapper: React.FC = ({ children }) => (
  <ModalProvider>{children}</ModalProvider>
);

/**
 * Modal Context provider with default values
 */
export const ModalContextProviderWrapper: React.FC = ({ children }) => (
  <ModalContext.Provider value={initialContextState}>
    {children}
  </ModalContext.Provider>
);
