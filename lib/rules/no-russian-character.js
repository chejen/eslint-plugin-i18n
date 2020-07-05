/**
 * @fileoverview Rule to flag use of Russian character
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

const lang = 'Russian';
const regex = /[\u0400-\u04FF]/;

module.exports = define(lang, regex);
