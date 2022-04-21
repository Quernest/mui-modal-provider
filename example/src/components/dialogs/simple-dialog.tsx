import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

const SimpleDialog: React.FC<DialogProps> = props => (
  <Dialog {...props}>
    <DialogTitle>Simple Dialog</DialogTitle>
  </Dialog>
);

export default SimpleDialog;
