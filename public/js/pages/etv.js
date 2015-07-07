require.config({
    baseUrl: "/public/js",
    paths: {
        "widgets"  : "/public/js/widgets",
        "topology" : "/public/js/widgets/networkTopology"
    },
 });


require(["widgets/networkTopology/networkTopologyController"], function (NetworkTopology) {
	
	NetworkTopology.init('content-container', 'primary', 'Erinet');


});