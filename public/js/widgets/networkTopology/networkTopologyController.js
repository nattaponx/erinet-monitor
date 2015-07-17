/**
 * Network Topology Controller
 * Author: Victor Larsson (elarvic)
 */
define(["node_modules/d3/d3.js", "topology/networkTopologyModel", 
	"topology/networkTopologyView", "node_modules/eventbus/eventbus.js"],
	function (d3, ntm, ntv, eventbus) {
	
	return{

		/**
		 * Initialise a network topology widget
		 * 
		 * @param  {container} parent_container [parent container for the widget]
		 * @param  {String}    type             [type of the box]
		 * @param  {String}    title            [title for the widget]
		 * 
		 */
		init: function(parent_container, type, title){
			console.log('init Network Topology Widget');

			ntm.init(parent_container, type, title);
			ntv.init(parent_container, type, title, ntm.getComponents());

			//ntv.drawComponents(ntm.getComponents());

			eventbus.addListener('update', function() {
				update();
			});
		},
	}

	function update() {
		//console.log('update');

		//fetch new data
		var newData = ntm.updateData();

		if(newData){
			ntv.update(ntm.getComponents());
		}	
	}

});