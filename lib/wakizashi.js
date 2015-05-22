/**
 * Dependencies
 */

// Third party libraries
var debug = require('debug')('wakizashi');
var merge = require('merge-descriptors');

// Wakizashi libraries
var domoweb = require('./domoweb');
var auth = require('./auth');
var dataset = require('./dataset');

/**
 * Expose `createInstance()`
 */

exports = module.exports = createInstance;

/**
 * Create a new instance of Wakizashi. Pass in a Domo Developer API Token
 *
 * @paran token
 * @return {Function}
 * @api public
 */

function createInstance(instance, token)
{

	// Store globally-accessible settings
	this.settings = {

		// Authentication details
		_authtoken: token,
		_instance: instance,

		// The DataSource Type to upload as
		// This can be overridden per create
		_type: "Wakizashi"
	};

	// Create empty container function
	var app = function(){};

	// Add in library functions
	merge(app, domoweb, false);
	merge(app, auth, false);
	merge(app, dataset, false);

	// And away we go!
	return app; 

}