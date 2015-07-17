/**
 * PDC Performance view
 * 
 */
define(["node_modules/d3/d3.js", 
	"/public/plugins/chartjs/Chart.js", 
	"/public/plugins/flot/jquery.flot.min.js",
	"/public/plugins/flot/jquery.flot.time.min.js",
	"/public/plugins/flot/jquery.flot.axislabels.js"],function (d3) {
	return{
		//Widget properties
		properties: {
			title: '',
			type: '',
			dataset: '',
		},

		/**
		 * Initialise a network performance widget
		 * 
		 * @param  {container} parent_container [parent container for the widget]
		 * @param  {String}    type             [type of the box]
		 * @param  {String}    title            [title for the widget]
		 * 
		 */
		init: function(type, title, dataset){
			console.log('init PDC Performance View Widget');
			
			//Set properties
			this.properties.type = type;

			//////////////
			// Carousel //
			//////////////
			var selectObject = d3.select('.grid-column-carousel__list');

			var item = selectObject.append('li')
				.attr('class', 'col-sm-12 col-md-6 col-xs-12');

			var cbox = item.append('div')
				.attr('class', 'box box-' + type)
				.attr('id', 'cbox-'+ dataset)
				.append('a').attr('href', '#');

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
				.style('background-color', '#FAFAFA') //#FAFAFA
				 .attr('display', 'inline');

			var cbox_position = cbox_body.append('div')
				.attr('id', dataset).attr('class', 'chart-position');
 

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

					var dbox_body = dbox.append('div').attr('class', 'box-body');

      				var dbox_position =  dbox_body.append('div')
						.attr('id', 'id-d-'+dataset).attr('class', 'chart-position-details');
   				}
   				detailsChart(dataset);
			}
			document.getElementById(dataset).addEventListener('click',seeDetails);
			
			function detailsChart(dataset){
				// time series chart
			}


			//carousel options
			var options = {
	          elem: document.getElementsByClassName('realtime-performance')[0],
	          gridColClasses: 'col-sm-12 col-md-6 col-xs-12',
	          throttleDelay: 10,
	          //autoplay: true
	        };
	        var gCCarousel = new GCCarousel(options);

			// end of init //
			},


			////////////
			// Charts //
			////////////
			initChartRealTime: function(dataset, cbox_body){
				console.log('initChartRealTime Widget');
				var dataR = [];
				var now = new Date().getTime();
				var updateInterval = 1000;
				var totalPoints = 100;

				// DATA for real time - line			 
				function getRandomData(){
					dataR.shift();
					// if (dataR.length > 0)
					// 	dataR = dataR.slice(1);
					// Do a random walk
					while (dataR.length < totalPoints) {
						var temp = [now += updateInterval, Math.floor((Math.random() * 20) + 5)];
						dataR.push(temp);
					}
				}

				// draw charts
				if(dataset=='data_bearers'){
					var placeholder = "#"+ dataset;
					//getRandomData();
				    var dataSpec = [{ data: dataR }]; //{ label: "Bearers", data: dataR}
				    var options = {
				    	series: {
					        lines: { show: true, lineWidth: 1.2, fill: true},
					        shadowSize: 4,
					        bar: {show: true, align: "center"}
					    },
					    xaxis: {
					        mode: "time",
					        tickSize: [10, "second"],
					        tickFormatter: function (v, axis) {
					            var date = new Date(v);
					            if (date.getSeconds() % 20 == 0) {
					                var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
					                var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
					                var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
					                return hours + ":" + minutes + ":" + seconds;
					            } else {
					                return "";
					            }
					        },
					        axisLabel: "Time",
					        axisLabelUseCanvas: true,
					        axisLabelFontSizePixels: 12,
					        axisLabelFontFamily: 'ericssonFont',
					        axisLabelPadding: 10
					    },
					    yaxis: {
					        min: 0,
					        max: 30,
					        tickSize: 10,
					        tickFormatter: function (v, axis) {
					            if (v % 10 == 0) {
					                return v + "";
					            } else {
					                return "";
					            }
					        },
					        axisLabel: "Number of Bearers",
					        axisLabelUseCanvas: true,
					        axisLabelFontSizePixels: 12,
					        axisLabelFontFamily: 'ericssonFont',
					        axisLabelPadding: 6
					    },
					    legend: {
					        labelBoxBorderColor: "#fff"
					    },
					    grid: {
					    	margin: 5,
					    	clickable: true,
					    	hoverable: true,
					    	borderWidth: 2,
					    },
					    colors: ['#8AB800']
				    };
				    // plot chart in placeholder
   			 		$.plot(placeholder, dataSpec, options);
   			 		// update chart
   			 		function update() {
				        getRandomData();
				        $.plot(placeholder, dataSpec, options)
				        setTimeout(update, updateInterval);
				    }
			    	update();
				}else

				if(dataset=='data_cpuloads'){
					var placeholder = "#"+ dataset;
					var g = new JustGage({
	    				id: dataset, //container
	    				value: getRandomInt(0, 100) + " %",
					    min: 0,
					    max: 100,
					    label: "CPU Loads",
					    levelColorsGradient: true
				    	// title: "Visitors"
					});
			        setInterval(function() {
						g.refresh(getRandomInt(50, 100));
			          	//g2.refresh(getRandomInt(50, 100));          
			        }, 1000);
				}else

				if(dataset=='data_packets'){
					var placeholder = "#"+ dataset;
				    var dataSpec = [{ data: dataR }];
				    var options = {
				    	series: {
				        	lines: {
					            show: true,
					            lineWidth: 1.2,
					            fill: true
					        }
				    	},
					    xaxis: {
					        mode: "time",
					        tickSize: [10, "second"],
					        tickFormatter: function (v, axis) {
					            var date = new Date(v);
					            if (date.getSeconds() % 20 == 0) {
					                var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
					                var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
					                var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
					                return hours + ":" + minutes + ":" + seconds;
					            } else {
					                return "";
					            }
					        },
					        axisLabel: "Time",
					        axisLabelUseCanvas: true,
					        axisLabelFontSizePixels: 12,
					        axisLabelFontFamily: 'ericssonFont',
					        axisLabelPadding: 10
					    },
					    yaxis: {
					        min: 0,
					        max: 100,
					        tickSize: 25,
					        tickFormatter: function (v, axis) {
					            if (v % 25 == 0) {
					                return v + " kb";
					            } else {
					                return "";
					            }
					        },
					        axisLabel: "Number of Packets",
					        axisLabelUseCanvas: true,
					        axisLabelFontSizePixels: 12,
					        axisLabelFontFamily: 'ericssonFont',
					        axisLabelPadding: 6
					    },
					    grid: {
					    	margin: 5,
					    	clickable: true,
					    	hoverable: true
					    },
					    colors: ['#000000'] 
					};
					// plot chart in placeholder
   			 		$.plot(placeholder, dataSpec, options);
					// update chart
   			 		function update() {
				        getRandomData();
				        $.plot(placeholder, dataSpec, options)
				        setTimeout(update, updateInterval);
				    }
			    	update();
				} else { 
					document.getElementById(''+ dataset)
					.innerHTML = "--- No data for this KPI ---"; 
				};

				// datapoint tooltips
				$("#"+dataset).bind("plothover", function (event, pos, item) {
					var previousPoint = 0;
                    if (item) {
                        if (previousPoint != item.dataIndex) {

                            previousPoint = item.dataIndex;

                            $("#tooltip").remove();
                            var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(0); // decimals

                            showTooltip(item.pageX, item.pageY, "" + y);
                        }
                    } else {
                        $("#tooltip").remove();
                        previousPoint = null;            
                    }
                });
                function showTooltip(x, y, contents) {
                    $("<div id='tooltip'>" + contents + "</div>").css({
                        position: "absolute",
                        display: "none",
                        top: y - 20,
                        left: x + 10,
                        border: "0px solid #fdd",
                        "border-radius": "2px",
                        padding: "2px 10px 2px 10px",
                        color: "#fff",
                        "background-color": "#000000", //#fee
                        opacity: 0.80
                    }).appendTo("body").fadeIn(100);
                }

			// end of initChartRealTime //
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


