Wakizashi
=========

An NPM module to simplify access to Domo.com's APIs. Mainly just a shell project and an optimistic dream.

## Installation

    npm install wakizashi
	
## Usage

    var wakizashi = require('wakizashi')('instance-id.domo.com', '123456token');

    client.me(function(data){
    	console.log(data.displayName);
    });

See apidoc.md for more details
	
## Contributing

	No public contributions accepted yet
	
## Release History

* 0.0.4 (2015-09-16) Added the dataflow module, backupAllDataflows() option, and ability to authenticate with a dotfile
* 0.0.3 (2015-05-22) Added dataset class with createDataSet and replaceDataSet
* 0.0.2 (2015-05-22) Added base modules and the me() method
* 0.0.1 (2015-05-22) Shell project created and published 