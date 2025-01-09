import path from "path";
import react from "@vitejs/plugin-react";
import { plugin as mdPlugin, Mode } from "vite-plugin-markdown";
import { defineConfig } from "vite";

const basenameProd = "/react-shadcn-starter";

export default defineConfig(({ command }) => {
  const isProd = command === "build";

  return {
    base: isProd ? "" : "./",
    plugins: [
      react(),
      mdPlugin({
        mode: [Mode.HTML, Mode.REACT],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      global: {
        basename: "",
      },
    },
  };
});
