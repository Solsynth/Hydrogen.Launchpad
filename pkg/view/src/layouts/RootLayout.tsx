import { readProfiles } from "../stores/userinfo.tsx";
import { createSignal, Show } from "solid-js";
import { readWellKnown } from "../stores/wellKnown.tsx";

export default function RootLayout(props: any) {
  const [ready, setReady] = createSignal(false);

  Promise.all([readWellKnown(), readProfiles()]).then(() => setReady(true));

  return (
    <Show when={ready()} fallback={
      <div class="h-screen w-screen flex justify-center items-center">
        <div>
          <span class="loading loading-lg loading-infinity"></span>
        </div>
      </div>
    }>
      {props.children}
    </Show>
  );
}