import React, { FC } from 'react';
import { ModalContext } from './ModalContext';

const ModalProvider: FC = ({ children }) => {
  const hideModal = () => {};
  const destroyModal = () => {};
  const showModal = () => {};

  return (
    <ModalContext.Provider value={{ hideModal, showModal, destroyModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
