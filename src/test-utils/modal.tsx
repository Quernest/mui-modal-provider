import React from 'react';
import { OnExitedEvent, OnCloseEvent } from './index';

export type ModalProps = {
  open?: boolean;
  text: string;
  TransitionProps?: {
    onExited?: (args: any) => void;
  };
  onClose?: (args: any) => void;
};

const Modal: React.FC<ModalProps> = ({
  open,
  text,
  TransitionProps,
  onClose,
}) => {
  React.useEffect(() => {
    if (!open) {
      if (onClose) {
        onClose(OnCloseEvent);
      }

      if (TransitionProps?.onExited) {
        TransitionProps.onExited(OnExitedEvent);
      }
    }
  }, [open, TransitionProps, onClose]);

  if (!open) {
    return null;
  }

  return <div>{text}</div>;
};

export default Modal;
