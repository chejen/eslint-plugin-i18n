# Disallow Chinese Characters (no-chinese-character)

In an internationalized application, Chinese characters are not disallowed. This rule helps to find out where Chinese characters are.

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
