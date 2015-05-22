Wakizashi
=========

An NPM module to simplify access to Domo.com's APIs. Currently just a shell project and an optimistic dream.

## Installation

    npm install wakizashi
	
## Usage

    var wakizashi = require('wakizashi')
    var domo = wakizashi('instance-id.domo.com', '123456token')

    domo.me(function(data){
    	console.log(data.displayName);
    });
	
## Contributing

	No public contributions accepted yet
	
## Release History

* 0.0.1 (2015-05-22) Shell project created and published 