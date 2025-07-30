import eslint from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	{
		// react
		files: ["**/*.{js,jsx,mjs,cjs,ts,tsx}"],
		extends: [
			react.configs.flat.recommended,
			react.configs.flat["jsx-runtime"],
		],
		plugins: { react },
		settings: {
			react: { version: "detect" },
		},
		languageOptions: {
			parserOptions: { ecmaFeatures: { jsx: true } },
		},
		rules: {
			"react/no-unused-prop-types": "warn",
		},
	},
	{
		// TS support
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
			parser: tsParser,
			parserOptions: {
				project: "./tsconfig.eslint.json",
				impliedStrict: true,
			},
		},
	},
	{
		// TS rules
		rules: {
			"@typescript-eslint/no-misused-promises": [
				"error",
				{ checksVoidReturn: false },
			],

			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
		},
	},
	{
		// turn off rules that don't apply to JS code
		files: ["**/*.js"],
		extends: [tseslint.configs.disableTypeChecked],
		rules: {
			"@typescript-eslint/explicit-function-return-type": "off",
		},
	},
	prettier, // Turn off rules that prettier covers
	{
		ignores: ["./dist", "./node_modules"],
	}
);
