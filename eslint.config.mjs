import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import cypress from "eslint-plugin-cypress/flat";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js, cypress },
    extends: ["js/recommended", "cypress/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },
]);
