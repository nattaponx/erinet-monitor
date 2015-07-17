exports.fetchNodeStatus = function(callback) {
    var connection = require('./lib/connection.js');
    var sql = 'SELECT * FROM erinetggsnpdcnodestatusall';
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });
}

exports.fetchPayLoad = function(callback) {
    var connection = require('./lib/connection.js');
    var sql = 'SELECT * FROM erinetggsnpdcpayloadpersec';
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });
}
