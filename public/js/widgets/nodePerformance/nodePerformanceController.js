/**
 * Node Performance Controller
 * Author: Victor Larsson (elarvic)
 */

define(["node_modules/d3/d3.js",
	"node_modules/eventbus/eventbus.js",
	"nodePerformance/nodePerformanceModel", 
	"nodePerformance/nodePerformanceView"],
	function (d3, eventbus, nodepm, nodepv) {
		return{

			init: function(parent, title, url) {
				console.log('init Network Performance Widget');

				//init Model and View
				nodepm.init(parent, title, url);
				nodepv.init(parent, title);

				/* Event Listeners */
				eventbus.addListener('update-all-widgets', function() {
					this.update();
				});

				eventbus.addListener('update-nodepw', function() {
					this.update();
				});
			},

			update: function(argument) {
				nodepm.update();
				nodepv.update(nodepm.getData());
			}
		}
});