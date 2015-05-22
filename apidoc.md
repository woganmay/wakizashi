Wakizashi API Documentation
===========================

To create a new instance, pass in the Domo instance URL and API Token as parameters:

    var wakizashi = require('wakizashi');
    var client = wakizashi('instance.domo.com', 'abc123');

## Authentication

The token should authenticate you automatically. To get your current user object:

    client.me();

Dump that out to get your displayName, email address, role, etc. If this call fails, then you're using a bad token.

## DataSets

To create a DataSet, at a bare minimum, you need a schema. A schema is a list of column types. The data needs to be arranged in the same order - Domo uses column ordinals, and not names, when importing data. This sample schema demonstrates all the data types:

    var schema = [
        { name: "Date Column", type: "DATE" },
        { name: "DateTime Column", type: "DATETIME" },
        { name: "Double Column", type: "DOUBLE" },
        { name: "Long Column", type: "LONG" },
        { name: "String Column", type: "STRING" }
    ];

To create the DataSet, send in the Schema along with some basic information:

    createDataSet(options[, callback])

The `columns` parameter is mandatory. The name and desc can be left blank, and defaults will be used (but it probably won't be as useful).

    client.createDataSet({
    	name: "Name your DataSet",
    	desc: "Additional description - blank string is OK",
    	type: "Wakizashi", // Alternatively use any type name you want
    	columns: schema
    }, function(error, result){
    	console.log(result); // eg: dataSource.dataSourceId = guid
    });

The `createDataSet()` method will create the schema, and return the GUID for the datasource. With that, you can then populate it with the `replaceDataSet()` method:

    replaceDataSet(options[, callback]);

Data needs to be provided in CSV format in all cases. Domo does not accept JSON objects, or XML data. The columns in the data need to correlate to the columns in the schema. Here's some sample data for the schema provided above:

    var stringData = '"2015-01-01","2015-01-01 12:34:56","95.32","1234567890","Wakazashi"';

Note that there are no spaces between fields, and that all fields are encapsulated with quotes ("), even values that wouldn't traditionally need it under CSV. Here's how you'd upload it;

	wz.replaceDataSet({
		id: result.dataSource.dataSourceId, // The DataSource ID from the createDataSet() call
		data: stringData // The string data
	}, function(error, result){
		console.log(result); // Example: dataVersion.dataVersionId = int
	});

Domo keeps internal versions of data. If you replace a DataSet, you should receive an integer that indicates the version of the data. For new sets it'll always be 1 - if it's higher, then you've just replaced some existing data.

Note that every upload needs to run through processing before it becomes available to the instance, and the processing time will scale linearly with the amount of data uploaded.