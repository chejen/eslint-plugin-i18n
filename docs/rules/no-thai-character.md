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
