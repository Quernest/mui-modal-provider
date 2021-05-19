# mui-modal-provider

[![codecov](https://codecov.io/gh/Quernest/mui-modal-provider/branch/master/graph/badge.svg?token=AL2WK480NF)](https://codecov.io/gh/Quernest/mui-modal-provider)
[![package version](https://img.shields.io/npm/v/mui-modal-provider.svg?style=flat-square)](https://www.npmjs.com/package/mui-modal-provider)
[![package downloads](https://img.shields.io/npm/dm/mui-modal-provider.svg?style=flat-square)](https://www.npmjs.com/package/mui-modal-provider)
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
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

type Props = DialogProps & {
  title: string;
};

// ✔️ create the dialog you want to use
const SimpleDialog: React.FC<Props> = ({ title, ...props }) => (
  <Dialog {...props}>
    <DialogTitle>{title}</DialogTitle>
  </Dialog>
);

// ✔️ use modal hook and show the dialog
const App = () => {
  const { showModal } = useModal();

  return (
    <Button
      variant="contained"
      onClick={() => showModal(SimpleDialog, { title: 'Simple Dialog' })}
      color="primary"
    >
      simple dialog
    </Button>
  );
};

// ✔️ wrap the app with modal provider
ReactDOM.render(
  <ModalProvider>
    <App />
  </ModalProvider>,
  document.getElementById('root')
);
```

### See more examples in [example](https://github.com/Quernest/mui-modal-provider/tree/master/example) folder
