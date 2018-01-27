[![NPM License][npm-license-image]][npm-license-url]
[![NPM Version][npm-version-image]][npm-version-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][codecov-image]][codecov-url]

[npm-license-image]: https://img.shields.io/npm/l/eslint-plugin-i18n.svg
[npm-license-url]: https://www.npmjs.com/package/eslint-plugin-i18n
[npm-version-image]: https://img.shields.io/npm/v/eslint-plugin-i18n.svg
[npm-version-url]: https://www.npmjs.com/package/eslint-plugin-i18n
[npm-downloads-image]: https://img.shields.io/npm/dt/eslint-plugin-i18n.svg
[npm-downloads-url]: https://www.npmjs.com/package/eslint-plugin-i18n
[travis-image]: https://img.shields.io/travis/chejen/eslint-plugin-i18n.svg
[travis-url]: https://travis-ci.org/chejen/eslint-plugin-i18n
[codecov-image]: https://codecov.io/github/chejen/eslint-plugin-i18n/coverage.svg?branch=master
[codecov-url]: https://codecov.io/github/chejen/eslint-plugin-i18n?branch=master


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
