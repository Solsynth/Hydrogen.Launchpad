import { createMemo, For, Show } from "solid-js";
import { clearUserinfo, useUserinfo } from "../../stores/userinfo.tsx";
import { useNavigate } from "@solidjs/router";
import { useWellKnown } from "../../stores/wellKnown.tsx";

export default function Navigator(props: any) {
  const wellKnown = useWellKnown();
  const userinfo = useUserinfo();
  const navigate = useNavigate();

  const components = createMemo(() => wellKnown?.components);

  function logout() {
    clearUserinfo();
    navigate("/auth/login");
  }

  function getDirectory(): any[] {
    const dir = JSON.parse(JSON.stringify(wellKnown?.directory));
    return Object.entries(dir).map(([k, v]: [string, any]) => {
      v["id"] = k;
      v["open"] = `/o/${k}`;
      return v;
    });
  }

  return (
    <div class="drawer">
      <input id="navigation-drawer" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content">
        {props.children}

        <label
          for="navigation-drawer"
          class="max-md:w-8 md:w-12 aspect-square z-[50] btn btn-primary drawer-button fixed bottom-[50%]"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </label>
      </div>
      <div class="drawer-side z-[100]">
        <label for="navigation-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
        <div class="p-4 w-80 min-h-full bg-base-200 text-base-content flex flex-col justify-between">
          <ul class="menu">
            <li>
              <a class="flex items-center" href="/">
                <i class="w-5 h-5 text-[14px] mt-[5px] text-center fa-solid fa-house"></i>
                Dashboard
              </a>
            </li>
            <div class="divider"></div>
            <For each={getDirectory()}>
              {item =>
                <li>
                  <a class="flex items-center" href={item.open}>
                    <i class={`w-5 h-5 text-[14px] mt-[5px] text-center ${item.icon}`}></i>
                    {item.name}
                  </a>
                </li>
              }
            </For>
          </ul>

          <ul class="menu">
            <li>
              <Show when={userinfo?.isLoggedIn} fallback={
                <a href={`${components()["identity"]}/auth/login`} class="btn btn-sm glass">Login</a>
              }>
                <button type="button" class="btn btn-sm btn-ghost" onClick={() => logout()}>Logout</button>
              </Show>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
