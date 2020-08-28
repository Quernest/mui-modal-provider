export interface IProps {
  open?: Boolean;
  onClose?: () => void;
  onExited?: () => void;
  [key: string]: any;
}

export interface IStateElement {
  component: React.ComponentType<any>;
  props: IProps;
}

export interface IState {
  [id: string]: IStateElement;
}

const initialState: IState = {};

export default initialState;
