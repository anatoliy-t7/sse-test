import prettier from 'eslint-config-prettier';
import svelte from 'eslint-plugin-svelte';
import ts from 'typescript-eslint';
import globals from 'globals';
import js from '@eslint/js';
import * as depend from 'eslint-plugin-depend';
import pluginSecurity from 'eslint-plugin-security';

/** @type {import('eslint').Linter.Config[]} */
export default [
	pluginSecurity.configs.recommended,
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	prettier,
	...svelte.configs['flat/prettier'],
	depend.configs['flat/recommended'],

	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		}
	},
	{
		ignores: [
			'.DS_Store',
			'build/',
			'.svelte-kit/',
			'dist/',
			'package/',
			'.env',
			'.env.*',
			'!.env.example'
		]
	},
	{
		settings: {
			perfectionist: {
				partitionByComment: true,
				type: 'natural'
			}
		}
	}
];
