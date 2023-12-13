import { ComponentType } from 'react';

export type ModalComponent<P> = ComponentType<P>;

export type ModalComponentProps<P> = Omit<P, 'open'>;

export interface Props {
  open?: Boolean;
  [key: string]: any;
}

export interface Options {
  hideOnClose?: boolean
  destroyOnClose?: boolean;
  rootId?: string;
}

export interface State {
  [id: string]: StateElement;
}

export interface StateElement {
  component: ComponentType<any>;
  props?: Props;
  options?: Options;
}

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

export interface ShowFnOutput<P> {
  id: string;
  hide: () => void;
  destroy: () => void;
  update: (newProps: Partial<ModalComponentProps<P>>) => void;
}

export interface ModalConfig {
  enforceProvider: boolean;
}
