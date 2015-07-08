
define(["node_modules/d3/d3.js"], function(d3) {
	return {

		initModule: function(parent_container,btn_control){

			var container = d3.select(parent_container),
				searchContainer = container.append('div').attr('id','searchModule'),
				outputContainer = container.append('div').attr('id','outputModule'),
				toprow = searchContainer.append('div').attr('class','row'),
				middlerow = searchContainer.append('div').attr('class','row');

			var toppane = toprow.append('div').attr('class','col-xs-12'),
				leftpane = middlerow.append('div').attr('class','col-md-6 col-sm-6 col-xs-12'),
				rightpane = middlerow.append('div').attr('class','col-md-6 col-sm-6 col-xs-12');

			var innertop = toppane.append('div').attr('class','box box-primary'),
				innerleft = leftpane.append('div').attr('class','box box-primary'),
				innerright = rightpane.append('div').attr('class','box box-primary');

			innerleft.append('h5').attr('class','box-title left-space10').text("select view");
			innerright.append('h5').attr('class','box-title left-space10').text("select export");

			var bodytopRow1 = innertop.append('div').attr('class','box-body'),
				bodytopRow2 = innertop.append('div').attr('class','box-body'),
				bodyleft = innerleft.append('div').attr('class','box-body'),
				bodyright = innerright.append('div').attr('class','box-body');

			bodytopRow1.append('select').attr('id','node').style('width','130px');
			initSelectGroup(bodytopRow2,['gsn_version','hardware','region','country','customer_name','timespan','node_id','report']);

			setPlaceholder('node','Select Nodes');
			setPlaceholder('gsn_version','Select Releases');
			setPlaceholder('hardware','Select Hardwares');
			setPlaceholder('region','Select Regions');
			setPlaceholder('country','Select Countries');
			setPlaceholder('customer_name','Select Customers');
			setPlaceholder('timespan','Select Months');
			setPlaceholder('node_id','Select NodeID');
			setPlaceholder('report','Select Reports');

			bodyleft.append('button').attr({'class':'btn btn-default buttonGroup3','id':'summaryBtn'}).text('Summary');
			bodyleft.append('button').attr({'class':'btn btn-default buttonGroup3','id':'trendsBtn'}).text('Trends');
			bodyleft.append('button').attr({'class':'btn btn-default buttonGroup3','id':'parameterBtn'}).text('Parameter');

			bodyright.append('button').attr({'class':'btn btn-default buttonGroup2','id':'excelBtn'}).text('Excel');
			bodyright.append('button').attr({'class':'btn btn-default buttonGroup2','id':'candiBtn'}).text('Candi');

			////// Output Module ///////
			var btmrow = outputContainer.append('div').attr('class','row'),
				btmpane = btmrow.append('div').attr('class','col-xs-12'),
				innerbtm = btmpane.append('div').attr('class','box box-primary'),
				bodybtmDiv = innerbtm.append('div').attr('class','box-body').append('div');

			var tabs = ['Network_Information','Network_Graph','Node_Information'];
		    initTabWidget(bodybtmDiv, tabs);
		    

		    var records = [
			    {id: 12, user: 'test', date:'2015-07-08', reason:'hello world'},
			    {id: 13, user: 'test', date:'2015-07-08', reason:'hello world'},
			    {id: 14, user: 'test', date:'2015-07-08', reason:'hello world'},
			    {id: 15, user: 'test', date:'2015-07-08', reason:'hello world'}
			];

		    for(var key in tabs){
		    	initTable(tabs[key], records, ['id','user','date','reason']);
		    }	    	


		    ////// Show/Hide Panel run function ///////
		    runTogglePanel(btn_control);

		}

	}

	function setPlaceholder(elemId,title){
		d3.select('#'+ elemId).append('option').attr({'disabled':'','selected':''}).text(title);
	}

	function initSelectGroup(divObj, columns){
		divObj.selectAll('select').data(columns).enter().append('select')
		.attr('multiple','')
		.attr('id', function(d){
			return d;
		})
		.style({'min-width':'100px','width':'12.5%','height':'180px'});
	}

	function initTabWidget(divObj, tabs){
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
		}).style('margin-top','10px')
		.text(function(d){
			return d;
		});
	
	}

	function initTable(divId, records, columns){

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

	function runTogglePanel(btnId){
		$(btnId).click(function(){
		    var $target = $('#searchModule'),
		        $toggle = $(this);

		        $target.slideToggle( 500, function () {
		              $toggle.text(($target.is(':visible') ? 'Hide' : 'Show') + ' Panel');
		        });
		});
	}

});