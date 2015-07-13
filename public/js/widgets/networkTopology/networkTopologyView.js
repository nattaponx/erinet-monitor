/**
 * Network Topology View
 * Author: Victor Larsson (elarvic)
 */
define(["node_modules/d3/d3.js"], function (d3) {
	return{

		containers: {
			c1_MME_Array: '',
			c2_SAPC_Array: '',
			c4_undefined_Array: '',
			c5_EPG_Array: '',
			c6_SASN_Array: ''
		},

		/**
		 * Initialise the network topology view
		 * 
		 * @param  {container} parent_container [parent container for the widget]
		 * @param  {String}    type             [type of the box]
		 * @param  {String}    title            [title for the widget]
		 * 
		 */
		init: function (parent_container, type, title) {

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
				.style('background-color', 'lightblue');

			this.createSvgContainer(box_body);
			this.createGrid(box_body);

			this.resize();

			$(window).resize(function () {
		    	this.resize();
			}.bind(this));

		},

		/**
		 * Resizes the different containers inside the container-wrapper.
		 * Makes them take up all of the empty space inside the container-wrapper.
		 * The affected containers are:
		 * content 
		 * 
		 */
		resize: function(){
			console.log('resize');

			var neg 				  = $('.main-header').outerHeight() + $('.main-footer').outerHeight();
	      	var window_height 	      = $(window).height();
	      	var sidebar_height 		  = $(".sidebar").height();
	      	var content_header_height = $('.content-header').outerHeight();
	      	var diff = window_height - neg - content_header_height;

	    	if ($("body").hasClass("fixed")) {
	    		console.log('body is fixed');
		        $(".content")
		        	.css('min-height', window_height - 
        			$('.main-footer').outerHeight() - 
	        		content_header_height);
	     	} else {
		        if (window_height >= sidebar_height) {
		        	//console.log('window_height >= sidebar_height');
	          		$(".content").css('min-height', diff);
	          		$(".content-container").css('min-height', diff - 50);
	          		$(".box").css('height', diff - 50);

	          		$(".box-body").css('height', diff-91);

	          		$(".svg-container").css('width', $(".cell-container").width()); 
	          		$(".svg-container").css('height', $(".cell-container").height());
		        } else {
		        	console.log('else');
	          		$(".content").css('min-height', sidebar_height);	
		        }
			}
		},

		createSvgContainer: function(containerObj) {
			var svgContainer = containerObj.append('div')
				.attr('id', 'svg-container')
				.attr('class', 'svg-container');

			svgContainer.append('svg')
				.attr('id', 'svg-drawingboard')
				.attr('width', '100%')
				.attr('height', '100%');
		},

		/**
		 * Creates a 3x3 grid with divs
		 * 
		 * @param  {String} containerObj [id of the parent container]
		 */
		createGrid: function(containerObj) {

			
			var cellContainer = containerObj.append('div')
				.attr('id', 'cell-container')
				.attr('class', 'cell-container')
				
			for (var i = 1; i < 10; i++) {
				this.createCell(cellContainer, 'c' + i);
			};

		},
		
		/**
		 * Creates a cell(div) that will be used in the gridlayout
		 *  
		 * @param  {String} containerObj [id of the parent container]
		 * @param  {String} id           [id for the cell]
		 */
		createCell: function(containerObj, id){
			var div = containerObj.append('div')
				.attr('id', id)
				.attr('class', 'cell')
		},

		/**
		 * Appends the network components on the grid.
		 * 
		 * @param  {Array[components]} components [components in the network]
		 */
		drawComponents: function(components){

			var cell;

			components.forEach(function(component){

				switch(component.getType()){
					case 'EPG':
						cell = 'c5';
						c5_EPG_Array.push(component);
						break;
					
					case 'MME':
						cell = 'c1';
						c1_MME_Array.push(component);
						break;

					case 'SAPC':
						cell = 'c2';
						c2_SAPC_Array.push(component);
						break;

					case 'SASN':
						cell = 'c5';
						c6_SASN_Array.push(component);
						break;

					default:
						cell = 'c4';
						c4_undefined_Array.push(component);
						break;
				}

				var div = d3.select('#' + cell).append('div')
					.attr('id', 'component-' + component.getId())
					.attr('class', 'component-div')
					.attr('position', 'absolute')
					.attr('width', '20%');

				var svg = div.append('svg')
					.attr('class', 'component-svg')
					.attr('width', '100%')
					.attr('height', '100%');

				/*
				svg.append('img')
					.attr('class', 'component-img')
					.attr('xlink:href', component.getActiveImg());

				svg.append('text')
					.attr('class', 'component-text')
					.text(component.getName());
				*/


			});

			//Update the positions
			//updateComponentPositions();
		},


		updateComponentPositions: function(){

			this.containers.forEach(function(cellArray){

			});
		}
	}
});