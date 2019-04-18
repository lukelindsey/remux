import React from "react";

import { Ctor, Instance } from "./internalHelpers";

export const StoreContext = React.createContext(createDiContainer());

type DiContainer = Map<Ctor<any, any>, Instance<any, any>>;

interface IProviderProps {
  children: React.ReactNode;
  container?: DiContainer;
}

export function Provider({ container, children }: IProviderProps) {
  const di = container ? container : createDiContainer();
  return <StoreContext.Provider value={di}>{children}</StoreContext.Provider>;
}

function createDiContainer(): DiContainer {
  return new Map();
}
