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

require([ 'node_modules/d3/d3.js','topology/networkTopologyController'], function (d3, ntc) {
	 
	//ntc.init('dashboard-container-1-1', 'primary', 'box-1-1');
	//ntc.init('dashboard-container-1-2', 'warning', 'box-1-1');
	//ntc.init('dashboard-container-2-1', 'success', 'box-1-1');
	//ntc.init('dashboard-container-2-2', 'danger', 'box-1-1');
	
	resize();	
	initContainers();

	function initContainers () {
		
		d3.selectAll('.dashboard-container').append('div')
			.attr('class', 'addBtn')
			.on('mouseover', function(){
				console.log('addBtn hover');
			});

		/*
		for(var i = 1; i <= 2; i++){
			for(var j = 1; j <= 2; j++){

				d3.sel
			}
		}
		*/
	}

	function resize(){
		console.log('resize');

		var neg 				  = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
      	var window_height 	      = $(window).height();
      	var sidebar_height 		  = $(".sidebar").height();
      	var content_header_height = $('.content-header').outerHeight();
      	var diff = window_height - neg - content_header_height;

  		$(".content").css('min-height', diff);
  		$(".dashboard-content-container").css('height', diff - 50);
	}
	
});