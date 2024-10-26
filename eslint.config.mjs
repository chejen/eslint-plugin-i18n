import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [{
  ignores: ['**/coverage/', '**/docs/'],
}, ...compat.extends('eslint:recommended'), {
  languageOptions: {
    globals: {
      ...globals.node,
    },

    ecmaVersion: 6,
    sourceType: 'commonjs',

    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },

  rules: {
    'no-duplicate-imports': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-use-before-define': 'error',
    'no-useless-assignment': 'error',
    'eqeqeq': 'error',
    'no-eval': 'error',
    'no-lonely-if': 'error',
    'no-loop-func': 'error',
    'no-multi-assign': 'error',
    'no-useless-return': 'error',
  },
}];
