require.config({
    baseUrl: "/public/js",
    paths: {
        "widgets"  : "/public/js/widgets",
        "topology" : "/public/js/widgets/networkTopology"
    },
 });

require(['topology/networkTopologyController'],function (NetworkTopology) {
	//NetworkTopology.init('dashboard-container-1-1', 'primary', 'box-1-1');
	//NetworkTopology.init('dashboard-container-1-2', 'warning', 'box-1-2');
	//NetworkTopology.init('dashboard-container-2-1', 'success', 'box-2-1');
	//NetworkTopology.init('dashboard-container-2-2', 'danger', 'box-2-2');
});