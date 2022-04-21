import React from 'react';
import { OnExitedEvent, OnCloseEvent } from './index';

export type LegacyModalProps = {
  open?: boolean;
  text: string;
  onExited?: (args: any) => void;
  onClose?: (args: any) => void;
};

const LegacyModal: React.FC<LegacyModalProps> = ({
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

export default LegacyModal;
