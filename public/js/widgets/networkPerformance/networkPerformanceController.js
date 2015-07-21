define(["node_modules/d3/d3.js",
	"node_modules/eventbus/eventbus.js",
	"netwPerformance/networkPerformanceModel", 
	"netwPerformance/networkPerformanceView"],
	function (d3, eventbus, npm, npv) {
		return{

			init: function(parent, title, url) {
				console.log('init Network Performance Widget');

				//init Model and View
				npm.init(parent, title, url);
				npv.init(parent, title);

				/* Event Listeners */
				eventbus.addListener('update-all-widgets', function() {
					this.update();
				});

				eventbus.addListener('update-netpw', function() {
					this.update();
				});
			},

			update: function(argument) {
				npm.update();
				npv.update(npm.getData());
			}

		}
});