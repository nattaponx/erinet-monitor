define(["node_modules/eventbus/eventbus.js"],
	function (eventbus) {
		return{
			
			properties: {
				parent: '',
				title: '',
				url: '',
				data: ''
			},

			init: function(parent, title, url) {
				this.properties.parent = parent;
				this.properties.title  = title;
				this.properties.url    = url;
			},

			update: function() {
				//
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