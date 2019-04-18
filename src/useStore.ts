import { useEffect, useState, useContext } from "react";
import { StoreContext } from "./Provider";
import { Store } from "./Store";
import { Ctor, Instance } from "./internalHelpers";

export function useStore<S, C extends Store<S>>(ctor: Ctor<S, C>) {
  const di = useContext(StoreContext);
  let store: Instance<S, C> = di.get(ctor);

  if (store === undefined) {
    store = new ctor();
    di.set(ctor, store);
  }

  let [val, setVal] = useState(0);
  useEffect(() => {
    // is this the best way to force an update with hooks?
    function forceUpdate() {
      setVal(++val);
    }

    store.__internals_subscribe(forceUpdate);
  }, []);

  return store;
}
