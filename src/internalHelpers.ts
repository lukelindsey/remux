import { Store } from './Store';

export type Ctor<S, C extends Store<S>> = new () => C;

export type Instance<S, C extends Store<S>> = C;