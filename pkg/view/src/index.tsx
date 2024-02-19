import "solid-devtools";

/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import "./assets/fonts/fonts.css";
import { lazy } from "solid-js";
import { Route, Router } from "@solidjs/router";

import "@fortawesome/fontawesome-free/css/all.min.css";

import RootLayout from "./layouts/RootLayout.tsx";
import { UserinfoProvider } from "./stores/userinfo.tsx";
import { WellKnownProvider } from "./stores/wellKnown.tsx";

const root = document.getElementById("root");

render(() => (
  <WellKnownProvider>
    <UserinfoProvider>
      <Router root={RootLayout}>
        <Route path="/" component={lazy(() => import("./pages/dashboard.tsx"))} />
        <Route path="/o/:slug/*path" component={lazy(() => import("./pages/application.tsx"))} />
      </Router>
    </UserinfoProvider>
  </WellKnownProvider>
), root!);
