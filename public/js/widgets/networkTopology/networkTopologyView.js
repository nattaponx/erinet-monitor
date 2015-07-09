/**
 * Network Topology View
 */
define(["node_modules/d3/d3.js"], function (d3) {
	return{

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
				.attr('overflow', 'auto')
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
	          		$(".box").css('height', diff - 70);

	          		$(".svg-container").css('height', $(".cell-container").height());
	          		$(".svg-container").css('width', $(".cell-container").width()); 
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
				
				/*
				.attr('overflow', 'auto')
				.attr('width', '100%');
				*/
			
			/*
			var cellContainer = d3.select('#cell-container')
				.attr('id', 'cell-container')
				.attr('overflow', 'auto')
				.attr('width', '100%')
				.attr('height', '300px');
			*/

			this.createCell(cellContainer, 'c1');
			this.createCell(cellContainer, 'c2');
			this.createCell(cellContainer, 'c3');
			this.createCell(cellContainer, 'c4');
			this.createCell(cellContainer, 'c5');
			this.createCell(cellContainer, 'c6');
			this.createCell(cellContainer, 'c7');
			this.createCell(cellContainer, 'c8');
			this.createCell(cellContainer, 'c9');

			/*
			var	front = '0';
			var middle = '33%';
			var end = '66%';

			this.createCell(cellContainer, 'c1', front, front);
			this.createCell(cellContainer, 'c2', middle, front);
			this.createCell(cellContainer, 'c3', end, front);							
			this.createCell(cellContainer, 'c4', front, middle);
			this.createCell(cellContainer, 'c5', middle, middle);
			this.createCell(cellContainer, 'c6', end, middle);
			this.createCell(cellContainer, 'c7', front, end);
			this.createCell(cellContainer, 'c8', middle, end);
			this.createCell(cellContainer, 'c9', end, end);
			*/
		},

		//createCell: function(containerObj, id, pos_x, pos_y){
		
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

			div.append('img')
				.attr('src', 'http://dummyimage.com/200x100/000000/fff')
		}
	}
});