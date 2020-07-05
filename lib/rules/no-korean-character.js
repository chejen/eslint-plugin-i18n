/**
 * @fileoverview Rule to flag use of Korean character
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

const lang = 'Korean';
const regex = /[\uAC00-\uD7A3]/;

module.exports = define(lang, regex);
