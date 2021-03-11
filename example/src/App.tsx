import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import MuiButton from '@material-ui/core/Button';
import { useModal } from '../../src';

import {
  SimpleDialog,
  NestedDialog,
  ConfirmationDialog,
  SimpleModal,
  TransitionModal,
} from './components';

const Button = withStyles(theme => ({
  root: {
    margin: theme.spacing(1),
  },
}))(MuiButton);

const App = () => {
  const { showModal } = useModal();

  const handleOpenConfirmationDialog = () => {
    let timeoutId;

    const modal = showModal(ConfirmationDialog, {
      title: 'Hello World',
      description: 'description text',
      onConfirm: () => {
        modal.hide();
      },
      onCancel: () => {
        modal.hide();
      },
      onExited: () => {
        // =========================
        // ⚠️ Be careful with setImmediate, setInterval and setTimeout
        // ⚠️ don't forget to clean up id after closing dialog.
        // ⚠️ use `onExited` or `onClose` callback for this.
        // =========================
        clearTimeout(timeoutId);
      },
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
    <React.Fragment>
      <Button
        variant="contained"
        onClick={() => showModal(SimpleDialog)}
        color="primary"
      >
        simple dialog
      </Button>
      <Button
        variant="contained"
        onClick={() => showModal(NestedDialog)}
        color="primary"
      >
        nested dialog
      </Button>
      <Button
        variant="contained"
        onClick={handleOpenConfirmationDialog}
        color="primary"
      >
        confirmation dialog
      </Button>
      <Button
        variant="contained"
        // @see https://github.com/Quernest/mui-modal-provider/issues/14
        onClick={() => showModal(SimpleModal, undefined, { destroyOnClose: true })}
        color="primary"
      >
        simple modal
      </Button>
      <Button
        variant="contained"
        onClick={() => showModal(TransitionModal)}
        color="primary"
      >
        transition modal
      </Button>
    </React.Fragment>
  );
};

export default App;
