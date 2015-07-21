/**
 * Event Controller
 * Author: Victor Larsson (elarvic)
 */

define(["node_modules/d3/d3.js",
	"node_modules/eventbus/eventbus.js",
	"event/eventModel", 
	"event/eventView"],
	function (d3, eventbus, em, ev) {
		return{

			init: function(parent, title) {
				console.log('init Network Performance Widget');

				//init Model and View
				em.init(parent, title);
				ev.init(parent, title);

				/* Event Listeners */
				eventbus.addListener('update-all-widgets', function() {
					this.update();
				});

				eventbus.addListener('update-ew', function() {
					this.update();
				});
			},

			update: function() {
				em.update();
				ev.update(em.getData());
			}

		}
});