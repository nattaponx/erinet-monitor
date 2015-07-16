/**
 * Dashboard
 * Author: Victor Larsson (elarvic)
 */

require.config({
    baseUrl: "/public/js",
    paths: {
        "widgets"  : "/public/js/widgets",
        "topology" : "/public/js/widgets/networkTopology"
    },
 });

require(['topology/networkTopologyController'],function (ntc) {
	
	//ntc.init('dashboard-container-1-1', 'primary', 'box-1-1');
	//ntc.init('dashboard-container-1-2', 'warning', 'box-1-1');
	//ntc.init('dashboard-container-2-1', 'success', 'box-1-1');
	//ntc.init('dashboard-container-2-2', 'danger', 'box-1-1');
	
});