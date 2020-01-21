# Mui Modal Provider

## Install

```bash
npm install mui-modal-provider # or yarn add mui-modal-provider
```

## Usage

App.js

```jsx
import React from 'react';
import ModalProvider, { useModal } from 'mui-modal-provider';
import Blog from './components/Blog';

export default function App() {
  return (
    <ModalProvider>
      <Blog>
    </ModalProvider>
  )
}
```

components/Blog.js

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';
import { useModal } from 'mui-modal-provider';

import HelloWorldDialog from './HelloWorldDialog.js';

export default function Blog() {
  const { showModal } = useModal();

  const handleClick = () => {
    const modal = showModal(HelloWorldDialog, {
      title: 'Hello World',
      description: 'description text',
      onConfirm: () => {
        console.log('ok');
        modal.hide();
      },
      onCancel: () => {
        console.log('cancel');
        modal.hide();
      }
    });
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClick}
        color="primary"
      >
        show modal
      </Button>
    <div>
  )
}
```

components/HelloWorldDialog.js

```jsx
import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';

export default function HelloWorldDialog({
  title = '',
  description = '',
  onCancel,
  onConfirm,
  ...props
}) {
  return (
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
}
```
