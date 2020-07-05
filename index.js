'use strict';

module.exports = {
  rules: {
    'no-chinese-character': require('./lib/rules/no-chinese-character'),
    'no-greek-character': require('./lib/rules/no-greek-character'),
    'no-japanese-character': require('./lib/rules/no-japanese-character'),
    'no-korean-character': require('./lib/rules/no-korean-character'),
    'no-russian-character': require('./lib/rules/no-russian-character'),
    'no-thai-character': require('./lib/rules/no-thai-character'),
  },
  rulesConfig: {
    'no-chinese-character': 1,
    'no-greek-character': 1,
    'no-japanese-character': 1,
    'no-korean-character': 1,
    'no-russian-character': 1,
    'no-thai-character': 1,
  },
  configs: {
    recommended: {
      plugins: [
        'i18n',
      ],
      rules: {
        'i18n/no-chinese-character': 'warn',
        'i18n/no-greek-character': 'warn',
        'i18n/no-japanese-character': 'warn',
        'i18n/no-korean-character': 'warn',
        'i18n/no-russian-character': 'warn',
        'i18n/no-thai-character': 'warn',
      },
    },
  },
};
