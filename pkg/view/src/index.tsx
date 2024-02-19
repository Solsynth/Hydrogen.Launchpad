import "solid-devtools";

/* @refresh reload */
import { render } from "solid-js/web";

import "./index.css";
import "./assets/fonts/fonts.css";
import { lazy } from "solid-js";
import { Route, Router } from "@solidjs/router";

import "@fortawesome/fontawesome-free/css/all.min.css";

import RootLayout from "./layouts/RootLayout.tsx";
import PageLayout from "./layouts/PageLayout.tsx";
import { UserinfoProvider } from "./stores/userinfo.tsx";
import { WellKnownProvider } from "./stores/wellKnown.tsx";

const root = document.getElementById("root");

render(() => (
  <WellKnownProvider>
    <UserinfoProvider>
      <Router root={RootLayout}>
        <Route component={PageLayout}>
          <Route path="/" component={lazy(() => import("./pages/dashboard.tsx"))} />
        </Route>
        {/* TODO Implement built-in renderer */}
        {/* Currently this will work, but not perfect, we are going to optimize it and enable it again. */}
        {/* <Route path="/o/:slug" component={lazy(() => import("./pages/application.tsx"))} /> */}
      </Router>
    </UserinfoProvider>
  </WellKnownProvider>
), root!);
