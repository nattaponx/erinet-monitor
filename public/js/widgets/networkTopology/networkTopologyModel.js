/**
 * Network Topology Model
 */
define([],function () {
	return {

		//Widget properties
		properties: {
			title: '',
			type: '',
			parent_container: '',
			componets: ''
		},

		/**
		 * Initialise the network topology model
		 * 
		 * @param  {container} parent_container [parent container for the widget]
		 * @param  {String}    type             [type of the box]
		 * @param  {String}    title            [title for the widget]
		 * 
		 */
		init: function (parent_container, title, type) {
			
			//Set properties
			this.properties.type  = type;
			this.properties.title = title;
		},

		/**
		 * Fetching the network components in the current network
		 * 
		 */
		fetchNetworkComponents: function () {
			$.ajax({
		        type: 'GET',
		        url: 'data/data.json',
		        datatype: 'JSON',
		        success: function(data)
		        {
		            if (data) 
		            {
		                console.log(data);
		            }
		        }
		    });
		},


		/////////////////
		//Get functions//
		/////////////////

		getTitle: function(){
			return this.properties.title;
		},

		getType: function(){
			return this.properties.type;
		},

		/////////////////
		//Set functions//
		/////////////////

		setTitle: function(title){
			this.properties.title = title;
		},

		setType: function(type){
			this.properties.type = type;
		}
	}
});