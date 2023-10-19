import { useContext } from 'react';
import ModalContext from './modal-context';

export default function useModalContext() {
  const context = useContext(ModalContext);

  if (context === undefined) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }

  return context;
}
