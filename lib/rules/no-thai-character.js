/**
 * @fileoverview Rule to flag use of Thai character
 * @author Chang, Che-Jen
 */

'use strict';

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

const define = require('../utils/define');

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

const lang = 'Thai';
const regex = /[\u0E00-\u0E7F]/;

module.exports = define(lang, regex);
