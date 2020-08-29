import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ModalProvider, { useModal } from '../src';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

const HelloWorldDialog = ({
  title,
  description,
  onCancel,
  onConfirm,
  ...props
}) => (
  <Dialog open={false} {...props}>
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

const Demo = () => {
  const { showModal } = useModal();

  const handleClick = () => {
    let timeoutId;

    // Show `HelloWorldDialog` with initial props
    const modal = showModal(HelloWorldDialog, {
      title: 'Hello World',
      description: 'description text',
      onConfirm: () => modal.hide(),
      onCancel: () => modal.hide(),
      onExited: () => {
        // =========================
        // ⚠️ Be careful with setImmediate, setInterval and setTimeout
        // ⚠️ don't forget to clean up id after closing dialog.
        // ⚠️ use `onExited` or `onClose` callback for this.
        // =========================
        clearTimeout(timeoutId);
      }
    });

    // Updating props if needed.
    timeoutId = setTimeout(() => {
      modal.update({
        title: 'Updated hello world',
        description: 'updated description text',
      });
    }, 1000);
  };

  return (
    <Button
      variant="contained"
      onClick={handleClick}
      color="primary"
    >
      show modal
    </Button>
  )
}

const App = () => (
  <ModalProvider>
    <Demo />
  </ModalProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
