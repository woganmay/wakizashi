/* global moment */
/* global settings */
/**
 * Dependencies
 */

var domoweb = require('./domoweb');
var debug = require('debug')('dataflow');
var fs = require('fs');
var util = require('util');
var moment = require('moment');
var vsprintf = require("sprintf-js").vsprintf;
var sanitize = require("sanitize-filename");

/**
 * Prototype
 */

var dataflow = exports = module.exports = {};

/**
 * Attach Functions
 */

// Back up all the dataflows I have access to, into the target folder
dataflow.backupAllDataflows = function(options, cb)
{

	// Defaults
	options = options || {};
	
	var backupOptions = {
		path: options.path || "./",
		folder: options.folder || settings._instance,
		types: options.types || "mysql,etl",
		saveIndex: options.saveIndex || false
	};

    // Check for defaults.
	// if (options.columns == null) throw new Error("Cannot create a DataSet without a schema!");
	
	var folderPath = backupOptions.path + backupOptions.folder + "/";
	
	debug("Creating root directory: " + folderPath);
	
	// STEP_1 = Here we go: Start by verifying the folder
	fs.stat(folderPath, function(error, result){
		
		if (error != null)
		{
			// Folder does not exist
			fs.mkdirSync(folderPath);
		}
		
		// Folder exists, continue on
		
		// STEP_2 = Query instance
		debug("Querying instance for Total Dataflows");
		
		var requestPath = "/api/data/v2/onboard/flows?";
		var totalDataFlows = 0;
		
		domoweb.domoRequest({}, {
			path: requestPath + "limit=1", // Just pull back 1 flow so we get the metadata
			method: "GET",
			contentType: "application/json"
		}, function(error, result){
			
			if (error != null)
			{
				// Bad request!
			}
			
			totalDataFlows = result.metaData.totalCount;
			
			debug("Total Dataflows to backup: " + totalDataFlows);
			
			// Now query for all the dataflows in one big go
			// Because we're both brave and stupid. Really you should be
			// dividing it up into chunks of 100 flows at a time and use
			// incremental offsets.
			
			// Hahaha. Haha. Ha. Lazy.
			requestPath += "limit=" + totalDataFlows + "&";
			requestPath += "offset=&"; // No offsets
			requestPath += "orderBy=lastRun&"; // The default
			requestPath += "type=" + backupOptions.types; // Determine what gets backed up
			
			debug("Querying for Index...");
			
			domoweb.domoRequest({}, {
				path: requestPath, 
				method: "GET",
				contentType: "application/json"
			}, function(error, result){
				
				if (error != null)
				{
					// Bad request!
				}
				
				debug("Index retrieved!");
				
				if (backupOptions.saveIndex)
				{
					// Let's start by dumping this entire JSON object out to a file
					var indexFilename = "index_" + moment().format("YYYY_MM_DD_HH_mm_ss") + ".json";
					fs.writeFileSync(folderPath+indexFilename, util.inspect(result, { showHidden: true, depth: 24}));
					console.log("Index saved to disk as: " + indexFilename);
				}

				debug("Iterating dataflows");
				
				for(var i = 0; i < result.onboardFlows.length; i++)
				{
				
					// Query DomoWeb for the full transforms
					dataflow.getDataflowById({ id: result.onboardFlows[i].id }, function(error, result) {
						
						switch(result.databaseType)
						{
							case "MYSQL":
							
								// Handle this MySQL dataflow
								var dfName = sanitize(result.name).replace("  ", " ");
								var dataflowFile = vsprintf("%s_%s_%s", [result.id, result.databaseType, dfName]);
								
								// If the file exists we'll just overwrite it, no problem
								fs.writeFileSync(folderPath + dataflowFile + ".json", util.inspect(result, { showHidden: true, depth: 24}), { flags: 'w' });
								debug("Saved Config: "+dataflowFile+".json");
								
								// Create the SQL string by collapsing the Transform actions
								var sqlString = "";
								var transformStep = 0;
								for (var j = 0; j < result.actions.length; j++)
								{
									if (result.actions[j].type == "SQL")
									{
										transformStep++;
										sqlString += "/***************************************************/\n";
										sqlString += "/** START STEP "+transformStep+" **/\n";
										sqlString += "/***************************************************/\n";
										sqlString += result.actions[j].statements;
										sqlString += "\n/***************************************************/\n";
										sqlString += "/** END STEP "+transformStep+" **/\n";
										sqlString += "/***************************************************/\n\n";
									}
								}
								
								// Now write out the SQL string
								fs.writeFileSync(folderPath + dataflowFile + ".sql", sqlString, { flags: 'w' });
								debug("Saved Transforms: "+dataflowFile+".sql");
								
								console.log("Backed up: " + result.name);
								
							break;
							
							// TODO: cases for ETL and Redshift
						}			
						
					});
					
				}
				
				// STEP_99 = Handle the callback
				if (typeof cb == 'function') cb(error, result);
				
			});
			
			
		});
		
	});

}

dataflow.getDataflowById = function(options, cb)
{
	domoweb.domoRequest({}, {
		path: "/api/data/v1/onboard/flows/" + options.id, 
		method: "GET",
		contentType: "application/json"
	}, function(error, result){
		
		if (typeof cb == 'function') cb(error, result);
		
	});
}