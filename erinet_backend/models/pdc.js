exports.updateColumnsInfo = function(dataSet, callback) {
    var connection = require('./lib/connection.js');
    var sql = "UPDATE pdccolumnsinfo SET ColumnReName = CASE Id ";
    dataSet['ColumnReName'].forEach(function(d, idx){
    	sql += "WHEN '"+ dataSet['Id'][idx] +"' THEN '"+ d +"' ";
    });
    sql += "END, Unit = CASE Id ";
    dataSet['Unit'].forEach(function(d, idx){
    	sql += "WHEN '"+ dataSet['Id'][idx] +"' THEN '"+ d +"' ";
    });
    sql += "END, Formula = CASE Id ";
    dataSet['Formula'].forEach(function(d, idx){
    	sql += "WHEN '"+ dataSet['Id'][idx] +"' THEN '"+ d +"' ";
    });
    sql += "END, Format = CASE Id ";
    dataSet['Format'].forEach(function(d, idx){
    	sql += "WHEN '"+ dataSet['Id'][idx] +"' THEN '"+ d +"' ";
    });
    sql += "END, Visible = CASE Id ";
    dataSet['Visible'].forEach(function(d, idx){
    	sql += "WHEN '"+ dataSet['Id'][idx] +"' THEN '"+ d +"' ";
    });
    sql += "END WHERE Id IN ("+ dataSet['Id'].join() +")";

    console.log(sql);
    connection.connectMysql(sql, function(jsonData){
    	if(jsonData.affectedRows){
    		//Success
    		callback({'data':jsonData});
    	}
    	else
    		callback({'error':jsonData});
    });
}

exports.fetchColumnsInfo = function(tableName, callback) {
    var connection = require('./lib/connection.js');
    var sql = "SELECT * FROM pdccolumnsinfo" +
    		  " where TableName = '" + tableName+ "'";
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });
}

exports.fetchTableName = function(callback) {
    var connection = require('./lib/connection.js');
    var sql = 'SELECT distinct TableName FROM pdccolumnsinfo';
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });
}

exports.fetchGsnName = function(callback) {
    var connection = require('./lib/connection.js');
    var sql = 'SELECT distinct GsnName FROM pdccontent';
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });
}

exports.fetchGsnVersion = function(gsnName, callback) {
    var connection = require('./lib/connection.js');
    var sql = "SELECT distinct GsnVersion FROM pdccontent" +
    		  " where GsnName = '" + gsnName + "' and GsnVersion != '' and GsnVersion is not null";
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });
}

exports.fetchHardware = function(gsnName, gsnVersions, callback) {
	var connection = require('./lib/connection.js');
	var sql = "SELECT distinct Hardware FROM pdccontent" +
			  " where GsnName = '" + gsnName + "' and ";
		sql += convertToSQL('GsnVersion', gsnVersions);
		sql += " and Hardware != '' and Hardware is not null";
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });
}

exports.fetchRegion = function(gsnName, gsnVersions, hardwares, callback) {
	var connection = require('./lib/connection.js');
	var sql = "SELECT distinct Region FROM pdccontent" +
		  	  " where GsnName = '" + gsnName + "' and ";
		sql += convertToSQL('GsnVersion', gsnVersions);
		sql += " and ";
		sql += convertToSQL('Hardware', hardwares);
		sql += " and Region != '' and Region is not null";
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });
}

exports.fetchCountry = function(gsnName, gsnVersions, hardwares, regions, callback) {
	var connection = require('./lib/connection.js');
	var sql = "SELECT distinct Country FROM pdccontent" +
			  " where GsnName = '" + gsnName + "' and ";
		sql += convertToSQL('GsnVersion', gsnVersions);
		sql += " and ";
		sql += convertToSQL('Hardware', hardwares);
		sql += " and ";
		sql += convertToSQL('Region', regions);
		sql += " and Country != '' and Country is not null";
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });
}

