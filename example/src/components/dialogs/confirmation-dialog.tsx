import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Button from '@mui/material/Button';

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
