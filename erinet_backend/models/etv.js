exports.fetchETVNode = function(callback) {
    var connection = require('./lib/connection.js');
    var sql = 'SELECT * FROM etvnodeinformation';
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });

}
