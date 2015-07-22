/**
 * Preview Box utility
 */

define(['node_modules/d3/d3.js',
		'node_modules/eventbus/eventbus.js'], function (d3, eventbus) {
	
	return{

		properties:{
			parent: '',
			netComponent: ''
		},

		init: function (parent, netComponent){
			this.properties.parent       = parent;
			this.properties.netComponent = netComponent;

			/* Event listeners */

			eventbus.addListener('resize', function() {
				resize(this.properties.parent);
			}.bind(this));

			this.displayBox(parent);
		},

		displayBox: function(parent){
			var type = 'primary';

			//Append box
			var box = d3.select('#' + parent).append('div')
				.attr('id', 'preview-box')
				.attr('class', 'box box-' + type);

			//Append box-header
			var box_header = box.append('div')
				.attr('id', 'preview-box-header')
				.attr('class', 'box-header with-border')

			//Append title	
			box_header.append('h3')
				.attr('id', 'preview-box-title')
				.attr('class', 'box-title')
				.text(this.properties.netComponent.getName());

			//Append box-tool wrapper
			var box_tools = box_header.append('div')
				.attr('class', 'box-tools pull-right');	

			//Append remove btn
			var remove_btn = box_tools.append('button')
				.attr('class', 'btn btn-box-tool')
				.on('click', function() {
					$('#preview-box').fadeOut('lagom', function() {
						$('#preview-box').remove();
					});
				});

			//Append remove icon
			remove_btn.append('icon')
				.attr('class', 'fa fa-times');

			//Append box-body
			var box_body = box.append('div')
				.attr('id', 'preview-box-body')
				.attr('class', 'box-body');	
		}
	}

	function resize (parent) {
		// body...
	}
});