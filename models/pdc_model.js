if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define(["../api/connect.js"], function(connect){
  return {
    fetchPdcPayloadPersec: function(callback) {	
		connect.fetchFromQuery('select top 10 [Id],[Time],[Uplink traffic],[Downlink traffic]' + 
											'from dbo._EriNetGgsnPdcPayloadPerSec', 
		function(data){
			callback(data);
		});
    }
  }
});





