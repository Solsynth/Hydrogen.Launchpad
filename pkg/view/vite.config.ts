import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import devtools from "solid-devtools/vite";

export default defineConfig({
  plugins: [devtools({ autoname: true }), solid()],
  server: {
    proxy: {
      "/api": "http://localhost:8443",
      "/.well-known": "http://localhost:8443"
    }
  }
});
