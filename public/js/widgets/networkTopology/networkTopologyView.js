/**
 * Network Topology View
 * Author: Victor Larsson (elarvic)
 */
define(["node_modules/d3/d3.js", 
	"node_modules/eventbus/eventbus.js",
	"topology/connections", 
	"utilities/previewBox"], function (d3, eventbus, connections, previewBox) {
	
	return{

		properties: {
			enablePreview:''
		},

		containers: {
			mme_list: [],
			sapc_list: [],
			epg_list: [],
			sasn_list: [],
			dsc_list: [],
			undefined_list: [],
			previewBox_list: []
		},

		/**
		 * Initialises the network topology view
		 * 
		 * @param  {container} parent_container [parent container for the widget]
		 * @param  {String}    type             [type of the box]
		 * @param  {String}    title            [title for the widget]
		 */
		init: function (parent_container, type, title, components, enablePreview) {
			this.properties.enablePreview = enablePreview;

			var box = d3.select('#' + parent_container)
				.append('div')
				.attr('id', 'tw-box')
				.attr('class', 'box box-' + type);

			var box_header = box.append('div')
				.attr('id', 'tw-box-header')
				.attr('class', 'box-header with-border')

			//Append title	
			box_header.append('h3')
				.attr('id', 'tw-box-title')
				.attr('class', 'box-title')
				.text(title);

			var box_body = box.append('div')
				.attr('id', 'tw-box-body')
				.attr('class', 'box-body')
				.style('background-color', 'lightblue');

			this.createSvgDrawingboard(box_body);
			this.createGrid(box_body);

			this.drawComponents(components);

			connections.init('tw-svg-container', 'tw-svg-drawingboard', this.containers);

			eventbus.addListener('resize', function(){
				this.resize(parent_container);
				connections.redraw(); 
			}.bind(this));

		},

		update: function (){
			//connections.redraw();
		},

		/**
		 * Resizes the box and the svg-container such that they 
		 * take up all of the available area.
		 * 
		 * @param  {Sting} parent [Parent container]
		 */
		resize: function(parent){

			var boxHeight      = $('#' + parent).height();
			var box_bodyHeight = boxHeight - $('#tw-box-header').height();
			var cell_container = $(".tw-cell-container");
			var margin 		   = 23;

      		$("#tw-box").css('height', boxHeight - margin);
      		$("#tw-box-body").css('height', box_bodyHeight - margin - 1);
      		$(".tw-svg-container").css('width', $(".tw-cell-container").width()); 
      		$(".tw-svg-container").css('height', $(".tw-cell-container").height());
		},

		/**
		 * Creates the drawingboard where the connections will be drawn.
		 * 
		 * @param  {HTML element} containerObj [Parent container]
		 */
		createSvgDrawingboard: function(containerObj) {
			var svgContainer = containerObj.append('div')
				.attr('id', 'tw-svg-container')
				.attr('class', 'tw-svg-container');

			svgContainer.append('svg')
				.attr('id', 'tw-svg-drawingboard')
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
				.attr('id', 'tw-cell-container')
				.attr('class', 'tw-cell-container')
				
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
				.attr('class', 'tw-cell')
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

					case 'DSC':
						cell = 'c9';
						this.containers.dsc_list.push(component);
						break;

					default:
						cell = 'c4';
						this.containers.undefined_list.push(component);
						break;
				}

				//Append Component container
				var div = d3.select('#' + cell).append('div')
					.attr('id', 'tw-component-' + component.getId())
					.attr('class', 'tw-component-div');

				//Append component image
				var img = div.append('img')
					.attr('class', 'tw-component-img')
					.attr('src', component.getActiveImg())
					.on('click', function(){
                        console.log('clicked ' + component.getName());
                        this.displayPreviewBox('', component);
                    }.bind(this))
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
					.attr('class', 'tw-component-text')
                    .text(component.getName())
                    .on('click', function(){
                        console.log('clicked ' + component.getName());
                        this.displayPreviewBox('', component);
                    }.bind(this))
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
		},

		/**
		 * Displays a preview box if the preview poperty is enabled. 
		 * 
		 * @param  {String} parent    [Container for appending]
		 * @param  {Object} component [Network Component]
		 */
		displayPreviewBox: function(parent, component) {
			if(this.properties.enablePreview){
				previewBox.remove();
				previewBox.init('content-container', component);
			}
		}
	}
});