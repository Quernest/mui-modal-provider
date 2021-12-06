import * as React from 'react';
import Box from '@mui/material/Box';
import Modal, { ModalProps } from '@mui/material/Modal';

const style = {
  position: 'absolute',
  width: 400,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 5,
  p: 4,
};

type Props = Omit<ModalProps, 'children'> & {};

const SimpleModal: React.FC<Props> = props => (
  <Modal {...props}>
    <Box sx={style}>
      <h2>Simple Modal</h2>
    </Box>
  </Modal>
);

export default SimpleModal;
