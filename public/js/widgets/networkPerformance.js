/**
 * Network Topology
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

		init: function(parent_container, type, title, temp){
			console.log('init Performance View Widget');
			
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
				.style('background-color', '#F8F8F8')
				.style('margin', 'auto');


			//////////////////////////////////////////////////////////////
			// chart canvas
			var chart1 = box_body.append('canvas')
				.attr('id', temp)
				.attr('width','450')
				.attr('height','250');
			// chart data
				var testData1 = {
	            	labels : ["January","February","March","April","May","June"],
	            	datasets : [{
		                fillColor : "rgba(172,194,132,0.4)",
		                strokeColor : "#ACC26D",
		                pointColor : "#fff",
		                pointStrokeColor : "#9DB86D",
		                data : [203,156,99,251,305,247]
	            	}]
	        	}
	        	var testData2 = [
				{
                    value: 20,
                    color:"#878BB6"
                }
	        	]


		        // chart
		        // get line chart canvas
		        var test = document.getElementById(temp).getContext('2d');
		        // draw line chart
		        if(temp=='chart-1')
		        	new Chart(test).Line(testData1);
		    	else if(temp=='chart-2')
		    		new Chart(test).Pie(testData2);
		    	else
		    		new Chart(test).Line(testData2);
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