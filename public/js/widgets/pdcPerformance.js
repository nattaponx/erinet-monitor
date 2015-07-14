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
		init: function(parent_container, type, title, data, carousel_num){
			console.log('init PDC Performance View Widget');
			
			//Set properties
			this.properties.type = type;

			//////////////
			// Carousel //
			//////////////
			//add indicators
			var indicators = d3.select('#indicators')
				.append('li').attr('data-target', '#carousel')
				.attr('data-slide-to', ''+carousel_num)
				.attr('class', function activeF(){if(carousel_num=='0') return 'active';});

			//Generate dashboards class
			var cId = parseInt(carousel_num)+1;
			var item = d3.select('#inner')
				.append('div').attr('class', function activeF(){if(carousel_num=='0') return "item active"; else return "item";})
				.append('div').attr('id','corousel-chart-'+ cId).attr('class','corousel-chart');

			/////////
			// Box //
			/////////
			var box = item.append('div')
				.attr('class', 'box box-' + type);

			////Box title
			var box_header = box.append('div')
				.attr('class', 'box-header with-border');

			//Append title	
			var box_header_title = box_header.append('h3')
				.attr('class', 'box-title')
				.text(title);

			//Box body
			var box_body = box.append('div')
				.attr('class', 'box-body')
				.style('background-color', '#FAFAFA')
				 .attr('display', 'inline');

			box_body.append('div')
				.attr('id', data)
				.style('width', '300px')
				.style('height', '200px');
				// .attr('padding', '20px 15px 15px 15px');

			// chart canvas
			// var chart1 = box_body.append('canvas')
			// 	.attr('id', data)
			// 	//.attr({'width': '450', 'height': '230'});
 

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
   					var detailBox = d3.select('#details').append('div')
   						.attr('class', 'box box-' +type).attr('id', 'detail-box')
      					.style('width','90%').style('margin', 'auto')
      					.append('div').attr('class', 'box-header with-border');

      				var detailBox_title = detailBox.append('h3')
      					.attr('class', 'box-title').text(title);

      				var box_tools = detailBox.append('div')
						.attr('class', 'box-tools pull-right')
						.append('button').attr('class','btn btn-box-tool')
						.attr('data-widget','remove')
						.append('i').attr('class','fa fa-times');

					detailBox.append('div').attr('class', 'box-body');

      				var detailBox_body =  detailBox.append('div')
						.attr('id', data)
						.style('width', '500px')
						.style('height', '500px');
   				}
			}
			document.getElementById(data).addEventListener('click',seeDetails);
			
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
				// $("#updateInterval").val(updateInterval).change(function () {
				// 	var v = $(this).val();
				// 	if (v && !isNaN(+v)) {
				// 		updateInterval = +v;
				// 		if (updateInterval < 1) {
				// 			updateInterval = 1;
				// 		} else if (updateInterval > 2000) {
				// 			updateInterval = 2000;
				// 		}
				// 		$(this).val("" + updateInterval);
				// 	}
				// });
				
				// draw charts
				if(data=='data_bearers'){
					var plot = $.plot($("#"+data), 
					[ { label: "Number of Bearers",  data: getRandomData()} ], 
					{
					series: {
						shadowSize: 0	// Drawing is faster without shadows
					},
					yaxis: {
						min: 0,
						max: 100
					},
					xaxis: {
						min: 0,
						max: 100
						}
					});
					function update() {
					plot.setData([getRandomData()]);
					// Since the axes don't change, we don't need to call plot.setupGrid()
					plot.draw();
					setTimeout(update, updateInterval);
				}
				update();
				}else{
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


