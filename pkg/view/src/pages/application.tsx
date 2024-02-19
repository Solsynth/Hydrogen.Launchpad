import { createMemo, onMount } from "solid-js";
import { useWellKnown } from "../stores/wellKnown.tsx";
import { useParams } from "@solidjs/router";
import Garfish from "garfish";

export default function ApplicationPage() {
  const wellKnown = useWellKnown();
  const params = useParams();

  const manifest = createMemo(() => {
    const idx = params.slug;
    const item = JSON.parse(JSON.stringify(wellKnown?.directory[idx]));
    item["id"] = idx;
    return item;
  });


  onMount(async () => {
    // @ts-ignore
    window.__LAUNCHPAD_TARGET__ = manifest().link;
    const app = await Garfish.loadApp(manifest().id, {
      domGetter: "#subapp",
      entry: manifest().link,
      basename: `/o/${params.slug}`,
      cache: true,
      sandbox: false
    });

    await app?.mount();
  });

  return (
    <div id="subapp" class="h-screen w-full"></div>
  );
}