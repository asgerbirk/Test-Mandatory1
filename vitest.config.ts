import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node", // Use the Node.js environment (default)
    coverage: {
      reporter: ["text", "json", "html"], // Generate coverage reports in multiple formats
      exclude: ["node_modules/", "dist/"],
    },
  },
});
