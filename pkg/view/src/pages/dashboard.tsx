import { useUserinfo } from "../stores/userinfo.tsx";
import { useWellKnown } from "../stores/wellKnown.tsx";
import { For } from "solid-js";

export default function DashboardPage() {
  const userinfo = useUserinfo();
  const wellKnown = useWellKnown();

  function getGreeting() {
    const currentHour = new Date().getHours();

    if (currentHour >= 0 && currentHour < 12) {
      return "Good morning! Wishing you a day filled with joy and success. ☀️";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good afternoon! Hope you have a productive and joyful afternoon! ☀️";
    } else {
      return "Good evening! Wishing you a relaxing and pleasant evening. 🌙";
    }
  }

  function getDirectory(): any[] {
    const dir = JSON.parse(JSON.stringify(wellKnown?.directory));
    return Object.entries(dir).map(([k, v]: [string, any]) => {
      v["id"] = k;
      v["open"] = `/o/${k}`;
      return v;
    });
  }

  const clickableStyle: string = "bg-base-200 hover:bg-base-300 transition-all duration-500 w-full aspect-square";

  return (
    <div class="max-w-[720px] mx-auto pt-12">
      <div id="greeting" class="px-5">
        <h1 class="text-2xl font-bold">{userinfo?.displayName}</h1>
        <p>{getGreeting()}</p>
      </div>

      <div id="applications" class="mt-5">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8">
          <For each={getDirectory()}>
            {item => (
              <a href={item.link} target="_blank">
                <div class={`${clickableStyle} cursor-pointer flex items-center justify-center p-5 text-center`}>
                  <div class="flex flex-col gap-2 tooltip" data-tip={item.description}>
                    <i class={`text-base-content text-[32px] ${item.icon}`}></i>
                    <span class="text-sm">{item.name}</span>
                  </div>
                </div>
              </a>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}