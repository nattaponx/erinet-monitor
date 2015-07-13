/**
 * Network Topology Model
 * Author: Victor Larsson (elarvic)
 */
define([],function () {
	return {

		//Widget properties
		properties: {
			title: '',
			type: '',
			parent_container: '',
			components: ''
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

			this.fetchNetworkComponents();
		},

		/**
		 * Fetching the network components in the current network
		 * 
		 */
		fetchNetworkComponents: function () {
			$.ajax({
		        type: 'GET',
		        url: 'dummy_data/components.json',
		        //async: false,
		        datatype: 'JSON',
		        success: function(data)
		        {
		            if (data) 
		            {
		                console.log(data.data.components);

		                /*
		                data.data.forEach(function(component){
		                	this.properties.components.push()
		                });

		                this.properties.components = data.data.components;
		                */
		            }
		        }.bind(this)
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

		getParentContainer: function(){
			return this.properties.parent_container;
		},

		getComponents: function(){
			return this.properties.components;
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