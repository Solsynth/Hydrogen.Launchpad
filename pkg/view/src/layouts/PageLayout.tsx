import Navigator from "./shared/Navigator.tsx";
import RootLayout from "./RootLayout.tsx";
import { createMemo, Show } from "solid-js";
import { useSearchParams } from "@solidjs/router";

export default function PageLayout(props: any) {
  const [searchParams] = useSearchParams();

  const mainContentStyles = createMemo(() => {
    if (searchParams["embedded"]) {
      return "h-screen";
    } else {
      return "h-[calc(100vh-64px)] mt-[64px]";
    }
  });

  return (
    <RootLayout>
      <Show when={!searchParams["embedded"]}>
        <Navigator />
      </Show>

      <main class={`${mainContentStyles()} px-5`}>{props.children}</main>
    </RootLayout>
  );
}