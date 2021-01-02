import * as React from 'react';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useModal } from '../../../../src';

type Props = DialogProps & {
  // nesting level
  deep: number;
};

const NestedDialog: React.FC<Props> = ({ deep = 0, ...props }) => {
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
