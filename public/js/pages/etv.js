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
	resize()
	eventbus.fire('resize');

	d3.select('#header-btn').on('click', function(){
		setTimeout(function(){
			eventbus.fire('resize');
		},500);
	});

	$(window).resize(function(){
		setTimeout(function(){
			resize();
			eventbus.fire('resize');
		},500);
	});

	function resize() {
		var neg 				  = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
      	var window_height 	      = $(window).height();
      	var sidebar_height 		  = $('.sidebar').height();
      	var content_header_height = $('.content-header').outerHeight();
      	var diff = window_height - neg - content_header_height;

  		$(".content").css('height', diff);
  		$(".content-container").css('height', diff - 50);
	}

	function update(){
		eventbus.fire('update');
	}

});