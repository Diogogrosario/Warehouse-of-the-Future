module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	parser: "@typescript-eslint/parser",
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 13,
		sourceType: "module",
	},
	plugins: [
		"react",
		"@typescript-eslint",
	],
	rules: {},
};
