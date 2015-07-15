define(['node_modules/d3/d3.js','public/js/widgets/pdcModule/pdcModel.js'], function(d3,model){

	return {

		initController: function(){
			runGsnName();


		},

		initToggleButton: function(btnId){
			$(btnId).click(function(){
			    var $target = $('#searchModule'),
			        $toggle = $(this);
			        $target.slideToggle( 500, function () {
			              $toggle.text(($target.is(':visible') ? 'Hide' : 'Show') + ' Panel');
			        });
			});
		}

	}

	function runGsnName(){
		model.getGsnName(function(jsonData){
			var nodeDiv = d3.select('#node');
			nodeDiv.html("");
			nodeDiv.selectAll('option').data(jsonData.data).enter().append('option')
			.attr('value', function(d){
				return d.GsnName;
			})
			.text(function(d){
				return d.GsnName;
			});
			nodeDiv.insert('option',':first-child').attr({'disabled':'','selected':''}).text('Select Nodes');
			nodeDiv.on('change', runGsnVersion);
		});
	}

	function runGsnVersion(){
		var list = [
    		{ divId: '#hardware', divTitle: 'Select Hardwares' },
    		{ divId: '#region', divTitle: 'Select Regions' },
    		{ divId: '#country', divTitle: 'Select Countries' },
    		{ divId: '#customer_name', divTitle: 'Select Customers' },
    		{ divId: '#timespan', divTitle: 'Select Date' },
    		{ divId: '#node_id', divTitle: 'Select NodeID' },
    		{ divId: '#report', divTitle: 'Select Reports' }
		];
		resetFields(list);
		var gsnName = d3.select('#node').node().value;
		model.getGsnVersion(gsnName, function(jsonData){
			var gsnVersionDiv = d3.select('#gsn_version');
			gsnVersionDiv.html("");
			gsnVersionDiv.selectAll('option').data(jsonData.data).enter().append('option')
			.attr('value', function(d){
				return d.GsnVersion;
			})
			.text(function(d){
				return d.GsnVersion;
			});
			gsnVersionDiv.insert('option',':first-child').attr({'disabled':'','selected':''}).text('Select Releases');
			gsnVersionDiv.on('change', runHardware);
		});
	}

	function runHardware(){
		var list = [
    		{ divId: '#region', divTitle: 'Select Regions' },
    		{ divId: '#country', divTitle: 'Select Countries' },
    		{ divId: '#customer_name', divTitle: 'Select Customers' },
    		{ divId: '#timespan', divTitle: 'Select Date' },
    		{ divId: '#node_id', divTitle: 'Select NodeID' },
    		{ divId: '#report', divTitle: 'Select Reports' }
		];
		resetFields(list);
		var gsnName = d3.select('#node').node().value;
		var gsnVersions = $('#gsn_version').val();
		model.getHardware(gsnName, gsnVersions, function(jsonData){
			var hardwareDiv = d3.select('#hardware');
			hardwareDiv.html("");
			hardwareDiv.selectAll('option').data(jsonData.data).enter().append('option')
			.attr('value', function(d){
				return d.Hardware;
			})
			.text(function(d){
				return d.Hardware;
			});
			hardwareDiv.insert('option',':first-child').attr({'disabled':'','selected':''}).text('Select Hardwares');
			hardwareDiv.on('change', runRegion);
		});
	}


	function runRegion(){
		var list = [
    		{ divId: '#country', divTitle: 'Select Countries' },
    		{ divId: '#customer_name', divTitle: 'Select Customers' },
    		{ divId: '#timespan', divTitle: 'Select Date' },
    		{ divId: '#node_id', divTitle: 'Select NodeID' },
    		{ divId: '#report', divTitle: 'Select Reports' }
		];
		resetFields(list);
		var gsnName = d3.select('#node').node().value;
		var gsnVersions = $('#gsn_version').val();
		var hardwares = $('#hardware').val();
		model.getRegion(gsnName, gsnVersions, hardwares, function(jsonData){
			var regionDiv = d3.select('#region');
			regionDiv.html("");
			regionDiv.selectAll('option').data(jsonData.data).enter().append('option')
			.attr('value', function(d){
				return d.Region;
			})
			.text(function(d){
				return d.Region;
			});
			regionDiv.insert('option',':first-child').attr({'disabled':'','selected':''}).text('Select Regions');
			regionDiv.on('change', runCountry);
		});
	}

	function runCountry(){
		var list = [
    		{ divId: '#customer_name', divTitle: 'Select Customers' },
    		{ divId: '#timespan', divTitle: 'Select Date' },
    		{ divId: '#node_id', divTitle: 'Select NodeID' },
    		{ divId: '#report', divTitle: 'Select Reports' }
		];
		resetFields(list);
		var gsnName = d3.select('#node').node().value;
		var gsnVersions = $('#gsn_version').val();
		var hardwares = $('#hardware').val();
		var regions = $('#region').val();
		model.getCountry(gsnName, gsnVersions, hardwares, regions, function(jsonData){
			var countryDiv = d3.select('#country');
			countryDiv.html("");
			countryDiv.selectAll('option').data(jsonData.data).enter().append('option')
			.attr('value', function(d){
				return d.Country;
			})
			.text(function(d){
				return d.Country;
			});
			countryDiv.insert('option',':first-child').attr({'disabled':'','selected':''}).text('Select Countries');
			countryDiv.on('change', runCustomer);
		});
	}

	function runCustomer(){
		var list = [
    		{ divId: '#timespan', divTitle: 'Select Date' },
    		{ divId: '#node_id', divTitle: 'Select NodeID' },
    		{ divId: '#report', divTitle: 'Select Reports' }
		];
		resetFields(list);
		var gsnName = d3.select('#node').node().value;
		var gsnVersions = $('#gsn_version').val();
		var hardwares = $('#hardware').val();
		var regions = $('#region').val();
		var conuntries = $('#country').val();
		model.getCustomer(gsnName, gsnVersions, hardwares, regions, conuntries, function(jsonData){
			var customerDiv = d3.select('#customer_name');
			customerDiv.html("");
			customerDiv.selectAll('option').data(jsonData.data).enter().append('option')
			.attr('value', function(d){
				return d.CustomerName;
			})
			.text(function(d){
				return d.CustomerName;
			});
			customerDiv.insert('option',':first-child').attr({'disabled':'','selected':''}).text('Select Customers');
			customerDiv.on('change', runDate);
		});
	}

	function runDate(){
		var list = [
    		{ divId: '#node_id', divTitle: 'Select NodeID' },
    		{ divId: '#report', divTitle: 'Select Reports' }
		];
		resetFields(list);
		var gsnName = d3.select('#node').node().value;
		var gsnVersions = $('#gsn_version').val();
		var hardwares = $('#hardware').val();
		var regions = $('#region').val();
		var countries = $('#country').val();
		var customers = $('#customer_name').val();
		model.getDate(gsnName, gsnVersions, hardwares, regions, countries, customers, function(jsonData){
			var dateDiv = d3.select('#timespan');
			dateDiv.html("");
			dateDiv.selectAll('option').data(jsonData.data).enter().append('option')
			.attr('value', function(d){
				return d.Year +'-'+d.Month;
			})
			.text(function(d){
				return d.Year +'-'+d.Month;
			});
			dateDiv.insert('option',':first-child').attr({'disabled':'','selected':''}).text('Select Date');
			dateDiv.on('change', runNodeId);
		});
	}

	function runNodeId(){
		var list = [
    		{ divId: '#report', divTitle: 'Select Reports' }
		];
		resetFields(list);
		var gsnName = d3.select('#node').node().value;
		var gsnVersions = $('#gsn_version').val();
		var hardwares = $('#hardware').val();
		var regions = $('#region').val();
		var countries = $('#country').val();
		var customers = $('#customer_name').val();
		var dates = $('#timespan').val();
		model.getNodeId(gsnName, gsnVersions, hardwares, regions, countries, customers, dates, function(jsonData){
			var nodeIdDiv = d3.select('#node_id');
			nodeIdDiv.html("");
			nodeIdDiv.selectAll('option').data(jsonData.data).enter().append('option')
			.attr('value', function(d){
				return d.NodeId;
			})
			.text(function(d){
				return d.NodeId;
			});
			nodeIdDiv.insert('option',':first-child').attr({'disabled':'','selected':''}).text('Select NodeID');
			nodeIdDiv.on('change', runReport);
		});
	}

	function runReport(){
		var gsnName = d3.select('#node').node().value;
		var gsnVersions = $('#gsn_version').val();
		var hardwares = $('#hardware').val();
		var regions = $('#region').val();
		var countries = $('#country').val();
		var customers = $('#customer_name').val();
		var dates = $('#timespan').val();
		var nodeIds = $('#node_id').val();
		model.getReport(gsnName, gsnVersions, hardwares, regions, countries, customers, dates, nodeIds, function(jsonData){
			var reportDiv = d3.select('#report');
			reportDiv.html("");
			reportDiv.selectAll('option').data(jsonData.data).enter().append('option')
			.attr('value', function(d){
				return d.Id;
			})
			.text(function(d){
				return d.Id;
			});
			reportDiv.insert('option',':first-child').attr({'disabled':'','selected':''}).text('Select Reports');
			// nodeIdDiv.on('change', runReport);
		});
	}

	function resetFields(divIds){
		divIds.forEach(function(obj) {
	    	d3.select(obj.divId).html("").append('option').attr({'disabled':'','selected':''}).text(obj.divTitle);
		});

	}


});

// console.log($('#gsn_version').val()); 
