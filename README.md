# mui-modal-provider

[![codecov](https://codecov.io/gh/Quernest/mui-modal-provider/branch/master/graph/badge.svg?token=AL2WK480NF)](https://codecov.io/gh/Quernest/mui-modal-provider)
[![package version](https://img.shields.io/npm/v/mui-modal-provider.svg?style=flat-square)](https://www.npmjs.com/package/mui-modal-provider)
[![package downloads](https://img.shields.io/npm/dm/mui-modal-provider.svg?style=flat-square)](https://www.npmjs.com/package/mui-modal-provider)
[![package license](https://img.shields.io/npm/l/mui-modal-provider.svg?style=flat-square)](https://www.npmjs.com/package/mui-modal-provider)

`mui-modal-provider` is a lightweight utility built on top of [React Context API](https://en.reactjs.org/docs/context.html) and [Hooks](https://en.reactjs.org/docs/hooks-intro.html) to simplify managing Material-UI modals (dialogs). It allows you to trigger modals imperatively from anywhere in your component tree without managing local `open` states.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
  - [ModalProvider](#modalprovider)
  - [useModal](#usemodal)
  - [showModal options](#showmodal-options)
  - [Modal instance](#modal-instance)
- [Advanced Usage](#advanced-usage)
  - [Updating Modals](#updating-modals)
  - [Lazy Loading](#lazy-loading)
  - [Auto Destruction](#auto-destruction)
- [Configuration](#configuration)
- [Compatibility](#compatibility)
- [Developing & linking locally](#developing--linking-locally)

## Install

```bash
npm install mui-modal-provider # or yarn add mui-modal-provider
```

## Usage

1. **Wrap your app with `ModalProvider`**:

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import ModalProvider from 'mui-modal-provider';
import App from './App';

const root = createRoot(document.getElementById('root'));
root.render(
  <ModalProvider>
    <App />
  </ModalProvider>
);
```

2. **Trigger modals using `useModal`**:

```jsx
import React from 'react';
import { useModal } from 'mui-modal-provider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const SimpleDialog = ({ title, ...props }) => (
  <Dialog {...props}>
    <DialogTitle>{title}</DialogTitle>
  </Dialog>
);

const App = () => {
  const { showModal } = useModal();

  return (
    <Button
      variant="contained"
      onClick={() => showModal(SimpleDialog, { title: 'Hello World' })}
    >
      Open Dialog
    </Button>
  );
};
```

## API

### ModalProvider

| Property | Type | Default | Description |
|---|---|---|---|
| `legacy` | `boolean` | `false` | Set to `true` if you are using MUI v4 or below. |
| `suspense` | `boolean` | `true` | Wraps modals in `Suspense` for lazy loading support. |
| `fallback` | `ReactNode` | `null` | Loading fallback for `Suspense`. |

### useModal

The `useModal` hook returns an object with the following methods:

- `showModal(Component, props, options)`: Displays a modal.
- `hideModal(id)`: Hides a specific modal by ID.
- `destroyModal(id)`: Removes a specific modal from the DOM immediately.
- `updateModal(id, props)`: Updates the props of an active modal.
- `destroyModalsByRootId(rootId)`: Destroys all modals associated with a specific root ID.

### showModal options

The third argument of `showModal` accepts an options object:

| Property | Type | Default | Description |
|---|---|---|---|
| `hideOnClose` | `boolean` | `true` | Automatically calls `hideModal` when `onClose` is triggered. |
| `destroyOnClose` | `boolean` | `false` | Automatically calls `destroyModal` after the closing transition. |
| `rootId` | `string` | `uid` | A custom ID used for group destruction. |

### Modal instance

`showModal` returns a modal instance object:

- `id`: The unique ID of the modal.
- `hide()`: Hides the modal.
- `destroy()`: Destroys the modal.
- `update(newProps)`: Updates the modal's props.

## Advanced Usage

### Updating Modals

You can update an existing modal's props without closing and re-opening it:

```javascript
const modal = showModal(SimpleDialog, { title: 'Loading...' });

// Later...
modal.update({ title: 'Success!' });
```

### Lazy Loading

Since `ModalProvider` supports `Suspense`, you can easily use `React.lazy` for your modals:

```jsx
const LazyDialog = React.lazy(() => import('./LazyDialog'));

// ...
showModal(LazyDialog, { someProp: 'value' });
```

### Auto Destruction

By default, `useModal` automatically destroys any modals it created when the component using the hook unmounts. This prevents memory leaks and stale modals.

You can disable this behavior if needed:
```javascript
const { showModal } = useModal({ disableAutoDestroy: true });
```

## Configuration

You can globally configure the library behavior:

```javascript
import { setModalConfig } from 'mui-modal-provider';

setModalConfig({
  enforceProvider: true, // Throws an error if useModal is used outside ModalProvider
});
```

## Compatibility

For **Material-UI v4**, set the `legacy` prop on `ModalProvider`:

```jsx
<ModalProvider legacy>
  <App />
</ModalProvider>
```

## Developing & linking locally

Because this module utilizes react hooks, it must be linked in a special way that is described here in this [react github issue comment](https://github.com/facebook/react/issues/14257#issuecomment-439967377)

1. Update the react and react-dom versions in this module’s package.json devDependencies match the versions in whatever project you’re linking them in.
2. `yarn install` in this module’s root directory
3. Because this module uses hooks, we need to link the module’s react dependency into the project we will be using to test the linked module
4. `cd node_modules/react` then `yarn link` then inside your linked project run `yarn link react`
5. In the linked project’s root directory run `yarn install mui-modal-provider`
6. Then in the module’s root directory run `yarn link`
7. In the linked project’s root directory run `yarn link mui-modal-provider`
