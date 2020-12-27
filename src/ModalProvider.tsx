import React from 'react';
import ModalContext from './ModalContext';
import initialState, { IState, IProps } from './State';
import { isKeyMatchRootId } from './utils';

const ModalProvider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<IState>(initialState);

  const hideModal = React.useCallback(
    (id: string) =>
      setState(prevState => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          props: {
            ...(prevState[id] ? prevState[id].props : {}),
            open: false,
          } as IProps,
        },
      })),
    []
  );

  const updateModal = React.useCallback(
    (id: string, { open, ...props }: IProps) =>
      setState(prevState =>
        !prevState[id]
          ? prevState
          : {
              ...prevState,
              [id]: {
                ...prevState[id],
                props: {
                  ...(prevState[id] ? prevState[id].props : {}),
                  ...props,
                },
              },
            }
      ),
    []
  );

  const destroyModal = React.useCallback(
    (id: string) =>
      setState(prevState => {
        const { [id]: x, ...newState } = prevState;
        return newState;
      }),
    []
  );

  const destroyModalsByRootId = React.useCallback(
    (rootId: string) =>
      setState(prevState =>
        Object.keys(prevState)
          .filter(key => !isKeyMatchRootId(key, rootId))
          .reduce<IState>((obj, key) => {
            obj[key] = prevState[key];
            return obj;
          }, {})
      ),
    []
  );

  const showModal = React.useCallback(
    (id: string, component: React.ComponentType<any>, props: IProps) => {
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
        update: (newProps: IProps) => updateModal(id, newProps),
      };
    },
    [destroyModal, hideModal, updateModal]
  );

  const renderState = () =>
    Object.keys(state).map(id => {
      const { component: Component, props } = state[id];

      const handleClose = (...args: any[]) => {
        if (props && props.onClose) {
          props.onClose(...args);
        }

        hideModal(id);
      };

      const handleExited = (...args: any[]) => {
        if (props && props.onExited) {
          props.onExited(...args);
        }

        destroyModal(id);
      };

      return Component ? (
        <Component
          {...props}
          key={id}
          onClose={handleClose}
          onExited={handleExited}
        />
      ) : null;
    });

  return (
    <ModalContext.Provider
      value={{
        hideModal,
        showModal,
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
