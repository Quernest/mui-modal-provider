import * as React from 'react';
import Modal, { ModalProps } from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { TransitionProps } from '@material-ui/core/transitions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

type Props = Omit<ModalProps, 'children'> & {
  TransitionProps: TransitionProps;
};

export default function TransitionsModal({ open, ...props }: Props) {
  const { TransitionProps = {}, ...otherProps } = props;

  return (
    <Modal
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      open={open}
      {...otherProps}
    >
      <Fade in={open} {...TransitionProps}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}
