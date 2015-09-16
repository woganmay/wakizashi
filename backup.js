/**
 * Wakizashi: Dataflow Backup
 * 
 * Quickstart:
 * 
 * 1. Create a ".creds" file in this folder with credentials like so:
 *     { "instance": "instancename.domo.com", "token": "apitoken_here"" }
 * 
 * 2. Run this script from the CLI like so:
 *     node backup.js
 * 
 * 3. (Optional) Modify the parameters in the backupAllDataflows() call below.
 * 
 * Entry point - Console Application
 */

// Load the library and authenticate with the .creds file
var wakizashi = require('./lib/wakizashi')();

wakizashi.backupAllDataflows({
	
	// The root folder to where you want to store the backups
	// A subfolder is created to hold all the files
	// path: "./",
	
	// The name of the subfolder to create. If left unset, the
	// instance domain name will be used.
	// folder: "foldername",
	
	// The types of Dataflows to back up - defaults to both MySQL
	// and Magic ETL, although ETL Dataflows are currently ignored.
	// types: "mysql,etl",
	
	// The backup process starts with a call to list all Dataflows.
	// Set this to TRUE to save the results of that call in a JSON file.
	// saveIndex: false
	
});