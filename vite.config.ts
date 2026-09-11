import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";
import { seoFilesPlugin } from "./scripts/seo-files";


// react-helmet-async ships CommonJS only, so Node cannot import its named
// exports from the SSR bundle. Route SSR imports through a default-import shim,
// keeping a single shared module instance so the Helmet context works.
const HELMET_SHIM = "\0virtual:helmet-interop";
const helmetCjsInterop = {
  name: "helmet-cjs-interop",
  enforce: "pre" as const,
  resolveId(id: string, importer: string | undefined, options: { ssr?: boolean }) {
    if (id === "react-helmet-async" && options?.ssr && importer !== HELMET_SHIM) return HELMET_SHIM;
    return null;
  },
  load(id: string) {
    if (id !== HELMET_SHIM) return null;
    return [
      'import mod from "react-helmet-async";',
      "export const Helmet = mod.Helmet;",
      "export const HelmetProvider = mod.HelmetProvider;",
      "export const HelmetData = mod.HelmetData;",
      "export default mod;",
    ].join("\n");
  },
};

// The HTML template carries site wide fallback tags for browsers and crawlers
// that load the shell directly. Once a page is prerendered, the per page tags
// come from SEOHead, so the template copies are removed to avoid two titles or
// a canonical pointing at the homepage on every page. The JSON-LD graph, geo
// tags, fonts, icons and the noscript block in the template are kept.
const DUPLICATE_TEMPLATE_TAGS = [
  /\n?[ \t]*<title>[\s\S]*?<\/title>/,
  /\n?[ \t]*<meta name="description"[^>]*>/,
  /\n?[ \t]*<meta name="robots"[^>]*>/,
  /\n?[ \t]*<link rel="canonical"[^>]*>/,
  /\n?[ \t]*<meta property="og:(?:title|description|url|type|site_name|locale|image)"[^>]*>/g,
  /\n?[ \t]*<meta name="twitter:(?:card|title|description|image)"[^>]*>/g,
];

function stripDuplicateTemplateTags(html: string) {
  const stripped = DUPLICATE_TEMPLATE_TAGS.reduce((acc, pattern) => acc.replace(pattern, ""), html);
  // The no script fallback exists for the unrendered shell only. Prerendered
  // pages already carry the real copy and their own h1, so drop it here.
  return stripped.replace(/<noscript>[\s\S]*?<\/noscript>/, "");
}

// Framer Motion renders its pre animation state during prerendering, which
// would bake opacity:0 and transforms into the static markup and hide real copy
// from crawlers. Strip those declarations so the static HTML shows the end state.
function unhideAnimatedContent(html: string) {
  return html.replace(/style="([^"]*)"/g, (match, styles: string) => {
    if (!/opacity\s*:\s*0(\D|$)|transform\s*:/.test(styles)) return match;
    const cleaned = styles
      .split(";")
      .map((decl) => decl.trim())
      .filter((decl) => decl && !/^opacity\s*:\s*0(\D|$)/.test(decl) && !/^transform\s*:/.test(decl))
      .join("; ");
    return cleaned ? `style="${cleaned}"` : "";
  });
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  define: {
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },
  plugins: [helmetCjsInterop, react(), mode === "development" && componentTagger(), mcpPlugin()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    entry: "src/main.tsx",
    dirStyle: "nested",
    concurrency: 4,
    beastiesOptions: false,
    onBeforePageRender: (_route: string, indexHTML: string) => stripDuplicateTemplateTags(indexHTML),
    onPageRendered: (_route: string, html: string) => unhideAnimatedContent(html),
  },
}));
