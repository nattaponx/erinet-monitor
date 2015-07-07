require(['public/js/widgets/networkPerformance.js'],function (NetworkPerformance) {
	NetworkPerformance.init('dashboard-container-1-1', 'success', 'Bearers', 'chart-1');
	NetworkPerformance.init('dashboard-container-1-2', 'warning', 'CPU Loads','chart-2');
	NetworkPerformance.init('dashboard-container-1-3', 'danger', 'Packets', 'chart-3');
	//NetworkPerformance.init('dashboard-container-wide', 'info', 'Bearers');
});

