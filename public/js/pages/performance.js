require(['public/js/widgets/pdcPerformance.js'],function (pdcPerf) {
	//
	//pdcPerf.init(#parent-container, type, title, data (must be unique), carousel_num);
	//
	pdcPerf.init('success', 'Bearers', 'data_bearers');
	pdcPerf.initChartRealTime('data_bearers');
	pdcPerf.init('warning', 'CPU Loads','data_cpuloads');
	pdcPerf.initChartRealTime('data_cpuloads');
	pdcPerf.init('danger', 'Packets', 'data_packets');
	pdcPerf.initChartRealTime('data_packets');
	//pdcPerf.init('corousel-chart-4', 'info', 'Throughput', 'data_eee','3');
});