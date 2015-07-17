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

require(["topology/networkTopologyController", "node_modules/eventbus/eventbus.js", "node_modules/d3/d3.js"], 
	function (ntc, eventbus, d3) {
	
	ntc.init('content-container', 'primary', 'Erinet');

	//var interval = setInterval(function(){ update() }, 5000);

	d3.select('#header-btn').on('click', function(){
		setTimeout(function(){
			eventbus.fire('resize');
		},500);
	});

	function update(){
		eventbus.fire('update');
	}

});