import * as React from 'react';
import Modal, { ModalProps } from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TransitionProps } from '@mui/material/transitions';

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
  /**
   * 💡 if you are using material-ui before version 5,
   * then you should use `onExited` (and other methods) directly from props.
   * @see https://next.material-ui.com/guides/migration-v4/#dialog migration changes.
   *
   * @example
   * ```jsx
   * const { onExited, ...otherProps } = props;
   *
   * <Fade onExited={onExited} />
   * ```
   */
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
