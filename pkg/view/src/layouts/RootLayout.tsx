import Navigator from "./shared/Navigator.tsx";
import { readProfiles } from "../stores/userinfo.tsx";
import { createMemo, createSignal, Show } from "solid-js";
import { readWellKnown } from "../stores/wellKnown.tsx";
import { useSearchParams } from "@solidjs/router";

export default function RootLayout(props: any) {
  const [ready, setReady] = createSignal(false);

  Promise.all([readWellKnown(), readProfiles()]).then(() => setReady(true));

  const [searchParams] = useSearchParams();

  const mainContentStyles = createMemo(() => {
    if (searchParams["embedded"]) {
      return "h-screen";
    } else {
      return "h-[calc(100vh-64px)] mt-[64px]";
    }
  });

  return (
    <Show when={ready()} fallback={
      <div class="h-screen w-screen flex justify-center items-center">
        <div>
          <span class="loading loading-lg loading-infinity"></span>
        </div>
      </div>
    }>
      <Show when={!searchParams["embedded"]}>
        <Navigator />
      </Show>

      <main class={`${mainContentStyles()} px-5`}>{props.children}</main>
    </Show>
  );
}