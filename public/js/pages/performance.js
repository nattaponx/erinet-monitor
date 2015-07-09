require(['public/js/widgets/pdcPerformance.js'],function (pdcPerf) {
	pdcPerf.init('corousel-chart-1', 'success', 'Bearers', 'data_bearers');
	pdcPerf.init('corousel-chart-2', 'warning', 'CPU Loads','data_cpuloads');
	pdcPerf.init('corousel-chart-3', 'danger', 'Packets', 'data_packets');
	//pdcPerf.init('dashboard-container-wide', 'info', 'Bearers');
});