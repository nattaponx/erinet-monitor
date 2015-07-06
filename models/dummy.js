var requirejs = require('requirejs');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

requirejs(["../api/connect"], function(connect) {

	connect.fetchFromQuery('select top 10 [Id],[Time],[Uplink traffic],[Downlink traffic]' + 
										'from dbo._EriNetGgsnPdcPayloadPerSec', function(data){

		console.log(data);
	});

});