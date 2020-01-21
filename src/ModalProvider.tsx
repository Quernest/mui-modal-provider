import React, { FC } from 'react';
import { ModalContext } from './ModalContext';
import initialState, { IState } from './State';

const ModalProvider: FC = ({ children }) => {
  const [state, setState] = React.useState<IState>(initialState);

  const hideModal = React.useCallback(
    (id: string) =>
      setState(prevState => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          props: {
            ...prevState.props,
            open: false,
          },
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
    (component: React.ComponentType<any>, props: Object = {}) => {
      const id = `${(+new Date()).toString(16)}`;

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

      return { id, hide: () => hideModal(id), destroy: () => destroyModal(id) };
    },
    [destroyModal, hideModal]
  );

  function renderState() {
    return Object.keys(state).map(id => {
      const { component: Component, props } = state[id];

      return Component ? (
        <Component
          {...props}
          key={id}
          onClose={() => hideModal(id)}
          onExited={() => destroyModal(id)}
        />
      ) : null;
    });
  }

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
