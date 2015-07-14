define(['node_modules/d3/d3.js'], function (d3){
	return {

		properties: {
			current_connections:[],
			svg_container_id: '',
			svg_drawingboard_id: ''
		},

		init: function(svg_container_id, svg_drawingboard_id){
			this.properties.svg_container_id    = svg_container_id;
			this.properties.svg_drawingboard_id = svg_drawingboard_id;
		},

		connect: function (component1, component2) {

			addPath(this.properties.svg_drawingboard_id,
				component1.getId() + '-' + component2.getId(), '0.5');

			var svg       = $("#" + this.properties.svg_drawingboard_id);
			var startElem = $("#component-" + component1.getId());
			var endElem   = $("#component-" + component2.getId());
			var path 	  = $("#" + component1.getId() + '-' + component2.getId());

			connectElements(svg, path, startElem, endElem);
		},

		redraw: function(){

		}
	}

	/*
	function connect (component1, component2) {
		// body...
	}
	*/

	function addPath (svg_drawingboard_id, id, opacityLevel) {
		d3.select('#' + svg_drawingboard_id).append('path')
			.attr('id', id)
			.attr('class', 'connection-path');
	}

	function connectAll() {
	    // connect all the paths you want!
	    connectElements($("#svg1"), $("#path1"), $("#teal"),   $("#orange"));
	 
	}
	
	function connectElements(svg, path, startElem, endElem) {
	    var svgContainer = $("#svg-container");
	 
	    // if first element is lower than the second, swap!
	    if(startElem.offset().top > endElem.offset().top){
	        var temp = startElem;
	        startElem = endElem;
	        endElem = temp;
	    }
	 
	    // get (top, left) corner coordinates of the svg container   
	    var svgTop  = svgContainer.offset().top;
	    var svgLeft = svgContainer.offset().left;

	    console.log('svgTop ' + svgTop);
	    console.log('svgLeft ' + svgLeft);
	 
	    // get (top, left) coordinates for the two elements
	    var startCoord = startElem.offset();
	    var endCoord   = endElem.offset();
	 	
	    console.log('startCoord left-top ' + startCoord.left + ' ' + startCoord.top);
	    console.log('endCoord left-top ' + endCoord.left + ' ' + endCoord.top);

	    // calculate path's start (x,y)  coords
	    // we want the x coordinate to visually result in the element's mid point
	    var startX = startCoord.left + 0.5*startElem.outerWidth() - svgLeft;    // x = left offset + 0.5*width - svg's left offset
	    var startY = startCoord.top  + startElem.outerHeight() - svgTop;        // y = top offset + height - svg's top offset
	 	
	    console.log('startX ' + startX);
	    console.log('startY ' + startY);

	    var padding = parseFloat(endElem.css('padding-top'));
	    // calculate path's end (x,y) coords
	    var endX = endCoord.left + 0.5*endElem.outerWidth() - svgLeft;
	    var endY = endCoord.top  - svgTop + padding;

	    console.log('endX ' + endX);
	    console.log('endY ' + endY);
	 	
	    var weirdOffset = 0;//135;


	    //console.log('Padding-top ' + padding);

	    // call function for drawing the path
	    drawPath(svg, path, startX, startY, endX, endY);
	 
	}

	function drawPath(svg, path, startX, startY, endX, endY) {
	    // get the path's stroke width (if one wanted to be  really precize, one could use half the stroke size)
	    var stroke = path.css('stroke-width')//parseFloat(path.attr("stroke-width"));
	    console.log('stroke-width ' + stroke);

	    /*
	    // check if the svg is big enough to draw the path, if not, set heigh/width
	    if (svg.attr("height") <  endY)                 svg.attr("height", endY);
	    if (svg.attr("width" ) < (startX + stroke) )    svg.attr("width", (startX + stroke));
	    if (svg.attr("width" ) < (endX   + stroke) )    svg.attr("width", (endX   + stroke));
	    */
	   
	    var deltaX = (endX - startX) * 0.15;
	    var deltaY = (endY - startY) * 0.15;
	    // for further calculations which ever is the shortest distance
	    var delta  =  deltaY < absolute(deltaX) ? deltaY : absolute(deltaX);
	 
	    // set sweep-flag (counter/clock-wise)
	    // if start element is closer to the left edge,
	    // draw the first arc counter-clockwise, and the second one clock-wise
	    var arc1 = 0; var arc2 = 1;
	    if (startX > endX) {
	        arc1 = 1;
	        arc2 = 0;
	    }
	    // draw tha pipe-like path
	    // 1. move a bit down, 2. arch,  3. move a bit to the right, 4.arch, 5. move down to the end 
	    path.attr("d",  "M"  + startX + " " + startY +
	                    " V" + (startY + delta) +
	                    " A" + delta + " " +  delta + " 0 0 " + arc1 + " " + (startX + delta*signum(deltaX)) + " " + (startY + 2*delta) +
	                    " H" + (endX - delta*signum(deltaX)) + 
	                    " A" + delta + " " +  delta + " 0 0 " + arc2 + " " + endX + " " + (startY + 3*delta) +
	                    " V" + endY );
	}

	function signum(x) {
	    return (x < 0) ? -1 : 1;
	}
	function absolute(x) {
	    return (x < 0) ? -x : x;
	}
	 
	/* 
	$(document).ready(function() {
	    // reset svg each time 
	    $("#svg1").attr("height", "0");
	    $("#svg1").attr("width", "0");
	    connectAll();
	});
	 
	$(window).resize(function () {
	    // reset svg each time 
	    $("#svg1").attr("height", "0");
	    $("#svg1").attr("width", "0");
	    connectAll();
	});
	*/
});