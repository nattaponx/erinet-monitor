/**
 * Etv
 * Author: Victor Larsson (elarvic)
 */
require.config({
    baseUrl: "/public/js",
    paths: {
        "widgets"  : "/public/js/widgets",
        "topology" : "/public/js/widgets/networkTopology"
    },
 });

require(["topology/networkTopologyController", "node_modules/eventbus/eventbus.js"], 
	function (ntc, eventbus) {
	
	ntc.init('content-container', 'primary', 'Erinet');

	//var interval = setInterval(function(){ update() }, 5000);

	function update(){
		eventbus.fire('update');
	}

});