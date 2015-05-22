 /**
 * Dependencies
 */

var https = require('https');
var debug = require('debug')('domoweb');
var merge = require('merge-descriptors');

/**
 * Prototype
 */

var dataflows = exports = module.exports = {};

/**
 * Attach Functions
 */

/**
 *  dataflow management
 */
dataflows= function(){ return {} }();