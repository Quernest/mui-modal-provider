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
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

type Props = DialogProps & {
  title: string,
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

## Compatibility

For [Material-UI v4](https://v4.mui.com/) use `legacy` prop on the ModalProvider.

## Examples

See more examples in [example](https://github.com/Quernest/mui-modal-provider/tree/master/example) folder

## Developing & linking locally

Because this module utilizes react hooks, it must be linked in a special way that is described here in this [react github issue comment](https://github.com/facebook/react/issues/14257#issuecomment-439967377)

1. Update the react and react-dom versions in this module’s package.json devDependencies match the versions in whatever project you’re linking them in.
2. `yarn install` in this module’s root directory
3. Because this module uses hooks, we need to link the module’s react dependency into the project we will be using to test the linked module
4. `cd node_modules/react` then `yarn link` then inside your linked project run `yarn link react`
5. In the linked project’s root directory run `yarn install mui-modal-provider`
6. Then in the module’s root directory run `yarn link`
7. In the linked project’s root directory run `yarn link mui-modal-provider`
