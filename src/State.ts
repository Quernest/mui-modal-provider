export interface IStateElement {
  component: React.ComponentType<any>;
  props: Object;
}

export interface IState {
  [id: string]: IStateElement;
}

const initialState: IState = {};

export default initialState;
