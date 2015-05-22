/**
 * Dependencies
 */

var domoweb = require('./domoweb');
var debug = require('debug')('auth');

/**
 * Prototype
 */

var auth = exports = module.exports = {};

/**
 * Attach Functions
 */

auth.me = function(cb)
{

	// Test auth._authtoken
	// /api/content/v2/users/me

	domoweb.domoRequest(null, {
		path: "/api/content/v2/users/me",
		method: "GET",
		contentType: "text/xml"
	}, function(data) {
		
		if (!data.hasOwnProperty('id'))
		{
			throw new Error("Unable to retrieve User object");
		}
		else
		{
			if (typeof cb == 'function') cb(data);
		}

	});

}