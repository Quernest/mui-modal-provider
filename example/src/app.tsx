import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import { useModal } from '../../src';
import {
  SimpleDialog,
  NestedDialog,
  ConfirmationDialog,
  SimpleModal,
  TransitionModal,
} from './components';

const SimpleLazyLoadedDialog = React.lazy(() =>
  import('./components/dialogs/simple-dialog-for-lazy-loading')
);

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
      TransitionProps: {
        onExited: () => {
          // =========================
          // ⚠️ Be careful with setImmediate, setInterval and setTimeout
          // ⚠️ don't forget to clean up id after closing dialog.
          // ⚠️ use `onExited` or `onClose` callback for this.
          // =========================
          clearTimeout(timeoutId);
        },
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
    <Grid container spacing={2}>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => showModal(SimpleDialog)}
          color="primary"
        >
          simple dialog
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => showModal(SimpleLazyLoadedDialog)}
          color="primary"
        >
          simple lazy loaded dialog
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => showModal(NestedDialog)}
          color="primary"
        >
          nested dialog
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={handleOpenConfirmationDialog}
          color="primary"
        >
          confirmation dialog
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          // @see https://github.com/Quernest/mui-modal-provider/issues/14
          onClick={() =>
            showModal(SimpleModal, undefined, { destroyOnClose: true })
          }
          color="primary"
        >
          simple modal
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          onClick={() => showModal(TransitionModal)}
          color="primary"
        >
          transition modal
        </Button>
      </Grid>
    </Grid>
  );
};

export default App;
