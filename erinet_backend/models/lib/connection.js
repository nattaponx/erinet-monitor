exports.connectMysql = function(queryString, callback) {
    var mysql      = require('mysql');
    var connection = mysql.createConnection({
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'erinet'
    });
     
    connection.connect();
     
    connection.query(queryString, function(err, rows, fields) {
      if (err) throw err;
      callback(rows);
    });
     
    connection.end();

}


