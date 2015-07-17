/**
 * Network Topology View
 * Author: Victor Larsson (elarvic)
 */
define(["node_modules/d3/d3.js", "topology/connections", "node_modules/eventbus/eventbus.js"], function (d3, connections, eventbus) {
	return{

		containers: {
			mme_list: [],
			sapc_list: [],
			epg_list: [],
			sasn_list: [],
			undefined_list: []
		},

		/**
		 * Initialises the network topology view
		 * 
		 * @param  {container} parent_container [parent container for the widget]
		 * @param  {String}    type             [type of the box]
		 * @param  {String}    title            [title for the widget]
		 */
		init: function (parent_container, type, title, components) {

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

			this.createSvgDrawingboard(box_body);
			this.createGrid(box_body);

			this.drawComponents(components);

			connections.init('svg-container', 'svg-drawingboard', this.containers);

			this.resize();
			$(window).resize(function () {
		    	setTimeout(function(){ 
		    		this.resize();
		    		connections.redraw(); 	
		    	}.bind(this), 650);
			}.bind(this));

			eventbus.addListener('resize', function(){
				this.resize();
				connections.redraw(); 
			}.bind(this));

		},

		update: function (){
			//connections.redraw();
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

      		$(".content").css('min-height', diff);
      		$(".content-container").css('min-height', diff - 50);
      		$(".box").css('height', diff - 50);

      		$(".box-body").css('height', diff-91);

      		$(".svg-container").css('width', $(".cell-container").width()); 
      		$(".svg-container").css('height', $(".cell-container").height());
		},

		/**
		 * Creates the drawingboard where the connections will be drawn.
		 * 
		 * @param  {HTML element} containerObj [Parent container]
		 */
		createSvgDrawingboard: function(containerObj) {
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
						this.containers.epg_list.push(component);
						break;
					
					case 'MME':
						cell = 'c1';
						this.containers.mme_list.push(component);
						break;

					case 'SAPC':
						cell = 'c3';
						this.containers.sapc_list.push(component);
						break;

					case 'SASN':
						cell = 'c6';
						this.containers.sasn_list.push(component);
						break;

					default:
						cell = 'c4';
						this.containers.undefined_list.push(component);
						break;
				}

				//Append Component container
				var div = d3.select('#' + cell).append('div')
					.attr('id', 'component-' + component.getId())
					.attr('class', 'component-div');

				//Append component image
				var img = div.append('img')
					.attr('class', 'component-img')
					.attr('src', component.getActiveImg())
					.on('click', function(){
                        console.log('clicked ' + component.getName());
                    })
                    .on('mouseover', function(){
                        if(component.getStatus() == 'ACTIVE'){
                        	img.attr('src', component.getHoverImg());
                        }                   
                    })
                    .on('mouseout', function(){
                        if(component.getStatus() == 'ACTIVE'){
                        	img.attr('src', component.getActiveImg());
                        }      
                    });

                //Append component text(name)
				div.append('text')
					.attr('class', 'component-text')
                    .text(component.getName())
                    .on('click', function(){
                        console.log('clicked ' + component.getName());
                    })
                    .on('mouseover', function(){
                        if(component.getStatus() == 'ACTIVE'){
                        	img.attr('src', component.getHoverImg());
                        }                   
                    })
                    .on('mouseout', function(){
                        if(component.getStatus() == 'ACTIVE'){
                        	img.attr('src', component.getActiveImg());
                        }      
                    });
			}.bind(this));
			
			/*
			connections.init('svg-container', 'svg-drawingboard');

			this.containers.c5_EPG_Array.forEach(function(epg){
				this.containers.c3_SAPC_Array.forEach(function(sapc){
					connections.connect(epg, sapc);
				}.bind(this));
			}.bind(this));		

			this.containers.c1_MME_Array.forEach(function(mme){
				this.containers.c5_EPG_Array.forEach(function(epg){
					connections.connect(mme, epg);
				}.bind(this));
			}.bind(this));
			*/
		},
	}

	function connectComponents (containers) {
		console.log('Drawing Connections');
		connections.init('svg-container', 'svg-drawingboard');

		containers.epg_list.forEach(function(epg){
			containers.sapc_list.forEach(function(sapc){
				connections.connect(epg, sapc);
			});
		});		

		containers.mme_list.forEach(function(mme){
			containers.epg_list.forEach(function(epg){
				connections.connect(mme, epg);
			});
		});
	}
});