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

			//Box
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
				.style('margin', 'auto')
				.style('text-align', 'center');

			// chart canvas
			var chart1 = box_body.append('canvas')
				.attr('id', data)
				//.attr({'width': '450', 'height': '230'});
 

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

      				var detailBox_body =  detailBox.append('canvas')
						.attr('id', data)
						//.attr({'width': '450', 'height': '130'});
   				}
			}
			document.getElementById(data).addEventListener('click',seeDetails);


			//////////
			// DATA //
			//////////
			var dData = function() {
  				return Math.round(Math.random()*50) / 100;
  			};

			// testData1
			var testData1 = {
            	labels : ["January","February","March","April","May","June", "July", "August"],
            	datasets : [{
	                fillColor : "rgba(0,61,245,0.4)",
	                strokeColor : "#0040FF",
	                pointColor : "#fff",
	                pointStrokeColor : "#0040FF",
	                data : [dData(),dData(),dData(),dData(),dData(),dData(),dData(),dData()]
            	},{
	                fillColor : "rgba(245,0,61,0.4)",
	                strokeColor : "#FF3366",
	                pointColor : "#fff",
	                pointStrokeColor : "#FF3366",
	                data : [dData(),dData(),dData(),dData(),dData(),dData(),dData(),dData()]
            	}]
        	}

        	// testData2
        	var testData2 = [
				{ value : dData(), color:"#878BB6", label : 'CPU1', highlight: "#FF5A5E"},
                { value : dData(), color : "#F6F6F6"}
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
				scaleShowGridLines : true,

            };
			// pie chart options
            var doughnutOptions = {
                 segmentShowStroke : false,
                 animateScale : true,
                 tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
                 percentageInnerCutout : 70
            };
            var barOptions = {
            };

			/////////////////
			// LOAD CHARTS //
			/////////////////           

	        //var test = document.getElementById(data).getContext('2d');

	        // draw charts
	        if(data=='data_bearers'){
	        	new Chart(document.getElementById(data).getContext('2d')).Line(testData1, lineOptions);	
	        }else if(data=='data_cpuloads')
	    		new Chart(document.getElementById(data).getContext('2d')).Doughnut(testData2, doughnutOptions);
	    	else if(data=='data_packets')
	    		new Chart(document.getElementById(data).getContext('2d')).Bar(testData3, barOptions);
	    	else
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


