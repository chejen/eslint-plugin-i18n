# Disallow Japanese Characters (no-japanese-character)

In an internationalized application, Japanese characters are not allowed. This rule helps to find out where Japanese characters are.

## Rule Details

The following patterns are considered problems:

```js
var str = "日本語";
```

The following patterns are not considered problems:

```js
var str = "English";

// or

var str = this.getIntlMessage("i18n.key"); // using an i18n tool instead of regular Japanese characters
```
