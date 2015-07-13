/**
 * Network Topology Controller
 * Author: Victor Larsson (elarvic)
 */
define(["node_modules/d3/d3.js", "topology/networkTopologyModel", "topology/networkTopologyView"],function (d3, ntm, ntv) {
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
			ntv.init(parent_container, type, title);

			ntv.drawComponents(ntm.getComponents());
		},
	}

});