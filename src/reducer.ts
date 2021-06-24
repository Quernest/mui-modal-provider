import {
  State,
  StateElement,
  ActionMap,
  ModalComponentProps,
  Props,
} from './types';

export enum Types {
  SHOW = 'SHOW',
  HIDE = 'HIDE',
  UPDATE = 'UPDATE',
  DESTROY = 'DESTROY',
  DESTROY_BY_ROOT_ID = 'DESTROY_BY_ROOT_ID',
  UNKNOWN = 'UNKNOWN',
}

type Payload = {
  [Types.SHOW]: StateElement & {
    id: string;
  };
  [Types.HIDE]: {
    id: string;
  };
  [Types.UPDATE]: {
    id: string;
    props: ModalComponentProps<Props>;
  };
  [Types.DESTROY]: {
    id: string;
  };
  [Types.DESTROY_BY_ROOT_ID]: {
    rootId: string;
  };
  [Types.UNKNOWN]: undefined;
};

type Action = ActionMap<Payload>[keyof ActionMap<Payload>];

export const initialState: State = {};

export default function reducer(state: State, action: Action) {
  switch (action.type) {
    case Types.SHOW: {
      const { id, component, props, options } = action.payload;

      return {
        ...state,
        [id]: {
          component,
          props: {
            ...props,
            open: true,
          },
          options,
        },
      };
    }
    case Types.HIDE: {
      const { id } = action.payload;

      if (!state[id]) {
        return state;
      }

      return {
        ...state,
        [id]: {
          ...state[id],
          props: {
            ...state[id].props,
            open: false,
          },
        },
      };
    }
    case Types.UPDATE: {
      const { id, props } = action.payload;

      if (!state[id]) {
        return state;
      }

      return {
        ...state,
        [id]: {
          ...state[id],
          props: {
            ...state[id].props,
            ...props,
          },
        },
      };
    }
    case Types.DESTROY: {
      const { id } = action.payload;
      const newState = { ...state };
      delete newState[id];
      return newState;
    }
    case Types.DESTROY_BY_ROOT_ID: {
      const { rootId } = action.payload;

      return Object.keys(state)
        .filter(key => key.split('.')[0] !== rootId)
        .reduce<State>(
          (acc, key) => ({
            ...acc,
            [key]: state[key],
          }),
          {}
        );
    }
    default:
      throw new Error('Unexpected action');
  }
}
