/// <reference types="vitest" />
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

// Content Security Policy for the published site. GitHub Pages can't send
// headers, so it goes in a <meta> tag. Only added to production builds,
// because the dev server needs inline scripts for hot reload.
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self'",
  "img-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join("; ");

const csp = (): Plugin => ({
  name: "csp-meta",
  apply: "build",
  transformIndexHtml: (html) =>
    html.replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />\n    <meta http-equiv="Content-Security-Policy" content="${CSP}" />`),
});

// base "./" makes the built site work from any folder, including
// https://<user>.github.io/<repo>/ on GitHub Pages. Routing uses #/ links,
// so no server rewrite rules are needed.
export default defineConfig({
  base: "./",
  plugins: [react(), csp()],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
