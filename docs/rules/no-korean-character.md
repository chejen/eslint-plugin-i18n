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
