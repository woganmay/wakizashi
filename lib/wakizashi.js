/**
 * Dependencies
 */

// Third party libraries
var debug = require('debug')('wakizashi');
var merge = require('merge-descriptors');

// Wakizashi libraries
var domoweb = require('./domoweb');
var auth = require('./auth');

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
		_authtoken: token,
		_instance: instance
	};

	// Create empty container function
	var app = function(){};

	// Add in library functions
	merge(app, domoweb, false);
	merge(app, auth, false);

	// And away we go!
	return app; 

}