require(['public/js/widgets/pdcPerformance.js'],function (pdcPerf) {
	//
	//pdcPerf.init(#parent-container, type, title, data (must be unique), carousel_num);
	//
	pdcPerf.init('corousel-chart-1', 'success', 'Bearers', 'data_bearers', '0');
	pdcPerf.initChartRealTime('data_bearers');
	pdcPerf.init('corousel-chart-2', 'warning', 'CPU Loads','data_cpuloads','1');
	pdcPerf.initChartRealTime('data_cpuloads');
	pdcPerf.init('corousel-chart-3', 'danger', 'Packets', 'data_packets','2');
	pdcPerf.initChartRealTime('data_packets');
	//pdcPerf.init('corousel-chart-4', 'info', 'Throughput', 'data_eee','3');
});