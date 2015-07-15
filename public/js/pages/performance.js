require(['public/js/widgets/pdcPerformance.js'],function (pdcPerf) {
	//
	//pdcPerf.init(type, title, data (must be unique));
	//
	pdcPerf.init('success', 'Bearers', 'data_bearers');
	pdcPerf.initChartRealTime('data_bearers');
	pdcPerf.init('warning', 'CPU Loads','data_cpuloads');
	pdcPerf.initChartRealTime('data_cpuloads');
	pdcPerf.init('danger', 'Packets', 'data_packets');
	pdcPerf.initChartRealTime('data_packets');
	//pdcPerf.init('info', 'Throughput', 'data_eee');
	//pdcPerf.initChartRealTime('data_eee');
});