exports.fetchUser = function(username, password, callback) {
	var connection = require('./lib/connection.js');
	var sql = "SELECT Id,Firstname,Lastname,Role FROM users" +
			  " where Username = '" + username + "' and" +
			  " Password = '" + password + "'";
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });
}