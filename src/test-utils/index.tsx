import React from 'react';

import ModalContext, { initialContextState } from '../ModalContext';
import ModalProvider from '../ModalProvider';

export const OnCloseEvent = new Event('close');
export const OnExitedEvent = new Event('exited');

export type ModalProps = {
  open?: boolean;
  text: string;
  onExited?: (args: any) => void;
  onClose?: (args: any) => void;
};

export const Modal: React.FC<ModalProps> = ({
  open,
  text,
  onExited,
  onClose,
}) => {
  React.useEffect(() => {
    if (!open) {
      if (onClose) {
        onClose(OnCloseEvent);
      }

      if (onExited) {
        onExited(OnExitedEvent);
      }
    }
  }, [open, onExited, onClose]);

  if (!open) {
    return null;
  }

  return <div>{text}</div>;
};

export const ModalProviderWrapper: React.FC = ({ children }) => (
  <ModalProvider>{children}</ModalProvider>
);

export const ModalContextProviderWrapper: React.FC = ({ children }) => (
  <ModalContext.Provider value={initialContextState}>
    {children}
  </ModalContext.Provider>
);
