/* global process */
/**
 * Dependencies
 */

// Third party libraries
var debug = require('debug')('wakizashi');
var merge = require('merge-descriptors');
var fs = require('fs');

// Wakizashi libraries
var domoweb = require('./domoweb');
var auth = require('./auth');
var dataset = require('./dataset');
var dataflow = require('./dataflow');

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
	
	// Look for a credentials file
	if (instance == null || token == null)
	{
		try {
			var credFile = fs.readFileSync(".creds", 'utf8');
			var creds = JSON.parse(credFile);
			token = creds.token;
			instance = creds.instance;
		}
		catch(error)
		{
			console.log("Not configured! Create a .creds file in the root folder.");
		}
		
	}

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
	merge(app, dataflow, false);

	// And away we go!
	return app; 

}