define(['performance/nodeChart'],function (nodechart) {
	return {

		//Widget properties
		properties: {
			title: '',
			type: '',
			parent_container: '',
			charts: []
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

			this.syncFetchNetworkComponents();
		},

		///,


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
			return this.properties.charts;
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