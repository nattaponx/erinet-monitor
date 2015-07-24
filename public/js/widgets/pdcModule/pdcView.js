
define(["node_modules/d3/d3.js"], function(d3) {
	return {

		renderUserModule: function(parent_container){

			var container = d3.select(parent_container),
				searchContainer = container.append('div').attr('id','searchModule'),
				outputContainer = container.append('div').attr('id','outputModule'),
				toprow = searchContainer.append('div').attr('class','box box-primary')
				.style('padding','10px 10px 10px 10px').append('div').attr('class','box-group'),
				middlerow = searchContainer.append('div').attr('class','row');

			var toppane1 = toprow.append('div').attr('class','row'),
			 	toppane2 = toprow.append('div').attr('class','row'),
				toppane3 = toprow.append('div').attr('class','row');

				toppane1.append('div').attr('class','col').append('div').style('width','130px')
				.attr('class','box from-group').append('select')
				.attr({'class':'form-control','id':'node'});

				toppane2.selectAll('div').data(['gsn_version','hardware','region','country','customer_name','timespan']).enter().append('div')
				.attr('class','col-xs-6 col-sm-4 col-md-2 col').append('div')
				.attr('class','box box-fluid from-group').append('select')
				.attr({'multiple':'','class':'form-control'})
				.attr('id', function(d){
					return d;
				}).style({'width':'100%','height':'180px','padding':'0'});

				toppane3.selectAll('div').data(['node_id','report']).enter().append('div')
				.attr('class','col-md-6 col').append('div')
				.attr('class','box box-fluid from-group').append('select')
				.attr({'multiple':'','class':'form-control'})
				.attr('id', function(d){
					return d;
				}).style({'width':'100%','height':'180px','padding':'0'});

			var leftpane = middlerow.append('div')
				.attr('class','col-md-6 col-sm-6 col-xs-12').append('div')					
				.attr('class','box box-primary').style('padding','10px 10px 10px 10px');
				
				leftpane.append('h5').attr('class','box-title').text('select view');
			
			var innerLeft = leftpane.append('div').attr('class','box-body').append('div').attr('class','row');
				
				innerLeft.selectAll('div').data([
			    {btnId: 'summaryBtn', btnName: 'Summary'},
			    {btnId: 'trendsBtn', btnName: 'Trends'},
			   	{btnId: 'parameterBtn', btnName: 'Parameters'}
				])
				.enter().append('div').attr('class','col-xs-4 col')
				.append('button').attr('class','btn btn-default button100')
				.attr('id', function(d){
					return d.btnId;
				})
				.text(function(d){
					return d.btnName;
				});

			var rightpane = middlerow.append('div')
				.attr('class','col-md-6 col-sm-6 col-xs-12').append('div')					
				.attr('class','box box-primary').style('padding','10px 10px 10px 10px');
				
				rightpane.append('h5').attr('class','box-title').text('export data');
			
			var innerRight = rightpane.append('div').attr('class','box-body').append('div').attr('class','row');
				
				innerRight.selectAll('div').data([
			    {btnId: 'excelBtn', btnName: 'Excel'},
			    {btnId: 'candiBtn', btnName: 'Candi'}
				])
				.enter().append('div').attr('class','col-xs-6 col')
				.append('button').attr('class','btn btn-default button100')
				.attr('id', function(d){
					return d.btnId;
				})
				.text(function(d){
					return d.btnName;
				});

			_setPlaceholder('#node','Select Nodes');
			_setPlaceholder('#gsn_version','Select Releases');
			_setPlaceholder('#hardware','Select Hardwares');
			_setPlaceholder('#region','Select Regions');
			_setPlaceholder('#country','Select Countries');
			_setPlaceholder('#customer_name','Select Customers');
			_setPlaceholder('#timespan','Select Date');
			_setPlaceholder('#node_id','Select NodeID');
			_setPlaceholder('#report','Select Reports');


			////// Output Module ///////
			var btmrow = outputContainer.append('div').attr('class','row'),
				btmpane = btmrow.append('div').attr('class','col-xs-12'),
				innerbtm = btmpane.append('div').attr('class','box box-primary'),
				bodybtmDiv = innerbtm.append('div').attr('class','box-body').append('div');

			var tabs = ['Network_Information','Network_Graph','Node_Information'];
		    _initTabWidget(bodybtmDiv, tabs);
		    

		 //    var records = [
			//     {id: 12, user: 'test', date:'2015-07-08', reason:'hello world'},
			//     {id: 13, user: 'test', date:'2015-07-08', reason:'hello world'},
			//     {id: 14, user: 'test', date:'2015-07-08', reason:'hello world'},
			//     {id: 15, user: 'test', date:'2015-07-08', reason:'hello world'}
			// ];

		 //    for(var key in tabs){
		 //    	_initTable(tabs[key], records, ['id','user','date','reason']);
		 //    }	    	


		},

		renderAdminModule: function(parent_container){
			////// Admin control sidebar ////////
			d3.select(parent_container).append('section').attr('class','content-header')
			.append('h1').text('PDC Admin Panel');

			var sidebarDiv = d3.select(parent_container).append('div').attr('class','content');

			sidebarDiv.append('div').attr('class','box box-primary').style('padding','10px 10px 0px 10px')
			.append('div').attr('class','box-group').append('div').attr('class','row')
			.append('div').attr('class','box from-group').style('width','240px').style('margin-left','15px')
			.append('select').attr('class','form-control').attr('id','selectTable');
			_setPlaceholder('#selectTable','Select Tables');

			sidebarDiv.append('div').attr('id','parentTableModule');

		},

		renderAdminTable: function(selectedObj, table_Id,records, columns){
			var divObj = selectedObj;
			var table = divObj.append('div').attr('class','row')
							.append('div').attr('class','col-xs-12')
							.append('div').attr('class','box')
							.append('div').attr('class','box-body no-padding')
							.append('table').attr('class','table table-hover')
							.attr('id',table_Id);

			var thead = table.append('thead'),
				tbody = table.append('tbody');

			thead.append('tr').selectAll('th').data(columns).enter().append('th')
			.text(function(d) {
				return d;
			});

			var rows = tbody.selectAll('tr').data(records).enter().append('tr');

			var cells = rows.selectAll("td").data(function(row) {
	            return columns.map(function(d) {
	                return {column: d, value: row[d], id: row['Id']};
	            });
	        }).enter().append("td").html(function(d,idx) { 
	        	if(idx == 1){
	        		//ColumnReName
	        		return "<input type='text' name='ColumnReName[]' value='" + d.value + "' placeholder='" + d.column + "'>";
	        	}
	        	else if(idx == 2){
	        		//Unit
	        		return "<input type='text' name='Unit[]' value='" + d.value + "' placeholder='" + d.column + "' size='8'>";

	        	}
	        	else if(idx == 3){
	        		//Formula
	        		return "<input type='text' name='Formula[]' value='" + d.value + "' placeholder='" + d.column + "' size='8'>";

	        	}
	        	else if(idx == 4){
	        		//Format
	        		return "<input type='text' name='Format[]' value='" + d.value + "' placeholder='" + d.column + "' size='8'>";

	        	}
	        	else if(idx == 5){
	        		// Checkbox trick to make unchecked box always 0
	        		var checkbox ="<input type='hidden' name='Visible[]' value='0'>";
	        		//Visible
	        		if(d.value){
	        			return checkbox + "<input type='checkbox' name='Visible[]' value='1' checked>";
	        		}
	        		else{
	        			return checkbox + "<input type='checkbox' name='Visible[]' value='1'>";
	        		}
	        	}
	        	else{
	        		return d.value + "<input type='hidden' name='Id[]' value='"+ d.id +"'>"; 
	        	}
	        });

			table.selectAll("thead th")
		    .text(function(d) {
		        return d.charAt(0).toUpperCase() + d.substr(1);
		    });
		},

		renderGenericTable: function(divId, table_Id, records, columns){
			var divObj = d3.select(divId);
			divObj.html('');
			var table = divObj.append('div').attr('class','row')
							.append('div').attr('class','col-xs-12')
							.append('div').attr('class','box')
							.append('div').attr('class','box-body no-padding')
							.append('table').attr('class','table table-hover')
							.attr('id',table_Id)
							.style('width','100%');

			var thead = table.append('thead'),
				tbody = table.append('tbody');

			thead.append('tr').selectAll('th').data(columns).enter().append('th')
			.text(function(d) {
				return d;
			});

			var rows = tbody.selectAll('tr').data(records).enter().append('tr');

			var cells = rows.selectAll("td").data(function(row) {
	            return columns.map(function(d) {
	                return {column: d, value: row[d], id: row['Id']};
	            });
	        }).enter().append("td").html(function(d,idx){ 

	        		return d.value;
	        });

			table.selectAll("thead th")
		    .text(function(d) {
		        return d.charAt(0).toUpperCase() + d.substr(1);
		    });
		},

		renderModalView: function(parent_container, modal_Id, title, title_color, body){
			var container = d3.select(parent_container);
			var modal_content = container.append('div').attr('id', modal_Id).attr('class','modal fade')
								.append('div').attr('class','modal-dialog')
							 	.append('div').attr('class','modal-content');
			var modal_header = modal_content.append('div').attr('class','modal-header');	
			modal_header.append('button').attr('class','close').attr('data-dismiss',',modal')
			.attr('aria-hidden','true').html('&times;');
			modal_header.append('h4').attr('class','modal-title '+title_color).text(title);			 	  
			modal_content.append('div').attr('class','modal-body').append('p').text(body);

		}


	}

	function _setPlaceholder(elemId,title){
		d3.select(elemId).append('option').attr({'disabled':'','selected':''}).text(title);
	}


	function _initTabWidget(divObj, tabs){
		var ulObj = divObj.append('ul').attr({'class':'nav nav-tabs','role':'tablist'});
		var innerDiv = divObj.append('div').attr('class','tab-content');
		
		ulObj.selectAll('li').data(tabs).enter().append('li').attr({'role':'presentation'})
		.attr('class', function(d,idx){
			if(idx == 0)
				return 'active';
			else return '';
		}).append('a')
		.attr('href', function(d){
			return '#' + d;
		})
		.attr('aria-controls', function(d){
			return d;
		})
		.attr({'role':'tab','data-toggle':'tab'}).text(function(d){ return d; });

		innerDiv.selectAll('div').data(tabs).enter().append('div').attr('role','tabpanel')
		.attr('class', function(d,idx){
			if(idx == 0)
				return 'tab-pane active';
			else return 'tab-pane';
		})
		.attr('id', function(d){
			return d;
		}).style('margin-top','10px');
		// .text(function(d){
		// 	return d;
		// });
	
	}

	function _initTable(divId, records, columns){

		var divObj = d3.select('#' + divId);
		var table = divObj.append('div').attr('class','row')
						.append('div').attr('class','col-xs-12')
						.append('div').attr('class','box')
						.append('div').attr('class','box-body table-responsive no-padding')
						.append('table').attr('class','table table-hover');

		var thead = table.append('thead'),
			tbody = table.append('tbody');

		thead.append('tr').selectAll('th').data(columns).enter().append('th')
		.text(function(d) {
			return d;
		});

		var rows = tbody.selectAll('tr').data(records).enter().append('tr');

		var cells = rows.selectAll("td").data(function(row) {
            return columns.map(function(d) {
                return {column: d, value: row[d]};
            });
        }).enter().append("td").text(function(d) { return d.value; });

		table.selectAll("thead th")
	    .text(function(d) {
	        return d.charAt(0).toUpperCase() + d.substr(1);
	    });

	}


});