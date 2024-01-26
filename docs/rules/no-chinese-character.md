# Disallow Chinese Characters (no-chinese-character)

In an internationalized application, Chinese characters are not allowed. This rule helps to find out where Chinese characters are.

## Rule Details

The following patterns are considered problems:

```js
var str = "中文字";
```

The following patterns are not considered problems:

```js
var str = "English";

// or

var str = this.getIntlMessage("i18n.key"); // using an i18n tool instead of regular Chinese characters
```

## Rule Options

The rule takes an object option with the following keys:

### {boolean} `includeIdentifier`

* In general, we don't check identifiers for l10n/i18n. If you would like to lint them, set `includeIdentifier` as `true` to enforce checking.

```json
"i18n/no-chinese-character": [
  "warn",
  {
    "includeIdentifier": true
  }
]
```

### {boolean} `includeComment`

* It's also not common to check comments for l10n/i18n, but you can set `includeComment` as `true` to enforce checking.

```json
"i18n/no-chinese-character": [
  "warn",
  {
    "includeComment": true
  }
]
```

### {array} `excludeArgsForFunctions`

* We exclude from the check the functions specified in the `excludeArgsForFunctions` option.

```json
"i18n/no-chinese-character": [
  "warn",
  {
    "excludeArgsForFunctions": ["i18n", "l10n"]
  }
]
```
