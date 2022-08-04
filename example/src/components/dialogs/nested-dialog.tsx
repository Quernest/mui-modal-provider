import * as React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useModal } from '../../../../src';

export interface NestedDialogProps extends DialogProps {
  deep: number;
};

const NestedDialog: React.FC<NestedDialogProps> = ({ deep = 0, ...props }) => {
  const { showModal } = useModal();

  const handleClick = () => {
    // 📜 let's open the same dialog, but in a real example
    // it can be any other with nested dialogs.
    // You can open as many as you want
    showModal(NestedDialog, { deep: deep + 1 });
  };

  return (
    <Dialog {...props}>
      <DialogTitle>Nested Dialog</DialogTitle>
      <DialogContent>Deep: {deep}</DialogContent>
      <DialogActions>
        <Button onClick={handleClick}>next</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NestedDialog;
