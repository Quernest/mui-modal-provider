export interface IProps {
  open?: Boolean;
  [key: string]: any;
}

export interface IStateElement {
  component: React.ComponentType<any>;
  props: IProps;
}

export interface IState {
  [id: string]: IStateElement;
}

export default {} as IState;
