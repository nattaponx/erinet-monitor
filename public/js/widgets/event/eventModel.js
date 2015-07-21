/**
 * Event Model
 * Author: Victor Larsson (elarvic)
 */

define(["node_modules/eventbus/eventbus.js"],
	function (eventbus) {
		return{
			
			properties: {
				parent: '',
				title: '',
				data: ''
			},

			init: function(parent, title) {
				this.properties.parent = parent;
				this.properties.title  = title;
			},

			update: function() {
				
			},

			getData: function() {
				return this.properties.data;
			}
		}

		function fetchData(url) {
			$.ajax({
				url: url,
				type: 'GET',
				async: true,
		        datatype: 'JSON',
				success: function (data) {
					
				}
			});
		}
});