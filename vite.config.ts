/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { coverageConfigDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      all: false,
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./tests/unit/coverage",
      include: ["src/"],
      exclude: [
        ...coverageConfigDefaults.exclude,
        "src/main.tsx",
        "src//.d.ts",
        "src/**/.types.ts",
        "src/utils",
        "src/api",
        "src/components/Search",
      ],
    },
    css: false,
  },
  resolve: {
    alias: {
      "@": "./src",
    },
  },
});

