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
	
	containers = ['1-1','1-2','2-1','2-2'];
	
	resize();
	$(window).resize(function(){
		resize();
	});

	$('.dashboard-container').addClass('centerContent');
	initContainers();

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

	function initContainers () {

		/*
		for(var i = 1; i <= 2; i++){
			for(var j = 1; j <= 2; j++){

				d3.selectAll('.dashboard-container-' + i + '-' + j).append('div')
					.attr('class', 'addBtn')
					.attr('id', 'addBtn-' + i + '-' + j)
					.on('mouseover', function(){
						console.log('hover ' + '#addBtn-' + i + '-' + j);
						$('#addBtn-' + i + '-' + j).css('background-color', '#00285F')
					})
					.on('mouseout', function(){
						$('#addBtn-' + i + '-' + j).css('background-color', 'white')
					});
			}
		}
		*/
		containers.forEach(function(id){
			d3.select('.dashboard-container-' + id).append('div')
				.attr('class', 'addBtn')
				.attr('id', 'addBtn-' + id)
				.on('mouseover', function(){
					$('#addBtn-' + id).css('background-color', '#3c8dbc')
				})
				.on('mouseout', function(){
					$('#addBtn-' + id).css('background-color', 'white')
				})
				.on('click', function(){
					console.log('clicked addBtn- ' + id);
				});
		});
	}

	
	
});