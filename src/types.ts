import { ComponentType, ReactElement } from 'react';

export type ModalComponent<P> = ComponentType<P>;

export type ModalComponentProps<P> = Omit<P, 'open'>;

export type Props = {
  open?: Boolean;
  [key: string]: any;
};

export type Options = {
  destroyOnClose?: boolean;
  rootId?: string;
};

export type State = {
  [id: string]: StateElement;
};

export type StateElement = {
  component: ComponentType<any>;
  props?: Props;
  options?: Options;
};

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type UpdateFn = <P extends Props>(
  id: string,
  props: Partial<ModalComponentProps<P>>
) => void;

export type HideFn = (id: string) => void;
export type DestroyFn = (id: string) => void;
export type DestroyByRootIdFn = (rootId: string) => void;

export type ShowFn = <P extends Props>(
  component: ComponentType<P>,
  props?: ModalComponentProps<P>,
  options?: Options
) => ShowFnOutput<P>;

export type ShowFnOutput<P> = {
  id: string;
  hide: () => void;
  destroy: () => void;
  update: (newProps: Partial<ModalComponentProps<P>>) => void;
};

export interface RenderModalFnParams {
  Component: ComponentType<any>;
  props: Props | undefined;
  key: string;
  handleClose: (...args: any[]) => void;
  handleExited: ((...args: any[]) => void) | undefined;
}

export type RenderModalFn = (params: RenderModalFnParams) => ReactElement;
