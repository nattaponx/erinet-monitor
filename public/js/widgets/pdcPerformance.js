/**
 * PDC Performance view
 * 
 */
define(["node_modules/d3/d3.js", 
	"/public/plugins/chartjs/Chart.js", 
	"/public/plugins/flot/jquery.flot.min.js"],function (d3, Chart, FlotChart) {
	return{
		//Widget properties
		properties: {
			title: '',
			type: '',
			data: '',
			carousel_num: '',
		},

		/**
		 * Initialise a network performance widget
		 * 
		 * @param  {container} parent_container [parent container for the widget]
		 * @param  {String}    type             [type of the box]
		 * @param  {String}    title            [title for the widget]
		 * 
		 */
		init: function(type, title, data){
			console.log('init PDC Performance View Widget');
			
			//Set properties
			this.properties.type = type;

			//////////////
			// Carousel //
			//////////////
			var selectObject = d3.select('.grid-column-carousel__list');

			var item = selectObject.append('li')
				.attr('class', 'col-xs-12 col-sm-6 col-md-4 col-lg-3');

			var cbox = item.append('div')
				.attr('class', 'box box-' + type);

			////Box title
			var cbox_header = cbox.append('div')
				.attr('class', 'box-header with-border');

			//Append title	
			var cbox_header_title = cbox_header.append('h3')
				.attr('class', 'box-title')
				.text(title);

			//Box body
			var cbox_body = cbox.append('div')
				.attr('class', 'box-body')
				.style('background-color', '#FAFAFA')
				 .attr('display', 'inline');

			var cbox_position = cbox_body.append('div')
				.attr('id', data).attr('class', 'chart-position');
 

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
   					var dbox = d3.select('#details-container').append('div')
   						.attr('class', 'box box-' +type).attr('id', 'detail-box')
      					.append('div').attr('class', 'box-header with-border');

      				var dbox_title = dbox.append('h3')
      					.attr('class', 'box-title').text(title);

					dbox.append('div').attr('class', 'box-body');

      				var dbox_body =  dbox.append('div')
						.attr('id', data)
   				}
			}
			document.getElementById(data).addEventListener('click',seeDetails);

			var options = {
	          elem: document.getElementsByClassName('example-1')[0],
	          gridColClasses: 'col-xs-6 col-sm-6 col-md-5 col-lg-6',
	          autoplay: true
	        };
	        var gCCarousel = new GCCarousel(options);
			
			},


			////////////
			// Charts //
			////////////

			initChartRealTime: function(data){

				// DATA for real time - line
				$(function(){
				var dataR = [],
				totalPoints = 100;

				function getRandomData(){
					if (dataR.length > 0)
						dataR = dataR.slice(1);

					// Do a random walk
					while (dataR.length < totalPoints) {
						var prev = dataR.length > 0 ? dataR[dataR.length - 1] : 50,
							y = prev + Math.random() * 10 - 5;
						if (y < 0) {
							y = 0;
						} else if (y > 100) {
							y = 100;
						}
						dataR.push(y);
					}
					// Zip the generated y values with the x values
					var res = [];
						for (var i = 0; i < dataR.length; ++i) {
							res.push([i, dataR[i]])
						}
						return res;
				}
				// Set up the control widget
				var updateInterval = 300;
				
				// draw charts
				if(data=='data_bearers'){
					var plot = $.plot($("#"+data), 
					[ { label: "Number of Bearers",  data: getRandomData()} ], 
					{
						series: {
							shadowSize: 0	// Drawing is faster without shadows
						},
						yaxis: { min: 0, max: 100 },
						xaxis: { min: 0, max: 100 }
					});
					function update() {
						plot.setData([getRandomData()]);
						// Since the axes don't change, we don't need to call plot.setupGrid()
						plot.draw();
						setTimeout(update, updateInterval);
					}
					update();
				};

				if(data=='data_cpuloads'){
					var g = new JustGage({
    				id: data,
    				value: getRandomInt(0, 100) + "%",
				    min: 0,
				    max: 100,
				    // title: "Visitors"
					});
			        setInterval(function() {
			          g.refresh(getRandomInt(50, 100));
			          //g2.refresh(getRandomInt(50, 100));          
			        }, 2500);
				};

				if(data=='data_packets'){
					var plot = $.plot($("#"+data), 
					[ { label: "Number of packets",  data: getRandomData()} ], 
					{
						series: {
							shadowSize: 0	// Drawing is faster without shadows
						},
						yaxis: { min: 0, max: 100 },
						xaxis: { min: 0, max: 100 }
					});
					function update() {
						plot.setData([getRandomData()]);
						// Since the axes don't change, we don't need to call plot.setupGrid()
						plot.draw();
						setTimeout(update, updateInterval);
					}
					update();
				};
			});
			},

		/////////////////
		//Get functions//
		/////////////////

		getTitle: function(){
			return this.properties.title;
		},

		getType: function(){
			return this.properties.type;
		},

	

		/////////////////
		//Set functions//
		/////////////////

		setTitle: function(title){
			this.properties.title = title;
		},

		setType: function(type){
			this.properties.type = type;
		}

	}

});


