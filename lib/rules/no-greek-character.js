/**
 * @fileoverview Rule to flag use of Greek character
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

const lang = 'Greek';
const regex = /[\u0374-\u03FF]/;

module.exports = define(lang, regex);
