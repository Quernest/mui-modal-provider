import React, { ReactNode, Fragment, Suspense } from 'react';
import ModalContext from './modal-context';
import reducer, { initialState, Types } from './reducer';
import {
  DestroyByRootIdFn,
  DestroyFn,
  HideFn,
  ShowFn,
  UpdateFn,
} from './types';
import {
  MISSED_MODAL_ID_ERROR_MESSAGE,
  MISSED_MODAL_ROOT_ID_ERROR_MESSAGE,
} from './constants';
import { uid } from './utils';

export interface ModalProviderProps {
  children: ReactNode;
  /**
   * Enable it if you want to use mui < 5 version
   */
  legacy?: boolean;
  /**
   * Enable it if you want to wrap the modals with the Suspense feature.
   * @see https://beta.reactjs.org/reference/react/Suspense
   */
  suspense?: boolean;
  /**
   * Custom fallback for the Suspense fallback
   * @see https://beta.reactjs.org/reference/react/Suspense#displaying-a-fallback-while-content-is-loading
   */
  fallback?: ReactNode | null;
}

export default function ModalProvider({
  children,
  legacy = false,
  suspense = true,
  fallback = null,
}: ModalProviderProps) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const update = React.useCallback<UpdateFn>(
    (id, { open, ...props }) => {
      if (!id) {
        console.error(MISSED_MODAL_ID_ERROR_MESSAGE);
        return;
      }

      dispatch({
        type: Types.UPDATE,
        payload: {
          id,
          props,
        },
      });
    },
    [dispatch]
  );

  const hide = React.useCallback<HideFn>(
    id => {
      if (!id) {
        console.error(MISSED_MODAL_ID_ERROR_MESSAGE);
        return;
      }

      dispatch({
        type: Types.HIDE,
        payload: {
          id,
        },
      });
    },
    [dispatch]
  );

  const destroy = React.useCallback<DestroyFn>(
    id => {
      if (!id) {
        console.error(MISSED_MODAL_ID_ERROR_MESSAGE);
        return;
      }

      dispatch({
        type: Types.DESTROY,
        payload: {
          id,
        },
      });
    },
    [dispatch]
  );

  const destroyByRootId = React.useCallback<DestroyByRootIdFn>(
    rootId => {
      if (!rootId) {
        console.error(MISSED_MODAL_ROOT_ID_ERROR_MESSAGE);
        return;
      }

      dispatch({
        type: Types.DESTROY_BY_ROOT_ID,
        payload: {
          rootId,
        },
      });
    },
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

  const renderState = () =>
    Object.keys(state).map(id => {
      const { component: Component, props, options } = state[id];

      const handleClose = (...args: any[]) => {
        if (options && options.hideOnClose) {
          hide(id);
        }

        if (options && options.destroyOnClose) {
          destroy(id);
        }

        if (props && props.onClose) {
          props.onClose(...args);
        }
      };

      const handleExited = (...args: any[]) => {
        if (props?.onExited) {
          props.onExited(...args);
        }

        if (props?.TransitionProps?.onExited) {
          props.TransitionProps.onExited(...args);
        }

        destroy(id);
      };

      let extraProps = {};

      if (!legacy) {
        extraProps = {
          TransitionProps: {
            ...props?.TransitionProps,
            onExited: handleExited,
          },
        };
      } else {
        extraProps = {
          onExited: handleExited,
        };
      }

      return (
        <Component
          {...props}
          key={id}
          onClose={handleClose}
          {...(options && !options.destroyOnClose && extraProps)}
        />
      );
    });

  const SuspenseWrapper = suspense ? Suspense : Fragment;

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
      <SuspenseWrapper fallback={fallback}>{renderState()}</SuspenseWrapper>
    </ModalContext.Provider>
  );
}
