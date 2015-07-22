/**
 * Preview Box utility
 */

define(['node_modules/d3/d3.js',
		'node_modules/eventbus/eventbus.js'], function (d3, eventbus) {
	
	return{

		properties:{
			parent: '',
			netComponent: ''
		},

		init: function (parent, netComponent){
			this.properties.parent       = parent;
			this.properties.netComponent = netComponent;

			/* Event listeners */

			eventbus.addListener('resize', function() {
				resize(this.properties.parent);
			});

			this.createBox(parent);
		},

		createBox: function(parent){
			var type = 'primary';

			//Append box
			var box = d3.select('#' + parent).append('div')
				.attr('id', 'preview-box')
				.attr('class', 'box box-' + type);

			//Append box-header
			var box_header = box.append('div')
				.attr('id', 'preview-box-header')
				.attr('class', 'box-header with-border')

			//Append title	
			box_header.append('h3')
				.attr('id', 'preview-box-title')
				.attr('class', 'box-title')
				.text(this.properties.netComponent.getName());

			//Append Details Button
			box_header.append('button')
				.attr('id', 'pb-detailBtn')
				.attr('class', 'btn btn-primary')
				.text('Details')
				.on('click', function(){
					console.log('Details clicked');
				});

			//Append box-tool wrapper
			var box_tools = box_header.append('div')
				.attr('class', 'box-tools pull-right');	

			//Append remove btn
			var remove_btn = box_tools.append('button')
				.attr('class', 'btn btn-box-tool')
				.on('click', function() {
					this.remove('medium');
				}.bind(this));

			//Append remove icon
			remove_btn.append('icon')
				.attr('class', 'fa fa-times');

			//Append box-body
			var box_body = box.append('div')
				.attr('id', 'preview-box-body')
				.attr('class', 'box-body');	

			createTabs(box_body, this.properties);
		},

		remove: function (speed) {
			if(speed){
				$('#preview-box').fadeOut(speed, function() {
					$('#preview-box').remove();
				});
			}else{
				$('#preview-box').remove();
			}
		}
	}

	function createTabs (box_body, properties) {
		var tabs = ['Bearers', 'CPU-Load', 'Memory-Usage', 'Subscribers'];

		//Add tabbar
		var tab_bar = box_body.append('ul')
			.attr('id', 'pb-tab-bar')
			.attr('class', 'nav nav-tabs');


		//Add tab content
		var tab_content_container = box_body.append('div')
			.attr('id', 'pb-tab-content')
			.attr('class', 'tab-content');

		//Add tabs
		tabs.forEach(function (tabName) {
			var tab = tab_bar.append('li')
				.attr('id', 'pb-tab-' + tabName)

			tab.append('a')
				.attr('data-toggle', 'tab')
				.attr('href', '#pb-tab-content-' + tabName)
				.text(tabName);

			var tab_content; 
		
			if(tabName == tabs[0]){
				$('#pb-tab-' + tabName).addClass('active');
				
				tab_content = tab_content_container.append('div')
					.attr('id', 'pb-tab-content-' + tabName)
					.attr('class', 'tab-pane fade in active');
			}else{
				tab_content = tab_content_container.append('div')
					.attr('id', 'pb-tab-content-' + tabName)
					.attr('class', 'tab-pane fade');
			}

			tab_content.append('h3').text(tabName);

		});

		
		

	}

	function resize (parent) {
		// body...
	}
});