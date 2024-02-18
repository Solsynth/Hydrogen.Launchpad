import { createContext, useContext } from "solid-js";
import { createStore } from "solid-js/store";

const WellKnownContext = createContext<any>();

const [wellKnown, setWellKnown] = createStore<any>(null);

export async function readWellKnown() {
  const res = await fetch("/.well-known")
  setWellKnown(await res.json())
}

export function getEndpoint(id: string): any {
  return wellKnown()[id]
}

export function WellKnownProvider(props: any) {
  return (
    <WellKnownContext.Provider value={wellKnown}>
      {props.children}
    </WellKnownContext.Provider>
  );
}

export function useWellKnown() {
  return useContext(WellKnownContext);
}