/**
 * Dependencies
 */

var https = require('https');
var debug = require('debug')('domoweb');
var merge = require('merge-descriptors');

/**
 * Prototype
 */

var domoweb = exports = module.exports = {};

/**
 * Attach Functions
 */

/**
 * Domoweb Request
 * Basically just http.request(), adding the token header in
 */
domoweb.domoRequest = function(data, options, cb)
{

	// Set up the post data we're sending across
	var postData = null;

	switch(options.contentType)
	{
		// For JSON, stringify the object
		case "application/json": postData = JSON.stringify(data); break;

		// TODO Some requests use text/xml and other odd request types

		// Otherwise just send it along as is
		default: postData = data; break;
	}

	var options = {
		hostname: settings._instance,
		port: 443,
		path: options.path,
		method: options.method,
		headers: {
			'X-DOMO-Developer-Token': settings._authtoken,
			'Content-Type': options.contentType,
			'Content-Length': postData.length
		}
	};

	// Run the request and handle the callbacks
	var req = https.request(options, function(res){

		res.setEncoding('utf8');

		// This is probably bad - if multiple data events are triggered the callback will fire multiple times
		// TODO: Fix this before it becomes a problem
		res.on('data', function(responseData){

			// Run the callback with the response data
			cb({}, JSON.parse(responseData));

		});

	});

	req.on('error', function(e) {
		// TODO Implement better error handling
		debug(e);
	});

	// Send the request
	req.write(postData);
	req.end();

}