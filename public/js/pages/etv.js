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


require(["topology/networkTopologyController"], function (NetworkTopology) {
	
	NetworkTopology.init('content-container', 'primary', 'Erinet');


});