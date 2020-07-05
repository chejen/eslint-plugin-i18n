/**
 * @fileoverview Rule to flag use of Chinese character
 * @author Chang, Che-Jen
 */

'use strict';

// ----------------------------------------------------------------------------
// Requirements
// ----------------------------------------------------------------------------

const define = require('../utils/define');

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

const lang = 'Chinese';
const regex = /[\u4E00-\u9FFF]/;

module.exports = define(lang, regex);
