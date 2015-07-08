
/**
 * PDC Performance view
 * 
 */
define(["node_modules/d3/d3.js", "/public/plugins/chartjs/Chart.min.js"],function (d3, Chart) {
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
				.attr('width','400px')
				.attr('height','220px')
				.attr('position', 'absolute');

			//////////
			// DATA //
			//////////		
			// testData1
			var testData1 = {
            	labels : ["January","February","March","April","May","June", "July"],
            	datasets : [{
	                fillColor : "rgba(0,61,245,0.4)",
	                strokeColor : "#0040FF",
	                pointColor : "#fff",
	                pointStrokeColor : "#0040FF",
	                data : [203,456,939,251,305,247,450]
            	},{
	                fillColor : "rgba(245,0,61,0.4)",
	                strokeColor : "#FF3366",
	                pointColor : "#fff",
	                pointStrokeColor : "#FF3366",
	                data : [1000,715,402,302,110,385,905]
            	}]
        	}

        	// testData2
        	var testData2 = [
				{ value : 20, color:"#878BB6"},
                { value : 40, color : "#4ACAB4"},
            	{ value : 10, color : "#FF8153"}
        	]

        	// testData3
			var testData3 = {
                labels : ["January","February","March","April","May","June"],
                datasets : [{
                	fillColor : "#48A497",
                    strokeColor : "#48A4D1",
                    data : [456,479,324,569,702,600]
                },{
                    fillColor : "rgba(73,188,170,0.4)",
                    strokeColor : "rgba(72,174,209,0.4)",
                    data : [364,504,605,400,345,320]
                }]
            }
			

			///////////////////
			// CHART OPTIONS //
			///////////////////
			// line chart options
            var lineOptions = {
				scaleShowGridLines : false
            }
			// pie chart options
            var doughnutOptions = {
                 segmentShowStroke : true,
                 animateRotate : true,
                 animateScale : true
            }
			// bar chart options
            var barOptions = {
            }


			/////////////////
			// LOAD CHARTS //
			/////////////////           

	        var test = document.getElementById(data).getContext('2d');

	        // draw charts
	        if(data=='data_bearers')
	        	new Chart(test).Line(testData1, lineOptions);
	    	else if(data=='data_cpuloads')
	    		new Chart(test).Doughnut(testData2, doughnutOptions);
	    	else if(data=='data_packets')
	    		new Chart(test).Bar(testData3, barOptions);
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