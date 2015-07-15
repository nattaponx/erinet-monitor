define(function(){

	return {


		// baseAPIUrl: 'http://localhost/api.php',
		baseAPIUrl: 'http://localhost/api.php',

		getGsnName: function(callback){
			$.get(this.baseAPIUrl, 
			{component: 'pdc', target: 'fetchgsnname'})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getGsnVersion: function(gsnName, callback){
			$.get(this.baseAPIUrl, 
			{component: 'pdc', target: 'fetchgsnversion', gsnName: gsnName})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getHardware: function(gsnName, gsnVersions, callback){
			$.get(this.baseAPIUrl, 
			{component: 'pdc', target: 'fetchhardware', gsnName: gsnName, gsnVersion: gsnVersions})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getRegion: function(gsnName, gsnVersion, hardwares, callback){
			$.get(this.baseAPIUrl, 
			{component: 'pdc', target: 'fetchregion', gsnName: gsnName, gsnVersion: gsnVersion
			, hardware: hardwares})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getCountry: function(gsnName, gsnVersion, hardware, regions, callback){
			$.get(this.baseAPIUrl, 
			{component: 'pdc', target: 'fetchcountry', gsnName: gsnName, gsnVersion: gsnVersion
			, hardware: hardware, region: regions})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getCustomer: function(gsnName, gsnVersion, hardware, region, countries, callback){
			$.get(this.baseAPIUrl, 
			{component: 'pdc', target: 'fetchcustomer', gsnName: gsnName, gsnVersion: gsnVersion
			, hardware: hardware, region: region, country: countries})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getDate: function(gsnName, gsnVersion, hardware, region, country, customers, callback){
			$.get(this.baseAPIUrl, 
			{component: 'pdc', target: 'fetchdate', gsnName: gsnName, gsnVersion: gsnVersion
			, hardware: hardware, region: region, country: country, customer: customers})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getNodeId: function(gsnName, gsnVersion, hardware, region, country, customer, dates, callback){
			$.get(this.baseAPIUrl, 
			{component: 'pdc', target: 'fetchnodeid', gsnName: gsnName, gsnVersion: gsnVersion
			, hardware: hardware, region: region, country: country, customer: customer, date: dates})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},
		getReport: function(gsnName, gsnVersion, hardware, region, country, customer, date, nodeIds, callback){
			$.get(this.baseAPIUrl, 
			{component: 'pdc', target: 'fetchreport', gsnName: gsnName, gsnVersion: gsnVersion
			, hardware: hardware, region: region, country: country, customer: customer, date: date, nodeId: nodeIds})
			.done(function(jsonData){
			    callback(jsonData);
			});
		},

	}

});