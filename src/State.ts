export interface IStateElement {
  component: React.ComponentType<any>;
  props: Object;
}

export interface IState {
  [id: string]: IStateElement;
}

const initialState = {};

export default initialState;
