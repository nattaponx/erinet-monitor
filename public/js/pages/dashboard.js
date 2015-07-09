require(['public/js/widgets/networkTopology.js'],function (NetworkTopology) {
	NetworkTopology.init('dashboard-container-1-1', 'primary', 'box-1-1');
	NetworkTopology.init('dashboard-container-1-2', 'warning', 'box-1-1');
	NetworkTopology.init('dashboard-container-2-1', 'success', 'box-1-1');
	NetworkTopology.init('dashboard-container-2-2', 'danger', 'box-1-1');
	
});