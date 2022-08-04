import * as React from 'react';
import Box from '@mui/material/Box';
import Modal, { ModalProps } from '@mui/material/Modal';
import { SxProps, Theme } from '@mui/material/styles';

const style: SxProps<Theme> = {
  position: 'absolute',
  width: 400,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 5,
  p: 4,
};

export interface SimpleModalProps extends Omit<ModalProps, 'children'> {};

const SimpleModal: React.FC<SimpleModalProps> = props => (
  <Modal {...props}>
    <Box sx={style}>
      <h2>Simple Modal</h2>
    </Box>
  </Modal>
);

export default SimpleModal;
