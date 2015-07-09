/**
 * PDC Performance view
 * 
 */
define(["node_modules/d3/d3.js", "/public/plugins/chartjs/Chart.js"],function (d3, Chart) {
	return{
		//Widget properties
		properties: {
			aaaa: '',
		},

		/**
		 * Initialise a network performance widget
		 * s
		 * @param  {container} parent_container [parent container for the widget]
		 * @param  {String}    type             [type of the box]
		 * @param  {String}    title            [title for the widget]
		 * 
		 */

		init: function(aaaa){
			console.log('init sub Performance View Widget');
			
			//Set properti

			var box = d3.select('#' + parent_container).append('div')
				.attr('class', 'box box-' + type);

			var box_header = box.append('div')
				.attr('class', 'box-header with-border')

			//Append title	
			box_header.append('h3')
				.attr('class', 'box-title')
				.text(title);

			var box_body = box.append('div')
				.attr('class', 'box-body')
				.style('background-color', '#FAFAFA')
				.style('margin', 'auto')
				.style('text-align', 'center');

			

		/////////////////
		//Get functions//
		/////////////////

		

	}

});