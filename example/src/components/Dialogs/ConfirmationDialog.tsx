import * as React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

type Props = DialogProps & {
  title: string;
  description: string;
  onCancel: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onConfirm: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const ConfirmationDialog: React.FC<Props> = ({
  title,
  description,
  onCancel,
  onConfirm,
  ...props
}) => (
  <Dialog {...props}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="primary">
        Ok
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmationDialog;
