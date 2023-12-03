import { useContext } from 'react';
import ModalContext, { modalContextFallback } from './modal-context';
import { getModalConfig } from './modal-config';

export default function useModalContext() {
  const context = useContext(ModalContext);
  const { enforceProvider } = getModalConfig();

  if (enforceProvider && context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context || modalContextFallback;
}
