
define(["node_modules/d3/d3.js"], function(d3) {
	return {

		initSearchModule: function(parent_container){

			var container = d3.select(parent_container);

			var toprow = container.append('div').attr('class','row');
			var middlerow = container.append('div').attr('class','row');

			var toppane = toprow.append('div').attr('class','col-xs-12');
			var leftpane = middlerow.append('div').attr('class','col-md-6 col-sm-6 col-xs-12');
			var rightpane = middlerow.append('div').attr('class','col-md-6 col-sm-6 col-xs-12');

			var innertop = toppane.append('div').attr('class','box box-primary');
			var innerleft = leftpane.append('div').attr('class','box box-primary');
			var innerright = rightpane.append('div').attr('class','box box-primary');

			innertop.append('h3').attr('class','box-title');
			innerleft.append('h5').attr('class','box-title left-space10').text("select view");
			innerright.append('h5').attr('class','box-title left-space10').text("select export");

			var bodytop = innertop.append('div').attr('class','box-body');
			var bodyleft = innerleft.append('div').attr('class','box-body');
			var bodyright = innerright.append('div').attr('class','box-body');

			bodytop.append('div').style('margin-bottom','10px').append('select').attr('id','node').style('width','130px');
			bodytop.append('div');

			bodytop.append('select').attr({'multiple':'','id':'gsn_version'}).style({'min-width':'100px','width':'12.5%','height':'180px'});
			bodytop.append('select').attr({'multiple':'','id':'hardware'}).style({'min-width':'100px','width':'12.5%','height':'180px'});
			bodytop.append('select').attr({'multiple':'','id':'region'}).style({'min-width':'100px','width':'12.5%','height':'180px'});
			bodytop.append('select').attr({'multiple':'','id':'country'}).style({'min-width':'100px','width':'12.5%','height':'180px'});
			bodytop.append('select').attr({'multiple':'','id':'customer_name'}).style({'min-width':'100px','width':'12.5%','height':'180px'});
			bodytop.append('select').attr({'multiple':'','id':'timespan'}).style({'min-width':'100px','width':'12.5%','height':'180px'});
			bodytop.append('select').attr({'multiple':'','id':'node_id'}).style({'min-width':'100px','width':'12.5%','height':'180px'});
			bodytop.append('select').attr({'multiple':'','id':'report'}).style({'min-width':'100px','width':'12.5%','height':'180px'});

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

		},

		initOutputModule: function(parent_container){
			var container = d3.select(parent_container);
			var btmrow = container.append('div').attr('class','row');
			var btmpane = btmrow.append('div').attr('class','col-xs-12');
			var innerbtm = btmpane.append('div').attr('class','box box-primary');
			innerbtm.append('h3').attr('class','box-title').text("Output");
			var bodybtm = innerbtm.append('div').attr('class','box-body');

		}


	}

	function setPlaceholder(elemId,title){
		d3.select('#'+ elemId).append('option').attr({'disabled':'','selected':''}).text(title);
	}


});