import * as React from 'react';
import { makeStyles, createStyles } from '@material-ui/styles';
import Modal, { ModalProps } from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) =>
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

type Props = Omit<ModalProps, 'children'> & {};

const SimpleModal: React.FC<Props> = (props) => {
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
