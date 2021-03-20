import React from 'react';
import ModalContext from './ModalContext';
import reducer, { initialState, Types } from './reducer';
import { ShowFn } from './types';
import { uid } from './utils';

type Props = {
  children: React.ReactNode;
};

export default function ModalProvider({ children }: Props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const update = React.useCallback(
    (id, { open, ...props }) =>
      dispatch({
        type: Types.UPDATE,
        payload: {
          id,
          props,
        },
      }),
    [dispatch]
  );

  const hide = React.useCallback(
    id =>
      dispatch({
        type: Types.HIDE,
        payload: {
          id,
        },
      }),
    [dispatch]
  );

  const destroy = React.useCallback(
    id =>
      dispatch({
        type: Types.DESTROY,
        payload: {
          id,
        },
      }),
    [dispatch]
  );

  const destroyByRootId = React.useCallback(
    rootId =>
      dispatch({
        type: Types.DESTROY_BY_ROOT_ID,
        payload: {
          rootId,
        },
      }),
    [dispatch]
  );

  const show = React.useCallback<ShowFn>(
    (component, props, options) => {
      let id = uid(8);

      if (options && options.rootId) {
        id = `${options.rootId}.${id}`;
      }

      dispatch({
        type: Types.SHOW,
        payload: {
          id,
          component,
          props,
          options,
        },
      });

      return {
        id,
        hide: () => hide(id),
        destroy: () => destroy(id),
        update: newProps => update(id, newProps),
      };
    },
    [dispatch, hide, destroy, update]
  );

  console.log(state);

  const renderState = () =>
    Object.keys(state).map(id => {
      const { component: Component, props, options } = state[id];

      const handleClose = (...args: any[]) => {
        if (options && options.destroyOnClose) {
          destroy(id);
        } else {
          hide(id);
        }

        if (props && props.onClose) {
          props.onClose(...args);
        }
      };

      const handleExited = (...args: any[]) => {
        destroy(id);

        if (props && props.onExited) {
          props.onExited(...args);
        }
      };

      return (
        <Component
          {...props}
          key={id}
          onClose={handleClose}
          {...(!options?.destroyOnClose && { onExited: handleExited })}
        />
      );
    });

  return (
    <ModalContext.Provider
      value={{
        state,
        updateModal: update,
        hideModal: hide,
        destroyModal: destroy,
        showModal: show,
        destroyModalsByRootId: destroyByRootId,
      }}
    >
      {children}
      {renderState()}
    </ModalContext.Provider>
  );
}
