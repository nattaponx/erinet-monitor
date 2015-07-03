var sql = require('mssql'); 
 
var config = {
    user: 'web_guest',
    password: 'web_guest',
    server: 'selnpcndb01.seln.ete.ericsson.se', 
    database: 'erinetdb',
    
    options: {
        encrypt: false 
    }
}
 
var connection = new sql.Connection(config, function(err) {
    // ... error checks 
    
    // Query 
    
    var request = new sql.Request(connection); // or: var request = connection.request(); 
    request.query('select top 10 [Id],[Time],[Uplink traffic],[Downlink traffic] from dbo._EriNetGgsnPdcPayloadPerSec', function(err, recordset) {
        // ... error checks 
        console.log(err);
        
        console.dir(recordset);
        var jsonData = JSON.stringify(recordset);
        console.log(jsonData);
        // recordset.forEach(function(row) {
        //      console.log(row.NodeName + " " + row.StopDate);
        // });
    });
    
});