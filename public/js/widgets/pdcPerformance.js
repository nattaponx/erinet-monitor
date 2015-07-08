
/**
 * PDC Performance view
 * 
 */
define(["node_modules/d3/d3.js", "/public/plugins/chartjs/Chart.js"],function (d3, Chart) {
	return{

		//Widget properties
		properties: {
			title: '',
			type: '',
		},

		/**
		 * Initialise a network performance widget
		 * 
		 * @param  {container} parent_container [parent container for the widget]
		 * @param  {String}    type             [type of the box]
		 * @param  {String}    title            [title for the widget]
		 * 
		 */

		init: function(parent_container, type, title, data){
			console.log('init PDC Performance View Widget');
			
			//Set properties
			this.properties.type = type;

			var box = d3.select('#' + parent_container)
				.append('div')
				.attr('class', 'box box-' + type);

			var box_header = box.append('div')
				.attr('class', 'box-header with-border')

			//Append title	
			box_header.append('h3')
				.attr('class', 'box-title')
				.text(title);

			var box_body = box.append('div')
				.attr('class', 'box-body')
				.style('background-color', '#FAFAFA')
				.style('margin', 'auto')
				.style('text-align', 'center');

			// chart canvas
			var chart1 = box_body.append('canvas')
				.attr('id', data)
  				.attr("width", 400)
  				.attr("height", 300);
 

			//////////
			// DATA //
			//////////

			var dData = function() {
  				return Math.random();
  			};	

			// testData1
			var testData1 = {
            	labels : ["January","February","March","April","May","June", "July"],
            	datasets : [{
	                fillColor : "rgba(0,61,245,0.4)",
	                strokeColor : "#0040FF",
	                pointColor : "#fff",
	                pointStrokeColor : "#0040FF",
	                data : [dData(),dData(),dData(),dData(),dData(),dData(),dData()]
            	},{
	                fillColor : "rgba(245,0,61,0.4)",
	                strokeColor : "#FF3366",
	                pointColor : "#fff",
	                pointStrokeColor : "#FF3366",
	                data : [dData(),dData(),dData(),dData(),dData(),dData(),dData()]
            	}]
        	}

        	// testData2
        	var testData2 = [
				{ value : dData(), color:"#878BB6"},
                { value : dData(), color : "#4ACAB4"},
            	{ value : dData(), color : "#FF8153"}
        	]

        	// testData3
			var testData3 = {
                labels : ["January","February","March","April","May","June"],
                datasets : [{
                	fillColor : "#48A497",
                    strokeColor : "#48A4D1",
                    data : [dData(),dData(),dData(),dData(),dData(),dData()]
                },{
                    fillColor : "rgba(73,188,170,0.4)",
                    strokeColor : "rgba(72,174,209,0.4)",
                    data : [dData(),dData(),dData(),dData(),dData(),dData()]
                }]
            }
			

			///////////////////
			// CHART OPTIONS //
			///////////////////
			// line chart options
            var lineOptions = {
				scaleShowGridLines : false,
            }
			// pie chart options
            var doughnutOptions = {
                 segmentShowStroke : true,
                 animateScale : true,
            }
            var barOptions = {
            }

			/////////////////
			// LOAD CHARTS //
			/////////////////           

	        //var test = document.getElementById(data).getContext('2d');

	        // draw charts
	        if(data=='data_bearers')
	        	new Chart(document.getElementById(data).getContext('2d')).Line(testData1, lineOptions);
	    	else if(data=='data_cpuloads')
	    		new Chart(document.getElementById(data).getContext('2d')).Doughnut(testData2, doughnutOptions);
	    	else if(data=='data_packets')
	    		new Chart(document.getElementById(data).getContext('2d')).Bar(testData3, barOptions);
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