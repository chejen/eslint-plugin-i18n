'use strict';

module.exports = {
  rules: {
    'no-chinese-character': require('./lib/rules/no-chinese-character')
    'no-non-ascii-character': require('./lib/rules/no-non-ascii-character')
    'no-date-pattern': require('./lib/rules/no-date-pattern')
  },
  rulesConfig: {
    'no-chinese-character': 0
    'no-non-ascii-character': 0
    'no-date-pattern': 0
  }
};
