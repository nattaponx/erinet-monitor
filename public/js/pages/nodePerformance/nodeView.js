/**
 * PDC Performance view
 * Author: Nattapon Thathong
 */
define(["node_modules/d3/d3.js", 
	"performance/nodeChart",
	"node_modules/eventbus/eventbus.js"],function (d3, nodechart, eventbus) {
	return{

		init: function(container, type, title, dataset, chartType){
			console.log('init nodeView for --> ' + title);

			$('#content-2').hide();

			this.createCarousel(container, type, title, dataset, chartType);

			/////////////////
			// details box //
			/////////////////
			var seeDetails = function(){
   				var ok = true;
   				//check if details-box exists
   				if(d3.select('#detail-box')){
   					d3.select("#detail-box").remove();
   				}

   				if (ok === true) {
   					var selectObjectDetails = d3.select('#details-container');

   					var dbox = selectObjectDetails.append('div')
   						.attr('class', 'box box-' +type).attr('id', 'detail-box');

   					var dbox_header = dbox.append('div')
   					.attr('class', 'box-header with-border');

      				var dbox_title = dbox_header.append('h3')
      					.attr('class', 'box-title').text(title);

					var dbox_body = dbox.append('div').attr('class', 'dbox-body');

					var dbox_body_master = dbox.append('div').attr('class', 'dbox-body-master');

      				var dbox_position =  dbox_body.append('div')
						.attr('id', 'id-d-d-'+dataset).attr('class', 'chart-position-details');

					var dbox_position_master =  dbox_body_master.append('div')
						.attr('id', 'id-d-m-'+dataset).attr('class', 'chart-position-master');
   				}

   				createDetailsChart(dataset);

			}

			document.getElementById('cbox-'+dataset).addEventListener('click',seeDetails);
      
			// draw real-time charts		
      		nodechart.init('chart-container-' +title, chartType);

      		// draw details charts
			function createDetailsChart(dataset){
				nodechart.init('id-d-d-'+dataset, 'timechart', 'id-d-m-'+dataset);
			}

			// fullscreen mdoe
			eventbus.addListener('fullscreenMode', function(){
				this.fullscreenMode(type, dataset, title, chartType); 
			}.bind(this));

			
		},
		/////////////////// end of init ///////////////////



		createCarousel: function(container, type, title, dataset, chartType){

			var location = d3.select('#' + container);

			var cell = location.append('li')
				.attr('class', 'col-sm-12 col-md-6 col-xs-12')
				.attr('id', 'carousel-cells');

			var box = cell.append('div')
				.attr('class', 'box box-' + type)
				.attr('id', 'cbox-'+ dataset)
				.append('a').attr('href', '#');

			var box_header = box.append('div')
				.attr('class', 'box-header with-border');

			var box_header_title = box_header.append('h3')
				.attr('class', 'box-title')
				.text(title);

			var box_body = box.append('div')
				.attr('class', 'box-body')
				.attr('id', 'box-body-' + dataset)
				.style('background-color', '#FAFAFA')
				 .attr('display', 'inline');

			var chart_placeholder = box_body.append('div')
				.attr('id', 'chart-container-' +title)
				.attr('class', 'chart-position');

			var carouselOptions = {
	          elem: document.getElementsByClassName('realtime-performance')[0],
	          gridColClasses: 'col-sm-12 col-md-6 col-xs-12',
	          //throttleDelay: 10,
	          autoplay: true
	          // autoplayDelay: 5000
	        };
	        var gCCarousel = new GCCarousel(carouselOptions);

		},
		/////////////////// end of createCarousel ///////////////////

		fullscreenMode: function(type, dataset, title, chartType){

			if(this._isFullScreen()){
				this._cancelFullScreen();
				document.body.className = 'skin-blue sidebar-mini';
				this._dashboardExitFull();
			}else{
				this._launchFullScreen(document.documentElement);
				document.body.className = 'skin-blue sidebar-mini sidebar-collapse';
				this._dashboardFull(type, dataset, title, chartType);
			}
		},
		/////////////////// end of fullscreenMode ///////////////////

		createDashboard: function(type, dataset, title, chartType){
			var containerDiv = d3.select("#dashboard-c-c-2")
				.append('div').attr('class', 'col-sm-12 col-md-6 col-xs-6');

			var box = containerDiv.append('div')
				.attr('class', 'box box-' + type)
				.attr('id', 'dbox-'+ dataset);

			var box_header = box.append('div')
				.attr('class', 'box-header with-border');

			var box_header_title = box_header.append('h3')
				.attr('class', 'box-title')
				.text(title);

			var box_body = box.append('div')
				.attr('class', 'box-body')
				.attr('id', 'dbox-body-' + dataset)
				.style('background-color', '#FAFAFA')
				 .attr('display', 'inline');

			var bhart_placeholder = box_body.append('div')
				.attr('id', 'd-chart-container-' +title)
				.attr('class', 'chart-position');
			
			nodechart.init('d-chart-container-' +title, chartType);
		},
		/////////////////// end of createDashboard ///////////////////

		// toggle
		_dashboardFull: function(type, dataset, title, chartType){
			$('#content-1').hide();
			$('#content-2').show();
			this.createDashboard(type, dataset, title, chartType);
		},

		_dashboardExitFull: function(){
			$('#content-1').show();
			$('#dashboard-c-c-2').html('');
		},

		// check fullscreen
		_launchFullScreen: function(element) {
			if(element.requestFullScreen){
				element.requestFullScreen(); 
			}else if(element.mozRequestFullScreen){
				element.mozRequestFullScreen();
			}else if(element.webkitRequestFullScreen){
				element.webkitRequestFullScreen(); 
			}
		},

		_cancelFullScreen: function() {
		    if(document.cancelFullScreen){
		    	document.cancelFullScreen();
		    }else if(document.mozCancelFullScreen){
		    	document.mozCancelFullScreen();
		    }else if(document.webkitCancelFullScreen){
		    	document.webkitCancelFullScreen(); 
		    }
		},

		_isFullScreen: function() {
		    fullScreen = document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitIsFullScreen ? true : false;
		    if(this.debug){
		    	console.log('Fullscreen enabled? ' + fullScreen);
		    };
		    return fullScreen;
		},

	}

});


