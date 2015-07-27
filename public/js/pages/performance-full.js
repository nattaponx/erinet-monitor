/**
 * Full Performance view
 * Author: Nattapon Thathong
 */
require.config({
    baseUrl: "/public/js",
    paths: {
        "fullPerformance" : "/public/js/pages/fullPerformance",
        "performance" : "/public/js/pages/nodePerformance"
    },
 });

require(['fullPerformance/fullView',
		'performance/nodeView',
		"fullPerformance/fullController", 
		'performance/nodeController',
		"node_modules/d3/d3.js", 
		"node_modules/eventbus/eventbus.js"],function (fullview, nodeview, fullcontroller, nodecontroller, d3, eventbus) {

	fullcontroller.init('content', 'primary', 'Bearers');

});