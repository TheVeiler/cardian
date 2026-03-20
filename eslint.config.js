import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores(["package-lock.json", "dist/"]),

	tseslint.configs.recommended,

	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		plugins: { js },
		extends: ["js/recommended"],
	},
	{
		files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
		languageOptions: { globals: { ...globals.browser, ...globals.node } },
	},
	{
		files: ["**/*.json"],
		plugins: { json },
		language: "json/json",
		extends: ["json/recommended"],
	},
	{
		files: ["**/*.jsonc"],
		plugins: { json },
		language: "json/jsonc",
		extends: ["json/recommended"],
	},
	{
		files: ["**/*.json5"],
		plugins: { json },
		language: "json/json5",
		extends: ["json/recommended"],
	},
	{
		files: ["**/*.md"],
		plugins: { markdown },
		language: "markdown/gfm",
		extends: ["markdown/recommended"],
	},
	{
		files: ["**/*.css"],
		plugins: { css },
		language: "css/css",
		extends: ["css/recommended"],
	},
	{
		rules: {
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			"@typescript-eslint/no-require-imports": "off",
			"no-unused-private-class-members": "off",
		},
	},
	{
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
]);
