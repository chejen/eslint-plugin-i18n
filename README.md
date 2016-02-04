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
    "i18n/no-chinese-character": 1
  }
}
```


# List of supported rules

* [no-chinese-character](docs/rules/no-chinese-character.md): Prevent usage of Chinese characters.


# License

eslint-plugin-i18n is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
