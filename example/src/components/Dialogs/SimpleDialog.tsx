import * as React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

const SimpleDialog: React.FC<DialogProps> = props => (
  <Dialog {...props}>
    <DialogTitle>Simple Dialog</DialogTitle>
  </Dialog>
);

export default SimpleDialog;
