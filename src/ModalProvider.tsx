import React, { FC } from 'react';
import { ModalContext } from './ModalContext';
import initialState, { IState, IProps } from './State';

const ModalProvider: FC = ({ children }) => {
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

  const destroyModal = React.useCallback(
    (id: string) =>
      setState(prevState => {
        const { [id]: x, ...newState } = prevState;
        return newState;
      }),
    []
  );

  const showModal = React.useCallback(
    (component: React.ComponentType<any>, props: IProps) => {
      const id = Math.random()
        .toString(36)
        .substr(2, 9);

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
        update: (newProps: IProps) =>
          setState(prevState =>
            !prevState[id]
              ? prevState
              : {
                  ...prevState,
                  [id]: {
                    ...prevState[id],
                    props: {
                      ...(prevState[id] ? prevState[id].props : {}),
                      ...newProps,
                    },
                  },
                }
          ),
      };
    },
    [destroyModal, hideModal]
  );

  const renderState = () =>
    Object.keys(state).map(id => {
      const { component: Component, props } = state[id];

      const handleClose = () => {
        if (props && props.onClose) {
          props.onClose();
        }

        hideModal(id);
      };

      const handleExited = () => {
        if (props && props.onExited) {
          props.onExited();
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
      value={{ hideModal, showModal, destroyModal, state }}
    >
      {children}
      {renderState()}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
