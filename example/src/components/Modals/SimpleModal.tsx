import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal, { ModalProps } from '@material-ui/core/Modal';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const SimpleModal: React.FC<ModalProps> = props => {
  const classes = useStyles();

  return (
    <Modal {...props}>
      <div className={classes.paper}>
        <h2>Simple Modal</h2>
      </div>
    </Modal>
  );
};

export default SimpleModal;
