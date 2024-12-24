import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    globalSetup: "./vitest.global-setup.ts",
    environmentMatchGlobs: [["src/http/controllers/**", "prisma"]],
  },
});
