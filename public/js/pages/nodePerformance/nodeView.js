/**
 * PDC Performance view
 * Author: Nattapon Thathong
 */
define(["node_modules/d3/d3.js", 
	"performance/nodeChart",
	"node_modules/eventbus/eventbus.js",
	"/public/plugins/gridColumnCarousel/GridColumnCarousel.js"],function (d3, nodechart, eventbus, gcarousel) {
	return{

		properties: {
			type: '',
			dataset: ''
		},

		init: function(container, type, title, dataset, chartType){
			console.log('init nodeView for --> ' + title);
			
			//////////////
			// Carousel //
			//////////////

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

				this.initCarousel();

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
   				detailsChart(dataset);

			}
			document.getElementById('cbox-'+dataset).addEventListener('click',seeDetails);
      
  			/////////////////
			// draw charts //
			/////////////////

			// draw real-time charts		
      		nodechart.init('chart-container-' +title, chartType);

      		// draw details charts
			function detailsChart(dataset){
				nodechart.init('id-d-d-'+dataset, 'timechart', 'id-d-m-'+dataset);
			}

	        // resize
			eventbus.addListener('resize', function(){
				this.resize(); 
			}.bind(this));

			// fullscreen
			eventbus.addListener('fullscreen', function(){
				this.fullscreen(type, dataset, title, chartType); 
			}.bind(this));
			// end of init //
		},

		initCarousel: function(){
			var carouselOptions = {
	          elem: document.getElementsByClassName('realtime-performance')[0],
	          gridColClasses: 'col-sm-12 col-md-6 col-xs-12',
	          //throttleDelay: 10,
	          //autoplay: true,
	          // autoplayDelay: 5000
	        };
	        var gCCarousel = new GCCarousel(carouselOptions);
		},


		fullscreen: function(type, dataset, title, chartType){

			gCCarousel.remove();
			document.getElementById('test').style.display = 'none';

			$("#details-container").remove();
			document.body.className = 'skin-blue sidebar-mini sidebar-collapse';

			var fLocation = d3.select(".row")
				.append('div').attr('class', 'col-sm-12 col-md-6 col-xs-6');

			var fBox = fLocation.append('div')
				.attr('class', 'box box-' + type)
				.attr('id', 'cbox-'+ dataset);

			var fBox_header = fBox.append('div')
				.attr('class', 'box-header with-border');

			var fBox_header_title = fBox_header.append('h3')
				.attr('class', 'box-title')
				.text(title);

			var fBox_body = fBox.append('div')
				.attr('class', 'box-body')
				.attr('id', 'box-body-' + dataset)
				.style('background-color', '#FAFAFA')
				 .attr('display', 'inline');

			var fChart_placeholder = fBox_body.append('div')
				.attr('id', 'chart-container-f-' +title)
				.attr('class', 'chart-position');

			nodechart.init('chart-container-f-' +title, chartType);

		},


		resize: function(){
			//console.log('resize');
			//this.initCarousel();
			//d3.select('#ref').remove();
			var getWidth = document.getElementById("ref").offsetWidth;
			var elem = document.getElementsByClassName('realtime-performance')[0];
   			var listElem = elem.getElementsByClassName('grid-column-carousel__list')[0];
         	var colItems = listElem.getElementsByTagName('li');
         	//console.log(getWidth);
        	for(var i = 0; i < colItems.length; i++) {
        	 	colItems[i].style.width = getWidth + 'px';
        	 }
        	 // $('#carousel-item').css('-webkit-transform', 'translateX(-1299px)')
        	 // .css('transform','translateX(-1299px)');
        	// var slideWidth = document.getElementById("test").offsetWidth;
        	// pagesCount = Math.ceil(colItems.length / (slideWidth / getWidth));
        	// console.log('' + slideWidth + ', ' + pagesCount);


		}
	}

});


