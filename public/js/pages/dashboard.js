/**
 * Dashboard
 * Author: Victor Larsson (elarvic)
 */

/**
 * RequireJS configuration
 * Assign different paths 
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
	
	//Variables
	var containers = [{id:'1-1', widget:'', empty:true},{id:'1-2', widget:'', empty:true},
			  		{id:'2-1', widget:'', empty:true},{id:'2-2', widget:'', empty:true}];

	var widgets    = [{name:'Topology', pos:'-up'}, {name:'Network Performance', pos:'-down'},
					{name:'Node Performance', pos:'-left'}, {name:'Alarms Events', pos:'-right'}];

	widgetEnum: [{
		tpy:'Topology', 
		netp:'Network Performance', 
		nodp:'Node Performance', 
		ae:'Alarms Events'
	}];
		
	init();

	//TODO Remove all of the widgetBtns
	/*
	d3.selectAll('.dashboard-container').on('click', function(){
		//d3.selectAll('.widgetBtn').remove();
	});
	*/

	/**** Listeners / Event ******/
	
	$(window).resize(function(){
		resize();
	});

	//Submit-layout-btn Click-event 
	d3.select('#submit-layout-btn').on('click', function(){
		console.log('Submit');

		loadWidgets();
	});

	//Default-layout-btn Click-event
	d3.select('#default-layout-btn').on('click', function(){
		console.log('Default');

		loadDefaultWidgets();
	});


	/**** Functions ******/
	
	/**
	 * init the dashboard
	 */
	function init (){
		resize();
		$('.dashboard-container').addClass('centerContent');
		initContainers();
	}

	/**
	 * Resizes the dashboard-content-container.
	 */
	function resize(){
		console.log('resize');

		var head_foot 			  = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
      	var window_height 	      = $(window).height();
      	var sidebar_height 		  = $(".sidebar").height();
      	var content_header_height = $('.content-header').outerHeight();
      	var diff = window_height - head_foot - content_header_height;

  		$(".content").css('min-height', diff);
  		$(".dashboard-content-container").css('height', diff - 50);
	}

	/**
	 * Init the dashboard-containers
	 * Adds the addBtn in the middle with a click-event.
	 */
	function initContainers () {
		containers.forEach(function(c){

			var addBtnImg 		   = 'public/img/plus-big.png';
			var addBtnImg_selected = 'public/img/plus-big-selected.png';

			d3.select('#dashboard-container-' + c.id).append('div')
				.attr('class', 'addBtn')
				.attr('id', 'addBtn-' + c.id)
				.on('mouseover', function(){
					$('#addBtn-' + c.id).css('background-color', '#3c8dbc');
					$('#addBtn-img-' + c.id).attr('src', addBtnImg_selected);
					$('#widgetBtnTxt-' + c.id).css('color', 'white');
				})
				.on('mouseout', function(){
					$('#addBtn-' + c.id).css('background-color', 'white');
					$('#addBtn-img-' + c.id).attr('src', addBtnImg);
					$('#widgetBtnTxt-' + c.id).css('color', '#3c8dbc');
				})
				.on('click', function(){
					console.log('clicked addBtn-' + c.id);
					displayWidgets(c.id);
				});

			
			d3.select('#addBtn-' + c.id).append('img')
				.attr('class', 'addBtn-img')
				.attr('id', 'addBtn-img-' + c.id)
				.attr('src', addBtnImg);
		});
	}

	/**
	 * Displays the available widgets for selection.
	 * Animates the buttons, spawning from the addBtn.
	 * 
	 * @param  {String} id [id of the dashboard-container]
	 */
	function displayWidgets(id) {
		d3.selectAll('.widgetBtn').remove();

		widgets.forEach(function(widget){
			d3.select('#dashboard-container-' + id).append('div')
				.attr('class', 'widgetBtn')
				.attr('id', 'widgetBtn-' + id + widget.pos)
				.on('mouseover', function(){
					$('#widgetBtn-' + id + widget.pos).css('background-color', '#3c8dbc');
					$('#widgetBtnTxt-' + id + widget.pos).css('color', 'white');
				})
				.on('mouseout', function(){
					$('#widgetBtn-' + id + widget.pos).css('background-color', 'white');
					$('#widgetBtnTxt-' + id + widget.pos).css('color', '#3c8dbc');
				})
				.on('click', function(){
					console.log('clicked ' + widget.name)
					selectWidget(id, widget);
				});

			d3.select('#widgetBtn-' + id + widget.pos).append('text')
				.attr('class', 'widgetBtnTxt')
				.attr('id', 'widgetBtnTxt-' + id + widget.pos)
				.text(widget.name);
		});

		$('#widgetBtn-' + id + '-up').animate({top: '15%'},"slow");
		$('#widgetBtn-' + id + '-down').animate({top: '65%'},"slow");
		$('#widgetBtn-' + id + '-left').animate({left: '17%'},"slow");
		$('#widgetBtn-' + id + '-right').animate({left: '63%'},"slow");
	}

	/**
	 * Assigns the selected widget to the addBtn for graphical representation.
	 * 
	 * @param  {String} id [id of the dashboard-container]
	 * @param  {Object} widget [contains name and position of the selected widget]
	 */
	function selectWidget(id, widget){
		//Removes the previous text(if there were any)
		d3.selectAll('#widgetBtnTxt-' + id).remove();
		
		//Remove all of the other widgetBtns and the image inside the addBtn
		d3.selectAll('.widgetBtn').remove();
		d3.select('#addBtn-img-' + id).remove();
		
		//Append the name of the selected widget inside the addBtn
		d3.select('#addBtn-' + id).append('text')
			.attr('class', 'widgetBtnTxt')
			.attr('id', 'widgetBtnTxt-' + id)
			.text(widget.name);

		containers.forEach(function(c){
			if(c.id == id){
				c.widget = widget;
				c.empty = false;
			}
		});
	}

	function loadWidgets(){
		containers.forEach(function(c){
			switch(c.widget){
				case widgetEnum[0].tpy:
					break;

				case widgetEnum[0].netp:
					break;

				case widgetEnum[0].nodp:
					break;

				case widgetEnum[0].ae:
					break;
			}
		});
	}

	function loadDefaultWidgets(){

		//load topology in 1-1
		d3.selectAll('#widgetBtnTxt-1-1').remove();
		
		//Remove all of the other widgetBtns and the image inside the addBtn
		d3.select('#addBtn-img-1-1').remove();
		d3.select('#addBtn-1-1').remove();
		
		ntc.init('dashboard-container-1-1', 'primary', 'box-1-1');

		//load network performance in 1-2

		//load node performance in 2-1
	
		//load alarms/event in 2-2
	}

});