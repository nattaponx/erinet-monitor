
define(["node_modules/d3/d3.js", "performance/nodeModel", 
	"performance/nodeView", "node_modules/eventbus/eventbus.js"],
	function (d3, nodemodel, nodeview, eventbus) {
	
	return{

		/**
		 * Initialise a network topology widget
		 * 
		 * @param  {container} parent_container [parent container for the widget]
		 * @param  {String}    type             [type of the box]
		 * @param  {String}    title            [title for the widget]
		 * 
		 */
		init: function(container, type, title, dataset, chartType){
			console.log('init nodeController Widget');

			nodeview.init(container, type, title, dataset, chartType);
			

			},
		}

	});