# mui-modal-provider

[![package version](https://img.shields.io/npm/v/mui-modal-provider.svg?style=flat-square)](https://www.npmjs.com/package/mui-modal-provider)
[![package downloads](https://img.shields.io/npm/dm/mui-modal-provider.svg?style=flat-square)](https://www.npmjs.com/package/mui-modal-provider)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![package license](https://img.shields.io/npm/l/mui-modal-provider.svg?style=flat-square)](https://www.npmjs.com/package/mui-modal-provider)

MUI-modal-provider is a helper based on [Context API](https://en.reactjs.org/docs/context.html) and [React Hooks](https://en.reactjs.org/docs/hooks-intro.html) for simplified work with modals (dialogs) built on [Material-UI](https://www.material-ui.com) or custom solutions with suitable props.

## Install

```bash
npm install mui-modal-provider # or yarn add mui-modal-provider
```

## Usage

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import ModalProvider, { useModal } from 'mui-modal-provider';
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
  // {...props} <--- is mandatory
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
```

