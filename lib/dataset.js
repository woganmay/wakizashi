/**
 * Dependencies
 */

var domoweb = require('./domoweb');
var debug = require('debug')('dataset');

/**
 * Prototype
 */

var dataset = exports = module.exports = {};

/**
 * Attach Functions
 */

// Create a new DataSet in the account
dataset.createDataSet = function(options, cb)
{

	// Create a new DataSet
	var createRequest = {}

	// Defaults
	var createOptions = {
		name: options.name || "Wakizashi DataSet",
		desc: options.desc || "Procedurally uploaded from wakizashi",
		type: options.type || settings._type
	};

	if (options.columns == null) throw new Error("Cannot create a DataSet without a schema!");

	var createRequest = {
		dataSourceType: createOptions.type,
		dataSourceName: createOptions.name,
		dataSourceDescription: createOptions.desc,
		schema: { 
			columns: options.columns
		}
	};

	domoweb.domoRequest(createRequest, {
		path: "/api/data/v2/datasources",
		method: "POST",
		contentType: "application/json"
	}, function(error, result) {

		if (!result.hasOwnProperty('dataSource'))
		{
			error = { message: "Error while creating DataSet", inner: error };
		}

		if (typeof cb == 'function') cb(error, result);

	});

}

dataset.replaceDataSet = function(options, cb)
{

	if (options.data == undefined) throw new Error("You need to supply some data in order to Replace");
	if (options.id == undefined) throw new Error("No data source ID provided");

	domoweb.domoRequest(options.data, {
		path: "/api/data/v2/datasources/" + options.id + "/dataversions",
		method: "POST",
		contentType: "text/csv"
	}, function(error, result){

		if (!result.hasOwnProperty('dataVersion'))
		{
			error = { message: "Error while Replacing DataSet", inner: error };
		}

		if (typeof cb == 'function') cb(error, result);

	});
}
