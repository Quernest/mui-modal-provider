import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import ModalProvider, { useModal } from '../src';

function CircularProgressWithLabel(props) {
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

function DialogWithProgress({
  title = '',
  description = '',
  onCancel,
  onConfirm,
  progress,
  ...props
}) {
  return (
    <Dialog fullWidth maxWidth="sm" open={false} {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
        <div>
          <CircularProgressWithLabel value={progress} />
        </div>
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
}

function Demo() {
  const { showModal } = useModal();

  const handleClick = () => {
    let timer;
    let progress = 0;

    const modal = showModal(DialogWithProgress, {
      title: 'Progress',
      progress: 0,
      onConfirm: () => modal.hide(),
      onCancel: () => modal.hide(),
      onExited: () => clearTimeout(timer),
    });

    timer = setInterval(() => {
      progress += 1;

      if (progress >= 100) {
        progress = 0;
      }

      modal.update({ progress });
    }, 500);
  };

  return (
    <Button variant="contained" onClick={handleClick} color="primary">
      Show Modal
    </Button>
  );
}

const App = () => {
  return (
    <ModalProvider>
      <Demo />
    </ModalProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
