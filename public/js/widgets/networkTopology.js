/**
 * Network Topology
 * 
 */
define(["node_modules/d3/d3.js"], function(d3) {
	return {

		//Widget properties
		properties: {
			title: '',
			type: ''
		},

		/**
		 * Initialise a network topology widget
		 * 
		 * @param  {container} parent_container [parent container for the widget]
		 * @param  {String}    type             [type of the box]
		 * @param  {String}    title            [title for the widget]
		 * 
		 */
		init: function(parent_container, type, title){
			console.log('init Network View Widget');
			
			//Set properties
			this.properties.type = type;
			this.properties.title = title;

			var box = d3.select('#' + parent_container)
				.append('div')
				.attr('class', 'box box-' + type);

			var box_header = box.append('div')
				.attr('class', 'box-header with-border')

			//Append title	
			box_header.append('h3')
				.attr('class', 'box-title')
				.text(title);

			var box_body = box.append('div')
				.attr('class', 'box-body')
				.style('background-color', 'lightblue');



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