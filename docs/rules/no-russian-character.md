# Disallow Russian Characters (no-russian-character)

In an internationalized application, Russian characters are not allowed. This rule helps to find out where Russian characters are.

## Rule Details

The following patterns are considered problems:

```js
var str = "Русский";
```

The following patterns are not considered problems:

```js
var str = "English";

// or

var str = this.getIntlMessage("i18n.key"); // using an i18n tool instead of regular Russian characters
```

## Rule Options

The rule takes one option, an object, which has one key `includeIdentifier` having boolean values `true` or `false`.
* In general, we don't check identifiers for l10n/i18n. If you would like to lint them, set `includeIdentifier` as `true` to enforce checking.

```json
"i18n/no-russian-character": [
  "warn",
  {
    "includeIdentifier": true
  }
]
```
