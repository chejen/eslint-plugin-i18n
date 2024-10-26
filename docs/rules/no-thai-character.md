# Disallow Thai Characters (no-thai-character)

In an internationalized application, Thai characters are not allowed. This rule helps to find out where Thai characters are.

## Rule Details

The following patterns are considered problems:

```js
var str = "ไทย";
```

The following patterns are not considered problems:

```js
var str = "English";

// or

var str = this.getIntlMessage("i18n.key"); // using an i18n tool instead of regular Thai characters
```

## Rule Options

The rule takes an object option with the following keys:

### {boolean} `includeIdentifier`

* In general, we don't check identifiers for l10n/i18n. But if you'd like to lint them, set `includeIdentifier` as `true` to enforce checking.

```json
"i18n/no-thai-character": [
  "warn",
  {
    "includeIdentifier": true
  }
]
```

### {boolean} `includeComment`

* It's also not common to check comments for l10n/i18n, but you can set `includeComment` as `true` to enforce checking.

```json
"i18n/no-thai-character": [
  "warn",
  {
    "includeComment": true
  }
]
```

### {boolean} `excludeModuleImports`

* Set `excludeModuleImports` to `true` if you wanna skip checks from ES6 imports or dynamic imports.
> If you're using CommonJS modules, you can leverage [excludeArgsForFunctions](#array-excludeargsforfunctions) option.

```json
"i18n/no-chinese-character": [
  "warn",
  {
    "excludeModuleImports": true
  }
]
```

### {array} `excludeArgsForFunctions`

* Skip the checks for the arguments of functions by specifying the `excludeArgsForFunctions` option.

```json
"i18n/no-thai-character": [
  "warn",
  {
    "excludeArgsForFunctions": ["i18n", "l10n", "i18n.t"]
  }
]
```
