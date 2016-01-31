'use strict';

module.exports = {
  rules: {
    'no-chinese-character': require('./lib/rules/no-chinese-character')
  },
  rulesConfig: {
    'no-chinese-character': 0
  }
};
