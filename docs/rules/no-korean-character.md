# Disallow Korean Characters (no-korean-character)

In an internationalized application, Korean characters are not allowed. This rule helps to find out where Korean characters are.

## Rule Details

The following patterns are considered problems:

```js
var str = "한국어";
```

The following patterns are not considered problems:

```js
var str = "English";

// or

var str = this.getIntlMessage("i18n.key"); // using an i18n tool instead of regular Korean characters
```

## Rule Options

The rule takes one option, an object, which has several keys with boolean values `true` or `false`.

### includeIdentifier

* In general, we don't check identifiers for l10n/i18n. If you would like to lint them, set `includeIdentifier` as `true` to enforce checking.

```json
"i18n/no-korean-character": [
  "warn",
  {
    "includeIdentifier": true
  }
]
```

### includeComment

* In general, we don't check comments for l10n/i18n. If you would like to lint them, set `includeComment` as `true` to enforce checking.

```json
"i18n/no-korean-character": [
  "warn",
  {
    "includeComment": true
  }
]
```
