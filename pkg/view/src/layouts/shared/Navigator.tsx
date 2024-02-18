import { createMemo, Match, Switch } from "solid-js";
import { clearUserinfo, useUserinfo } from "../../stores/userinfo.tsx";
import { useNavigate } from "@solidjs/router";
import { useWellKnown } from "../../stores/wellKnown.tsx";

export default function Navigator() {
  const wellKnown = useWellKnown();
  const userinfo = useUserinfo();
  const navigate = useNavigate();

  const components = createMemo(() => wellKnown?.components);

  function logout() {
    clearUserinfo();
    navigate("/auth/login");
  }

  return (
    <div class="navbar bg-base-100 shadow-md px-5 z-10 fixed top-0">
      <div class="navbar-start">
        <a class="btn btn-ghost text-xl p-2 w-[48px] h-[48px] max-lg:ml-2.5" href="/">
          <img width="40" height="40" src="/favicon.svg" alt="Logo" />
        </a>
      </div>
      <div class="navbar-center flex">
        <ul class="menu menu-horizontal px-1">
        </ul>
      </div>
      <div class="navbar-end pe-5">
        <Switch>
          <Match when={userinfo?.isLoggedIn}>
            <button type="button" class="btn btn-sm btn-ghost" onClick={() => logout()}>Logout</button>
          </Match>
          <Match when={!userinfo?.isLoggedIn}>
            <a href={`${components()["identity"]}/auth/login`} class="btn btn-sm btn-primary">Login</a>
          </Match>
        </Switch>
      </div>
    </div>
  );
}
