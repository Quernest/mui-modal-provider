import { Props, State } from 'types';
import reducer, { initialState, Types } from './reducer';
import component from './test-utils/modal';

describe('reducer', () => {
  const modalId = '000';
  const modalId1 = '111';
  const rootId = '111';
  const rootId1 = '222';
  const delimiter = '.';
  const id = `${rootId}${delimiter}${modalId}`;
  const id1 = `${rootId1}${delimiter}${modalId1}`;

  let expectedState: State;
  let expectedProps: Props;

  beforeEach(() => {
    expectedState = {
      [id]: {
        component,
        options: undefined,
        props: {},
      },
      [id1]: {
        component,
        options: undefined,
        props: {},
      },
    };
    expectedProps = {
      text: 'sample text',
      open: true,
    };
  });

  afterEach(() => {
    expectedState = {};
    expectedProps = {};
  });

  it('should handle show case (without props)', () => {
    const state = reducer(initialState, {
      type: Types.SHOW,
      payload: { id, component },
    });
    expectedState[id].props = { open: true };
    expect(state[id]).toEqual(expectedState[id]);
  });

  it('should handle show case (with props)', () => {
    const state = reducer(initialState, {
      type: Types.SHOW,
      payload: { id, component, props: expectedProps },
    });
    expectedState[id].props = expectedProps;
    expect(state[id]).toEqual(expectedState[id]);
  });

  it('should handle hide case (without props)', () => {
    delete expectedState[id].props;
    const state = reducer(expectedState, { type: Types.HIDE, payload: { id } });
    expectedState[id].props = { open: false };
    expect(state).toEqual(expectedState);
  });

  it('should handle hide case (with props)', () => {
    expectedState[id].props = expectedProps;
    const state = reducer(expectedState, { type: Types.HIDE, payload: { id } });
    expectedState[id].props = { ...expectedProps, open: false };
    expect(state).toEqual(expectedState);
  });

  it('should handle update case (empty props)', () => {
    const state = reducer(expectedState, {
      type: Types.UPDATE,
      payload: { id, props: {} },
    });
    expect(state).toEqual(expectedState);
  });

  it('should handle update case (new props)', () => {
    const updatedTextProp = 'updated sample text';
    expectedState[id].props = { open: true };
    const state = reducer(expectedState, {
      type: Types.UPDATE,
      payload: { id, props: { text: updatedTextProp } },
    });
    expectedState[id].props = { ...expectedProps, text: updatedTextProp };
    expect(state).toEqual(expectedState);
  });

  it('should handle destroy case', () => {
    const state = reducer(expectedState, {
      type: Types.DESTROY,
      payload: { id },
    });
    expect(state[id]).toBe(undefined);
  });

  it('should handle destroy by root id', () => {
    const state = reducer(expectedState, {
      type: Types.DESTROY_BY_ROOT_ID,
      payload: { rootId },
    });
    expect(state[id]).toBe(undefined);
  });

  it('should handle default state in HIDE case', () => {
    const state = reducer(expectedState, {
      type: Types.HIDE,
      payload: { id: 'some random id' },
    });
    expect(state).toEqual(expectedState);
  });

  it('should handle default state in UPDATE case', () => {
    const state = reducer(expectedState, {
      type: Types.UPDATE,
      payload: { id: 'some random id', props: {} },
    });
    expect(state).toEqual(expectedState);
  });

  it('should throw an error', () => {
    expect(() => reducer(expectedState, { type: Types.UNKNOWN })).toThrowError(
      'Unexpected action'
    );
  });
});
