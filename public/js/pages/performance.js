require.config({
    baseUrl: "/public/js",
    paths: {
        "widgets"  : "/public/js/widgets",
        "performance" : "/public/js/widgets/nodePerformance"
    },
 });

require(['performance/nodeView',
		"performance/nodeController", 
		"node_modules/d3/d3.js", 
		"node_modules/eventbus/eventbus.js"],function (pdcview, d3, eventbus) {
	//
	//pdcPerf.init(type, title, data (must be unique));
	//

	// d3.select('#header-toggle-btn').on('click', function(){
	// 	setTimeout(function() {
	// 		eventbus.fire('resize');
	// 	},100);
	// });

	
	pdcview.init('carousel-item', 'primary', 'Bearers', 'data_bearers', 'realtime_linechart');

	pdcview.init('success', 'Bearers', 'data_bearers');
	pdcview.initChartRealTime('data_bearers');
	pdcview.init('warning', 'CPU Loads','data_cpuloads');
	pdcview.initChartRealTime('data_cpuloads');
	pdcview.init('danger', 'Packets', 'data_packets');
	pdcview.initChartRealTime('data_packets');
	pdcview.init('info', 'Throughput', 'data_eee');
	pdcview.initChartRealTime('data_eee');

	//pdcPerf.initDetailGraph('data_bearers');
});