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
        "topology" : "/public/js/widgets/networkTopology",
        "netwPerformance": "/public/js/widgets/networkPerformance",
        "nodePerformance": "/public/js/widgets/nodePerformance",
        "event": "/public/js/widgets/event"
    },
 });

require([ 'node_modules/d3/d3.js',
	'node_modules/eventbus/eventbus.js',
	'topology/networkTopologyController',
	'netwPerformance/networkPerformanceController',
	'nodePerformance/nodePerformanceController',
	'event/eventController'
	], function (d3, eventbus, ntc, netpc, nodepc, ec) {
	
	/* Variables */
	var layout         = 4; 

	var c_layout_2	  = [{id:'1-1', widget:'', empty:true},{id:'2-1', widget:'', empty:true}];
	
	var c_layout_3	  = [{id:'1-1', widget:'', empty:true},{id:'2-1', widget:'', empty:true},{id:'2-2', widget:'', empty:true}];
	
	var c_layout_4	  = [{id:'1-1', widget:'', empty:true},{id:'1-2', widget:'', empty:true},
			  		 	{id:'2-1', widget:'', empty:true},{id:'2-2', widget:'', empty:true}];

	var containers    = c_layout_4;


	var d_layout_2	  = [{id:'1-1', widget:'Topology'}, {id:'2-1', widget:'Node Performance'}];
	
	var d_layout_3	  = [{id:'1-1', widget:'Topology'},{id:'2-1', widget:'Node Performance'},{id:'2-2', widget:'Events'}];

	var d_layout_4	  = [{id:'1-1', widget:'Topology'},{id:'1-2', widget:'Network Performance'},
			  			{id:'2-1', widget:'Node Performance'},{id:'2-2', widget:'Events'}];

	var widgets       = [{name:'Topology', pos:'-up'}, {name:'Network Performance', pos:'-down'},
						{name:'Node Performance', pos:'-left'}, {name:'Events', pos:'-right'}];

	var defaultLayout = d_layout_4;

	var populated 	  = false;

	widgetEnum: [{
		tpy:'Topology', 
		netp:'Network Performance', 
		nodp:'Node Performance', 
		e:'Events'
	}];
		
	init();

	//TODO Remove all of the widgetBtns when clicking anywhere but the buttons
	/*
	d3.selectAll('.dashboard-container').on('click', function(){
		//d3.selectAll('.widgetBtn').remove();
	});
	*/

	/**** Listeners / Event ******/
	
	$(window).resize(function(){
		resize();
		eventbus.fire('resize');
	});

	// Collaps/expand side-bar
	d3.select('#header-btn').on('click', function(){
		setTimeout(function(){
			eventbus.fire('resize');
		},500);
	});

	//Submit-layout-btn Click-event 
	d3.select('#submit-layout-btn').on('click', function(){
		submitWidgets();
	});

	//Default-layout-btn Click-event
	d3.select('#default-layout-btn').on('click', function(){
		defaultWidgets();
	});

	//2-layout-btn Click-event
	d3.select('#two-layout-btn').on('click', function(){
		changeLayout('2');
	});

	//3-layout-btn Click-event
	d3.select('#three-layout-btn').on('click', function(){
		changeLayout('3');
	});

	//4-layout-btn Click-event
	d3.select('#four-layout-btn').on('click', function(){
		changeLayout('4');
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
		if($(window).width() < 480){
			d3.select('.order-layout-btns').remove();
		}

		var head_foot 			  = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
      	var window_height 	      = $(window).height();
      	var sidebar_height 		  = $(".sidebar").height();
      	var content_header_height = $('.content-header').outerHeight();
      	var diff 				  = window_height - head_foot - content_header_height;

  		$(".content").css('min-height', diff);
  		$(".dashboard-content-container").css('height', diff - 35);
	}

	/**
	 * Init the dashboard-containers
	 * Adds the addBtn in the middle with a click-event.
	 */
	function initContainers () {
		containers.forEach(function(c){

			d3.select('#dashboard-container-' + c.id).append('div')
				.attr('class', 'addBtn')
				.attr('id', 'addBtn-' + c.id)
				.on('mouseover', function(){
					$('#addBtn-' + c.id).css('background-color', '#33779b');
					//$('#addBtn-img-' + c.id).attr('src', addBtnImg_selected);
					$('#widgetBtnTxt-' + c.id).css('color', 'white');
				})
				.on('mouseout', function(){
					$('#addBtn-' + c.id).css('background-color', '#3c8dbc');
					//$('#addBtn-img-' + c.id).attr('src', addBtnImg);
					//$('#widgetBtnTxt-' + c.id).css('color', '');
				})
				.on('click', function(){
					displayWidgets(c.id);
				});

			d3.select('#addBtn-' + c.id).append('icon')
				.attr('class', 'addBtn-icon fa fa-plus')
				.attr('id', 'addBtn-icon-' + c.id);

			/*
			d3.select('#addBtn-' + c.id).append('img')
				.attr('class', 'addBtn-img')
				.attr('id', 'addBtn-img-' + c.id)
				.attr('src', addBtnImg);
			*/
		});

		$('.addBtn').addClass('roundedEdges');
	}

	function changeLayout (order) {

		layout = order;

		if(!populated){
			
			var speed = 'slow';
			var pos   = ['up','down','left','right'];

			switch(order){
				case '2':
					console.log('2');
					$('#dashboard-container-1-2').fadeOut(speed, function(){
						$('#dashboard-container-1-2').remove();

						$('#dashboard-container-1-1').animate({width: '98%'},speed);
						$('#addBtn-icon-1-1').animate({'margin-top': '5%'},speed);
					});

					$('#dashboard-container-2-2').fadeOut(speed, function(){
						$('#dashboard-container-2-2').remove();

						$('#dashboard-container-2-1').animate({width: '98%'},speed);
						$('#addBtn-icon-2-1').animate({'margin-top': '5%'},speed);
					});

					containers 	  = c_layout_2
					defaultLayout = d_layout_2;
					break;

				case '3':
					console.log('3');
					$('#dashboard-container-1-2').fadeOut(speed, function(){
						$('#dashboard-container-1-2').remove();

						$('#dashboard-container-1-1').animate({width: '98%'},speed);
						$('#addBtn-icon-1-1').animate({'margin-top': '5%'},speed);
						
						pos.forEach(function(p){
							$('#widgetBtnTxt-1-1-' + p).css('margin-top', '13%');
						});
						

					});

					containers 	  = c_layout_3
					defaultLayout = d_layout_3;
					break;

				case '4':
					console.log('4');

					containers 	  = c_layout_4
					defaultLayout = d_layout_4;
					break;
			}

			eventbus.fire('resize');
		}	
	}

	/**
	 * Displays the available widgets for selection.
	 * Animates the buttons, spawning from the addBtn.
	 * 
	 * @param  {String} id [id of the dashboard-container]
	 */
	function displayWidgets(id, wide) {
		d3.selectAll('.widgetBtn').remove();

		widgets.forEach(function(widget){
			d3.select('#dashboard-container-' + id).append('div')
				.attr('class', 'widgetBtn')
				.attr('id', 'widgetBtn-' + id + widget.pos)
				.on('mouseover', function(){
					$('#widgetBtn-' + id + widget.pos).css('background-color', '#33779b');
				})
				.on('mouseout', function(){
					$('#widgetBtn-' + id + widget.pos).css('background-color', '#3c8dbc');
					$('#widgetBtnTxt-' + id + widget.pos).css('color', 'white');
					$('#widgetBtn-' + id + widget.pos).css('opacity', '1.0');
				})
				.on('click', function(){
					selectWidget(id, widget);
				});

			d3.select('#widgetBtn-' + id + widget.pos).append('span')
				.attr('class', 'widgetBtnTxt widgetBtnTxt-'+ id)
				.attr('id', 'widgetBtnTxt-' + id + widget.pos)
				.text(widget.name);
		});

		//Rounded edges
		$('.widgetBtn').addClass('roundedEdges');

		//Check layout
		switch(layout){
			case '2':
				console.log('set wide 2');
				$('.widgetBtnTxt-1-1').addClass('widgetBtnTxt-wide');
				$('.widgetBtnTxt-2-1').addClass('widgetBtnTxt-wide');
				break;

			case '3':
				break;

			case '4':
				break;

		}

		//Animating the widget buttons.
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
		d3.select('#addBtn-icon-' + id).remove();

		$('#addBtn-' + id).css('background-color', '#3c8dbc');

		d3.select('#addBtn-' + id).on('mouseover', function(){
			$('#addBtn-' + id).css('background-color', '#33779b');
		})
		.on('mouseout', function(){
			$('#addBtn-' + id).css('background-color', '#3c8dbc');
		});

		//Append the name of the selected widget inside the addBtn
		d3.select('#addBtn-' + id).append('text')
			.attr('class', 'widgetBtnTxt')
			.attr('id', 'widgetBtnTxt-' + id)
			.text(widget.name);

		containers.forEach(function(c){
			if(c.id == id){
				c.widget = widget.name;
			}
		});
	}

	function submitWidgets(){
		containers.forEach(function(container){
			if(container.widget && container.empty){
				loadWidget(container);
			}
		});
		eventbus.fire('resize');
	}

	function defaultWidgets(){
		if(!populated){
			defaultLayout.forEach(function(container){
				loadWidget(container);
			});
		}
		populated = true;
		eventbus.fire('resize');
	}

	function loadWidget (container) {
		d3.selectAll('#widgetBtnTxt-' + container.id).remove();
		d3.selectAll('.widgetBtn').remove();
		$('#dashboard-container-' + container.id).removeClass('centerContent');

		//Remove all of the other widgetBtns and the image inside the addBtn
		d3.select('#addBtn-img-' + container.id).remove();
		d3.select('#addBtn-' + container.id).remove();

		switch(container.widget){
			case 'Topology':
				ntc.init('dashboard-container-' + container.id, 'primary', 'Erinet', false);
				break;

			case 'Network Performance':
				netpc.init('dashboard-container-' + container.id, 'Network Performance', 'url');
				break;

			case 'Node Performance':
				nodepc.init('dashboard-container-' + container.id, 'Node Performance', 'url');
				break;

			case 'Events':
				ec.init('dashboard-container-' + container.id, 'Events');
				break;
		}

		container.empty = false;
	}

});