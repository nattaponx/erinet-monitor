define(function(){

	return {

		// baseAPIUrl: 'http://localhost/api.php',
		_baseAPIUrl: 'http://localhost:8080/api/pdc/',


		getColumnsInfo: function(tableName, callback){
			$.get(this._baseAPIUrl + 'fetchcolumnsinfo', 
			{tableName: tableName})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},

		getUserSession: function(callback){
			$.get('http://localhost:3000/api/userdata')
			.done(function(jsonData){
			    callback(jsonData);
			});
		},

		getTableName: function(callback){
			$.get(this._baseAPIUrl + 'fetchtablename')
			.done(function(jsonData){
			    callback(jsonData);
			});
		},

		getGsnName: function(callback){
			$.get(this._baseAPIUrl + 'fetchgsnname')
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getGsnVersion: function(gsnName, callback){
			$.get(this._baseAPIUrl + 'fetchgsnversion', 
			{gsnName: gsnName})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getHardware: function(gsnName, gsnVersions, callback){
			$.get(this._baseAPIUrl + 'fetchhardware', 
			{gsnName: gsnName, gsnVersion: gsnVersions})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getRegion: function(gsnName, gsnVersions, hardwares, callback){
			$.get(this._baseAPIUrl + 'fetchregion', 
			{gsnName: gsnName, gsnVersion: gsnVersions
			, hardware: hardwares})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getCountry: function(gsnName, gsnVersions, hardwares, regions, callback){
			$.get(this._baseAPIUrl + 'fetchcountry', 
			{gsnName: gsnName, gsnVersion: gsnVersions
			, hardware: hardwares, region: regions})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getCustomer: function(gsnName, gsnVersions, hardwares, regions, countries, callback){
			$.get(this._baseAPIUrl + 'fetchcustomer', 
			{gsnName: gsnName, gsnVersion: gsnVersions
			, hardware: hardwares, region: regions, country: countries})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getDate: function(gsnName, gsnVersions, hardwares, regions, countries, customers, callback){
			$.get(this._baseAPIUrl + 'fetchdate', 
			{gsnName: gsnName, gsnVersion: gsnVersions
			, hardware: hardwares, region: regions, country: countries, customer: customers})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getNodeId: function(gsnName, gsnVersions, hardwares, regions, countries, customers, dates, callback){
			$.get(this._baseAPIUrl + 'fetchnodeid', 
			{gsnName: gsnName, gsnVersion: gsnVersions
			, hardware: hardwares, region: regions, country: countries, customer: customers, date: dates})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getReport: function(gsnName, gsnVersions, hardwares, regions, countries, customers, dates, nodeIds, callback){
			$.get(this._baseAPIUrl + 'fetchreport', 
			{gsnName: gsnName, gsnVersion: gsnVersions
			, hardware: hardwares, region: regions, country: countries, customer: customers, date: dates, nodeId: nodeIds})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},

	}

});