exports.fetchCustomer = function(gsnName, gsnVersions, hardwares, regions, countries, callback) {
	var connection = require('./lib/connection.js');
	var sql = "SELECT distinct CustomerName FROM pdccontent" +
			  " where GsnName = '" + gsnName + "' and ";
		sql += convertToSQL('GsnVersion', gsnVersions);
		sql += " and ";
		sql += convertToSQL('Hardware', hardwares);
		sql += " and ";
		sql += convertToSQL('Region', regions);
		sql += " and ";
  		sql += convertToSQL('Country', countries);
		sql += " and CustomerName != '' and CustomerName is not null";
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });
}

exports.fetchDate = function(gsnName, gsnVersions, hardwares, regions, countries, customers, callback) {
	var connection = require('./lib/connection.js');
	var sql = "SELECT distinct Year, Month FROM pdccontent" + 
			  " where GsnName = '" + gsnName + "' and ";	
		sql += convertToSQL('GsnVersion', gsnVersions);
		sql += " and ";
		sql += convertToSQL('Hardware', hardwares);
		sql += " and ";
		sql += convertToSQL('Region', regions);
		sql += " and ";
  		sql += convertToSQL('Country', countries);	 
  		sql += " and ";
  		sql += convertToSQL('CustomerName', customers);		
		sql += " and Year != '' and Year is not null and Month != '' and Month is not null";
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });
}

exports.fetchNodeId = function(gsnName, gsnVersions, hardwares, regions, countries, customers, dates, callback) {
	var connection = require('./lib/connection.js');
	var	sql = "SELECT distinct NodeId FROM pdccontent" +
			  " where GsnName = '" + gsnName + "' and ";
		sql += convertToSQL('GsnVersion', gsnVersions);
		sql += " and ";
		sql += convertToSQL('Hardware', hardwares);
		sql += " and ";
		sql += convertToSQL('Region', regions);
		sql += " and ";
  		sql += convertToSQL('Country', countries);	 
  		sql += " and ";
  		sql += convertToSQL('CustomerName', customers);	
  		sql += " and (";
		dates.forEach(function(val,idx){
			var splited = val.split("-");
			if(idx == 0){
				sql += " (Year = '" + splited[0] + "' and Month = '" + splited[1] + "')";
			}
			
			else{
				sql += "or (Year = '" + splited[0] + "' and Month = '" + splited[1] + "')";
			}
		});
		sql += ") and NodeId != '' and NodeId is not null";
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });
}

exports.fetchReport = function(gsnName, gsnVersions, hardwares, regions, countries, customers, dates, nodeIds, callback) {
	var connection = require('./lib/connection.js');
	var sql = "SELECT distinct Id FROM pdccontent" +
			  " where GsnName = '" + gsnName + "' and ";
		sql += convertToSQL('GsnVersion', gsnVersions);
		sql += " and ";
		sql += convertToSQL('Hardware', hardwares);
		sql += " and ";
		sql += convertToSQL('Region', regions);
		sql += " and ";
  		sql += convertToSQL('Country', countries);	 
  		sql += " and ";
  		sql += convertToSQL('CustomerName', customers);
  		sql += " and (";
  		dates.forEach(function(val,idx){
			var splited = val.split("-");
			if(idx == 0){
				sql += " (Year = '" + splited[0] + "' and Month = '" + splited[1] + "')";
			}
			
			else{
				sql += "or (Year = '" + splited[0] + "' and Month = '" + splited[1] + "')";
			}
		});
		sql += ") and ";
		sql += convertToSQL('NodeId', nodeIds);
		sql += " and Id != '' and Id is not null";
    connection.connectMysql(sql, function(jsonData){
      callback({'data':jsonData});
    });
}

function convertToSQL(tag, objs){
	var temp = "(";
	objs.forEach(function(val,idx){
		if(idx == 0)
			temp += " " + tag + " = '" + val + "'";
		else
			temp += "or " + tag + " = '" + val + "'";
	});
	temp += ")";
	return temp;
}