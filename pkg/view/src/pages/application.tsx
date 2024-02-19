import { createMemo, onMount } from "solid-js";
import { useWellKnown } from "../stores/wellKnown.tsx";
import { useParams } from "@solidjs/router";
import { preloadApp, setupApp, startApp } from "wujie";

export default function ApplicationPage() {
  const wellKnown = useWellKnown();
  const params = useParams();

  const manifest = createMemo(() => {
    const idx = params.slug;
    const item = JSON.parse(JSON.stringify(wellKnown?.directory[idx]));
    item["id"] = idx;
    return item;
  });

  const cfg = createMemo(() => ({
    el: "#subapp",
    name: "x",
    url: manifest().link,
    exec: true,
    sync: true
  }));

  onMount(() => {
    setupApp(cfg());
    preloadApp(cfg());
    startApp(cfg()).then(r => console.log(r));
  });

  return (
    <div id="subapp" class="h-screen w-full"></div>
  );
}