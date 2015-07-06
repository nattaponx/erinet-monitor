var connect = require('../api/connect'); 
var result = connect.connector('select top 10 [Id],[Time],[Uplink traffic],[Downlink traffic]' + 
								'from dbo._EriNetGgsnPdcPayloadPerSec');
console.log(result);