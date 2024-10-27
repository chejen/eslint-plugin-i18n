[![NPM License][npm-license-image]][npm-license-url]
[![NPM Version][npm-version-image]][npm-version-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]
[![Ubuntu CI Status][github-actions-linux-image]][github-actions-linux-url]
[![Windows CI Status][github-actions-win-image]][github-actions-win-url]
[![Coverage Status][codecov-image]][codecov-url]

[npm-license-image]: https://img.shields.io/npm/l/eslint-plugin-i18n.svg
[npm-license-url]: https://www.npmjs.com/package/eslint-plugin-i18n
[npm-version-image]: https://img.shields.io/npm/v/eslint-plugin-i18n.svg
[npm-version-url]: https://www.npmjs.com/package/eslint-plugin-i18n
[npm-downloads-image]: https://img.shields.io/npm/dt/eslint-plugin-i18n.svg
[npm-downloads-url]: https://www.npmjs.com/package/eslint-plugin-i18n
[github-actions-linux-image]: https://github.com/chejen/eslint-plugin-i18n/actions/workflows/linux.yml/badge.svg
[github-actions-linux-url]: https://github.com/chejen/eslint-plugin-i18n/actions/workflows/linux.yml
[github-actions-win-image]: https://github.com/chejen/eslint-plugin-i18n/actions/workflows/windows.yml/badge.svg
[github-actions-win-url]: https://github.com/chejen/eslint-plugin-i18n/actions/workflows/windows.yml
[codecov-image]: https://codecov.io/github/chejen/eslint-plugin-i18n/branch/master/graph/badge.svg?branch=master
[codecov-url]: https://app.codecov.io/gh/chejen/eslint-plugin-i18n?branch=master


eslint-plugin-i18n
===================

ESLint rules for internationalization.

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) as a dev-dependency:

```sh
$ npm install --save-dev eslint
```

Install ` eslint-plugin-i18n` as a dev-dependency:

```sh
$ npm install --save-dev eslint-plugin-i18n
```

# Configuration

Add `plugins` section to your `.eslintrc` and specify eslint-plugin-i18n as a plugin:

```json
{
  "plugins": [
    "i18n"
  ]
}
```

Finally, enable the rules that you would like to use.

```json
{
  "rules": {
    "i18n/no-chinese-character": 1,
    "i18n/no-greek-character": 1,
    "i18n/no-japanese-character": 1,
    "i18n/no-korean-character": 1,
    "i18n/no-russian-character": 1,
    "i18n/no-thai-character": 1
  }
}
```


# List of supported rules

* [no-chinese-character](docs/rules/no-chinese-character.md): Prevent usage of Chinese characters.
* [no-greek-character](docs/rules/no-greek-character.md): Prevent usage of Greek characters.
* [no-japanese-character](docs/rules/no-japanese-character.md): Prevent usage of Japanese characters.
* [no-korean-character](docs/rules/no-korean-character.md): Prevent usage of Korean characters.
* [no-russian-character](docs/rules/no-russian-character.md): Prevent usage of Russian characters.
* [no-thai-character](docs/rules/no-thai-character.md): Prevent usage of Thai characters.


# License

eslint-plugin-i18n is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).


# Changelog

## v2.4.0 - October 27, 2024

Features
- Added `excludeModuleImports` option to exclude imports from linting.
- Updated the `excludeArgsForFunctions` option.

Chore
- Upgreded devDependencies.
- Applied auto-publish.

## v2.3.1 - April 10, 2024
- Extended the ability of `excludeArgsForFunctions` option.

## v2.3.0 - January 26, 2024
- Added rule options to exclude some function arguments from linting.

## v2.2.0 - January 16, 2024
- Added rule options to support comments linting.

## v2.1.0 - June 17, 2021
- Added rule options to support identifier linting.
- Dropped the support of node < 12 for development environment (due to lint-staged and mocha)

## v2.0.0 - July 4, 2020
- Dropped support for node < 10
- Added JSX support
