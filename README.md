Wakizashi
=========

An NPM module to simplify access to Domo.com's APIs. Currently just a shell project and an optimistic dream.

## Installation

    npm install wakizashi
	
## Usage

    var wakizashi = require('wakizashi')
    var client = wakizashi('instance-id.domo.com', '123456token')

    client.me(function(data){
    	console.log(data.displayName);
    });

See apidoc.md for more details
	
## Contributing

	No public contributions accepted yet
	
## Release History

* 0.0.3 (2015-05-22) Added createDataSet and replaceDataSet methods - it's now useful!
* 0.0.2 (2015-05-22) Added base modules and the me() method
* 0.0.1 (2015-05-22) Shell project created and published 