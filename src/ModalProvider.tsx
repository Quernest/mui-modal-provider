import React from 'react';

import ModalContext, {
  HideModalFn,
  UpdateModalFn,
  DestroyModalFn,
  DestroyModalByRootIdFn,
  MakeShowModalFn,
  State,
} from './ModalContext';
import { isKeyMatchRootId, uid } from './utils';

const ModalProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<State>({});

  const hideModal = React.useCallback<HideModalFn>(
    id =>
      setState(prevState => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          props: {
            ...(prevState[id] && prevState[id].props),
            open: false,
          },
        },
      })),
    []
  );

  const updateModal = React.useCallback<UpdateModalFn>(
    (id, { open, ...props }) =>
      setState(prevState => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          props: {
            ...(prevState[id] && prevState[id].props),
            ...props,
          },
        },
      })),
    []
  );

  const destroyModal = React.useCallback<DestroyModalFn>(
    id => setState(({ [id]: _, ...newState }) => newState),
    []
  );

  const destroyModalsByRootId = React.useCallback<DestroyModalByRootIdFn>(
    rootId =>
      setState(prevState =>
        Object.keys(prevState)
          .filter(key => !isKeyMatchRootId(key, rootId))
          .reduce<State>((obj, key) => {
            obj[key] = prevState[key];
            return obj;
          }, {})
      ),
    []
  );

  const makeShowModal = React.useCallback<MakeShowModalFn>(
    rootId => (component, props) => {
      const id = `${rootId}.${uid(8)}`;

      setState(prevState => ({
        ...prevState,
        [id]: {
          component,
          props: {
            ...props,
            open: true,
          },
        },
      }));

      return {
        id,
        hide: () => hideModal(id),
        destroy: () => destroyModal(id),
        update: newProps => updateModal(id, newProps),
      };
    },
    [destroyModal, hideModal, updateModal]
  );

  const renderState = () =>
    Object.keys(state).map(id => {
      const { component: Component, props } = state[id];

      const handleClose = (...args: any[]) => {
        hideModal(id);

        if (props && props.onClose) {
          props.onClose(...args);
        }
      };

      const handleExited = (...args: any[]) => {
        destroyModal(id);

        if (props && props.onExited) {
          props.onExited(...args);
        }
      };

      return (
        <Component
          {...props}
          key={id}
          onClose={handleClose}
          onExited={handleExited}
        />
      );
    });

  return (
    <ModalContext.Provider
      value={{
        hideModal,
        makeShowModal,
        destroyModal,
        destroyModalsByRootId,
        updateModal,
        state,
      }}
    >
      {children}
      {renderState()}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
