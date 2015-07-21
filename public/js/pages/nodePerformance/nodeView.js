/**
 * PDC Performance view
 * 
 */
define(["node_modules/d3/d3.js", 
	"performance/nodeChart",
	"node_modules/eventbus/eventbus.js"],function (d3, nodechart, eventbus) {
	return{
		//Widget properties

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

			this.createPlaceholder(box_body, title);

			nodechart.init('chart-container-' +title, chartType);

			/////////////
			// onclick //
			/////////////
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

					var dbox_body2 = dbox.append('div').attr('class', 'dbox-body2');

      				var dbox_position =  dbox_body.append('div')
						.attr('id', 'id-d-d-'+dataset).attr('class', 'chart-position-details');

					var dbox_position_master =  dbox_body2.append('div')
						.attr('id', 'id-d-m-'+dataset).attr('class', 'chart-position-master');
   				}
   				detailsChart(dataset);
			}
			document.getElementById('cbox-'+dataset).addEventListener('click',seeDetails);
			
			// draw details chart
			function detailsChart(dataset){
				nodechart.init('id-d-d-'+dataset, 'timechart', 'id-d-m-'+dataset);
			}


			//carousel options
			var options = {
	          elem: document.getElementsByClassName('realtime-performance')[0],
	          gridColClasses: 'col-sm-12 col-md-6 col-xs-12',
	          throttleDelay: 10,
	          //autoplay: true
	        };
	        var gCCarousel = new GCCarousel(options);

	        // resize
			eventbus.addListener('resize', function(){
				this.resize(); 
			}.bind(this));
      
			// end of init //
		},

		createPlaceholder: function(placeholder, title){
			//console.log('nodeview_createPlaceholder for --> '+title);
			var chartContainer = placeholder.append('div')
			.attr('id', 'chart-container-' +title).attr('class', 'chart-position');
		},

		// resize: function(){
		// 	console.log('resize');
		//  $("#carousel-cells").css('width', $(".col-md-12").width()); 
		// },
	}

});


