/**
 * PDC Performance view
 * Author: Nattapon Thathong
 */
require.config({
    baseUrl: "/public/js",
    paths: {
        "widgets"  : "/public/js/pages",
        "performance" : "/public/js/pages/nodePerformance"
    },
 });

require(['performance/nodeView',
		"performance/nodeController", 
		"node_modules/d3/d3.js", 
		"node_modules/eventbus/eventbus.js"],function (pdcview, pdccontroller, d3, eventbus) {

	d3.select('#header-toggle-btn').on('click', function(){
		setTimeout(function() {
			eventbus.fire('resize');
		},300);
	});

	d3.select('#fullscreen-btn').on('click', function(){
			eventbus.fire('fullscreenMode');
	});

	// d3.select('#autoplay-btn').on('click', function(){
	// 		eventbus.fire('autoplay');
	// });

	pdccontroller.init('carousel-item', 'primary', 'Bearers', 'data_bearers', 'realtime_linechart');
	pdccontroller.init('carousel-item', 'primary', 'CPU Loads', 'data_cpuloads', 'realtime_gaugechart');
	pdccontroller.init('carousel-item', 'primary', 'Packets', 'data_packets', 'realtime_linechart');
	//pdccontroller.init('carousel-item', 'primary', 'Throughput', 'data_throughput', 'realtime_linechart');


});