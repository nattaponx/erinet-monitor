define([], function(){
	return{

		getInstance: function(){
			var instance = {
				properties: {
					dataSpec: '',
					options: ''
				},

				/**
				 * Initializing a component object
				 *  
				 * @param  {JSON} component []
				 */
				init: function(chart){
					console.log('init nodeChart Widget');
					//Assig properties
					this.properties.dataSpec = chart.dataSpec;
					this.properties.options = chart.options;

					//Declare variables
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

					//Draw charts
					if (charts.chartType == 'realtime_linechart'){
						var dataSpec = [{ data: dataR }];
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


					}else if(charts.chartType == 'realtime_gaugechart'){
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
					};
					
				// end of init
				},

				//------Get fucntions------

				getDataSpec: function(){
					return this.properties.dataSpec;
				},

				getOptions: function(){
					return this.properties.options;
				},

				//------Set fucntions------

				setX: function(x){
					this.properties.x = x;
				},

				setY: function(y){
					this.properties.y = y;
				}				
			}

			return instance;
		}
	}
});