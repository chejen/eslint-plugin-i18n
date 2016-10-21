# Disallow Greek Characters (no-greek-character)

In an internationalized application, Greek characters are not allowed. This rule helps to find out where Greek characters are.

## Rule Details

The following patterns are considered problems:

```js
var str = "Ελληνικά";
```

The following patterns are not considered problems:

```js
var str = "English";

// or

var str = this.getIntlMessage("i18n.key"); // using an i18n tool instead of regular Greek characters
```
