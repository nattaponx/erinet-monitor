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
	
	var containers = ['1-1','1-2','2-1','2-2'];
	var widgets    = ['Topology', 'Network Performance', 'Node Performance', 'Alarms/Events'];
	
	resize();
	$(window).resize(function(){
		resize();
	});

	$('.dashboard-container').addClass('centerContent');

	//TODO Remove all of the widgetBtns
	/*
	d3.selectAll('.dashboard-container').on('click', function(){
		//d3.selectAll('.widgetBtn').remove();
	});
	*/

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
		containers.forEach(function(id){

			var addBtnImg 		   = 'public/img/plus-big.png';
			var addBtnImg_selected = 'public/img/plus-big-selected.png';

			d3.select('#dashboard-container-' + id).append('div')
				.attr('class', 'addBtn')
				.attr('id', 'addBtn-' + id)
				.on('mouseover', function(){
					$('#addBtn-' + id).css('background-color', '#3c8dbc');
					$('#addBtn-img-' + id).attr('src', addBtnImg_selected);
				})
				.on('mouseout', function(){
					$('#addBtn-' + id).css('background-color', 'white');
					$('#addBtn-img-' + id).attr('src', addBtnImg);
				})
				.on('click', function(){
					console.log('clicked addBtn-' + id);
					displayWidgets(id);
				});

			
			d3.select('#addBtn-' + id).append('img')
				.attr('class', 'addBtn-img')
				.attr('id', 'addBtn-img-' + id)
				.attr('src', addBtnImg);
		});
	}

	function displayWidgets(id) {
		d3.selectAll('.widgetBtn').remove();

		var up = d3.select('#dashboard-container-' + id).append('div')
			.attr('class', 'widgetBtn')
			.attr('id', 'widgetBtn-' + id + '-up')
			.on('mouseover', function(){
				$('#widgetBtn-' + id + '-up').css('background-color', '#3c8dbc');
			})
			.on('mouseout', function(){
				$('#widgetBtn-' + id + '-up').css('background-color', 'white');
			});

		up.append('text')
			.attr('class', 'widgetBtnTxt')
			.attr('id', 'widgetBtnTxt-' + id + '-up')
			.text(widgets[0]);

		d3.select('#dashboard-container-' + id).append('div')
			.attr('class', 'widgetBtn')
			.attr('id', 'widgetBtn-' + id + '-down')
			.on('mouseover', function(){
				$('#widgetBtn-' + id + '-down').css('background-color', '#3c8dbc');
			})
			.on('mouseout', function(){
				$('#widgetBtn-' + id + '-down').css('background-color', 'white');
			});

		d3.select('#dashboard-container-' + id).append('div')
			.attr('class', 'widgetBtn')
			.attr('id', 'widgetBtn-' + id + '-left')
			.on('mouseover', function(){
				$('#widgetBtn-' + id + '-left').css('background-color', '#3c8dbc');
			})
			.on('mouseout', function(){
				$('#widgetBtn-' + id + '-left').css('background-color', 'white');
			});

		d3.select('#dashboard-container-' + id).append('div')
			.attr('class', 'widgetBtn')
			.attr('id', 'widgetBtn-' + id + '-right')
			.on('mouseover', function(){
				$('#widgetBtn-' + id + '-right').css('background-color', '#3c8dbc');
			})
			.on('mouseout', function(){
				$('#widgetBtn-' + id + '-right').css('background-color', 'white');
			});

		$('#widgetBtn-' + id + '-up').animate({top: '15%'},"slow");
		$('#widgetBtn-' + id + '-down').animate({top: '65%'},"slow");
		$('#widgetBtn-' + id + '-left').animate({left: '17%'},"slow");
		$('#widgetBtn-' + id + '-right').animate({left: '63%'},"slow");
	}

});