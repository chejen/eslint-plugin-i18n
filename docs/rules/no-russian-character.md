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
