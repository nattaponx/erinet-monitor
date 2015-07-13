define(function(){

	return {

		getGsnName: function(callback){
			$.get( "http://localhost/api.php", { component: 'pdc', target: 'fetchgsnname' } ).done(function(jsonData){
			    callback(jsonData);
			});
		},


	}


});