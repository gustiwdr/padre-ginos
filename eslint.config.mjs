import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import reactPlugin from "eslint-plugin-react";
import pluginQuery from "@tanstack/eslint-plugin-query";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
	{
		ignores: ["coverage/**", "dist/**", "node_modules/**"],
	},
	{
		...js.configs.recommended,
		files: ["**/*.{js,jsx}"],
	},
	{
		...reactPlugin.configs.flat.recommended,
		settings: { react: { version: "detect" } },
	},
	reactPlugin.configs.flat["jsx-runtime"],
	...pluginQuery.configs["flat/recommended"],
	...tseslint.configs.recommendedTypeChecked.map((config) => ({
		...config,
		files: ["**/*.{js,jsx,ts,tsx}"],
	})),
	{
		files: ["**/*.{js,jsx,ts,tsx}"],
		languageOptions: {
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		files: ["*.js", "*.mjs"],
		...tseslint.configs.disableTypeChecked,
	},
	{
		files: ["**/*.{js,jsx}"],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		rules: {
			"react/no-unescaped-entities": "off",
			"react/prop-types": "off",
		},
	},
	prettier,
];
