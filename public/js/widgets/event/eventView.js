/**
 * Event View
 * Author: Victor Larsson (elarvic)
 */

define(["node_modules/d3/d3.js",
	"node_modules/eventbus/eventbus.js"],
	function (d3, eventbus) {
		return{
			
			properties: {
				parent: ''
			},

			init: function(parent, title) {
				this.properties.parent = parent
				var type = 'primary';

				var box = d3.select('#' + parent)
				.append('div')
				.attr('id', 'ew-box')
				.attr('class', 'box box-' + type);

				var box_header = box.append('div')
					.attr('id', 'ew-box-header')
					.attr('class', 'box-header with-border')

				//Append title	
				box_header.append('h3')
					.attr('id', 'ew-box-title')
					.attr('class', 'box-title')
					.text(title);

				var box_body = box.append('div')
					.attr('id', 'ew-box-body')
					.attr('class', 'box-body');


				/* Event listeners */

				eventbus.addListener('resize', function() {
					resize(this.properties.parent);
				}.bind(this));
			}

		}

		function resize(parent) {
			var boxHeight      = $('#' + parent).height();
			var box_bodyHeight = boxHeight - $('#ew-box-header').height();
			var margin 		   = 23;

			console.log('netpc boxHeight ' + boxHeight);

      		$("#ew-box").css('height', boxHeight);
      		$("#ew-box-body").css('height', box_bodyHeight - margin);
		}
});