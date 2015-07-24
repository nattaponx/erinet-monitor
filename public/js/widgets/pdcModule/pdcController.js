define(['node_modules/d3/d3.js','public/js/widgets/pdcModule/pdcModel.js','public/js/widgets/pdcModule/pdcView.js']
	, function(d3, model, pdcView){

	return {

		initController: function(parent_container,toggleBtn){
			pdcView.renderUserModule(parent_container);
			_initToggleButton(toggleBtn);
			_runGsnName();
			_setAdminController();
			_setOutputController();

		}

	}

	function _initToggleButton(btnId){
		$(btnId).click(function(){
		var $target = $('#searchModule'),
			$toggle = $(this);
			$target.slideToggle( 500, function () {
			    $toggle.text(($target.is(':visible') ? 'Hide' : 'Show') + ' Panel');
			});
		});
	}

	function _setOutputController(){
		d3.select('#summaryBtn').on('click',_runSummaryController);
	}

	function _runSummaryController(){
		var placeholder = $('#report option[disabled]:selected').val();
		var reportId = $('#report option:selected').val();

		if(placeholder != reportId){		
			model.getPayload(reportId, function(jsonData){
				console.log(jsonData);
			});
		}

	}

	function _setAdminController(){
		model.getUserSession(function(jsonData){
			var profile = jsonData.userdata;
			var role = profile[0].Role;
			if(role == 0){
				d3.select('#pdc-sidebar-btn').html('');
			}
			else{
				pdcView.renderAdminModule('#pdc-sidebar');
				_runAdminController();
			}
		});
	}

	function _runAdminController(){
		model.getTableName(function(jsonData){
			_setupFilterData('#selectTable', 'Select Tables', jsonData.data, 'TableName', _runColumnsConfig);
		});
	}

	function _runColumnsConfig(){
		var tableName = d3.select('#selectTable').node().value;

		d3.select('#parentTableModule').html('');
		var tableForm = d3.select('#parentTableModule').append('div').attr('class','box box-primary')
						.style('padding','10px 10px 45px 10px')
						.append('div').attr('class','box-group').append('div').attr('id','tableModule');
		var tableHeader = tableForm.append('div').attr('class','row')
						  .append('div').attr('class','col-xs-12');
		tableHeader.append('div').attr('class','tablehead').text(tableName);

		model.getColumnsInfo(tableName, function(jsonData){
			pdcView.renderAdminTable(tableForm,'responsive-admin-table',jsonData.data,['ColumnName','ColumnReName','Unit','Formula','Format','Visible']);
			$('#responsive-admin-table').stacktable({myClass:'responsive-admin-table-small'});

			tableForm.append('div').attr('class','row').append('div').attr('class','col-xs-12').append('button')
			.attr('class','btn btn-primary btn-sm right submit-large-only')
			.attr('id','submitTableModule')
			.text('Save Configurations');
			tableForm.append('div').attr('class','row').append('div').attr('class','col-xs-12').append('button')
			.attr('class','btn btn-primary btn-sm right submit-small-only')
			.attr('id','submitTableModule-small')
			.text('Save Configurations');
			d3.select('#submitTableModule')
			.on('click', function() {  _postHandle('#responsive-admin-table :input'); });
			d3.select('#submitTableModule-small')
			.on('click', function() {  _postHandle('#responsive-admin-table-small :input'); });


		});

	}

	function _postHandle(tableId){
   		var serialObj = $(tableId).serializeArray();
   		var trimObj = [];
   		serialObj.forEach(function(obj, idx){
   			// filter out for checkbox default value 0
   			if(obj.name == "Visible[]" && obj.value == "1"){
   				trimObj.pop();
   				trimObj.push(obj);
   			}
   			else{
   				trimObj.push(obj);
   			}
   		});
	    model.postColumnsInfo(trimObj, function(jsonData){
	    	if(jsonData.data){
				// Success
				d3.select('#parentTableModule').html('');
				d3.select('#selectTable :first-child').attr({'disabled':'','selected':''});
				$('.control-sidebar').removeClass('control-sidebar-open');
				pdcView.renderModalView('#pdc-container', 'admin_modal', 'Success!!','text-green', 'Data has been saved succesfully');
				$("#admin_modal").modal('show');
				setTimeout(function(){ 
					$("#admin_modal").modal('hide');
					d3.select('#admin_modal').remove();
				}, 2000);
	    	}
	    	else {
	    		// Failed
				pdcView.renderModalView('#pdc-container', 'admin_modal', 'Failed!!','text-red', 'Server busy please try again!');
				$("#admin_modal").modal('show');
				setTimeout(function(){ 
					$("#admin_modal").modal('hide');
					d3.select('#admin_modal').remove();
				}, 2000);
	    	}


		});

	}

	function _runGsnName(){
		model.getGsnName(function(jsonData){
			_setupFilterData('#node', 'Select Nodes', jsonData.data, 'GsnName', _runGsnVersion);
		});
	}

	function _runGsnVersion(){
		var list = [
    		{ divId: '#hardware', divTitle: 'Select Hardwares' },
    		{ divId: '#region', divTitle: 'Select Regions' },
    		{ divId: '#country', divTitle: 'Select Countries' },
    		{ divId: '#customer_name', divTitle: 'Select Customers' },
    		{ divId: '#timespan', divTitle: 'Select Date' },
    		{ divId: '#node_id', divTitle: 'Select NodeID' },
    		{ divId: '#report', divTitle: 'Select Reports' }
		];
		_resetFields(list);
		var gsnName = d3.select('#node').node().value;
		model.getGsnVersion(gsnName, function(jsonData){
			_setupFilterData('#gsn_version','Select Releases',jsonData.data,'GsnVersion',_runHardware);
		});
	}

	function _runHardware(){
		var list = [
    		{ divId: '#region', divTitle: 'Select Regions' },
    		{ divId: '#country', divTitle: 'Select Countries' },
    		{ divId: '#customer_name', divTitle: 'Select Customers' },
    		{ divId: '#timespan', divTitle: 'Select Date' },
    		{ divId: '#node_id', divTitle: 'Select NodeID' },
    		{ divId: '#report', divTitle: 'Select Reports' }
		];
		_resetFields(list);
		var gsnName = d3.select('#node').node().value;
		var gsnVersions = $('#gsn_version').val();
		model.getHardware(gsnName, gsnVersions, function(jsonData){
			_setupFilterData('#hardware','Select Hardwares',jsonData.data,'Hardware',_runRegion);
		});
	}


	function _runRegion(){
		var list = [
    		{ divId: '#country', divTitle: 'Select Countries' },
    		{ divId: '#customer_name', divTitle: 'Select Customers' },
    		{ divId: '#timespan', divTitle: 'Select Date' },
    		{ divId: '#node_id', divTitle: 'Select NodeID' },
    		{ divId: '#report', divTitle: 'Select Reports' }
		];
		_resetFields(list);
		var gsnName = d3.select('#node').node().value;
		var gsnVersions = $('#gsn_version').val();
		var hardwares = $('#hardware').val();
		model.getRegion(gsnName, gsnVersions, hardwares, function(jsonData){
			_setupFilterData('#region','Select Regions',jsonData.data,'Region',_runCountry);
		});
	}

	function _runCountry(){
		var list = [
    		{ divId: '#customer_name', divTitle: 'Select Customers' },
    		{ divId: '#timespan', divTitle: 'Select Date' },
    		{ divId: '#node_id', divTitle: 'Select NodeID' },
    		{ divId: '#report', divTitle: 'Select Reports' }
		];
		_resetFields(list);
		var gsnName = d3.select('#node').node().value;
		var gsnVersions = $('#gsn_version').val();
		var hardwares = $('#hardware').val();
		var regions = $('#region').val();
		model.getCountry(gsnName, gsnVersions, hardwares, regions, function(jsonData){
			_setupFilterData('#country','Select Countries',jsonData.data,'Country',_runCustomer);
		});
	}

	function _runCustomer(){
		var list = [
    		{ divId: '#timespan', divTitle: 'Select Date' },
    		{ divId: '#node_id', divTitle: 'Select NodeID' },
    		{ divId: '#report', divTitle: 'Select Reports' }
		];
		_resetFields(list);
		var gsnName = d3.select('#node').node().value;
		var gsnVersions = $('#gsn_version').val();
		var hardwares = $('#hardware').val();
		var regions = $('#region').val();
		var conuntries = $('#country').val();
		model.getCustomer(gsnName, gsnVersions, hardwares, regions, conuntries, function(jsonData){
			_setupFilterData('#customer_name','Select Customers',jsonData.data,'CustomerName',_runDate);
		});
	}

	function _runDate(){
		var list = [
    		{ divId: '#node_id', divTitle: 'Select NodeID' },
    		{ divId: '#report', divTitle: 'Select Reports' }
		];
		_resetFields(list);
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
			dateDiv.on('change', _runNodeId);
		});
	}

	function _runNodeId(){
		var list = [
    		{ divId: '#report', divTitle: 'Select Reports' }
		];
		_resetFields(list);
		var gsnName = d3.select('#node').node().value;
		var gsnVersions = $('#gsn_version').val();
		var hardwares = $('#hardware').val();
		var regions = $('#region').val();
		var countries = $('#country').val();
		var customers = $('#customer_name').val();
		var dates = $('#timespan').val();
		model.getNodeId(gsnName, gsnVersions, hardwares, regions, countries, customers, dates, function(jsonData){
			_setupFilterData('#node_id','Select NodeID',jsonData.data,'NodeId',_runReport);
		});
	}

	function _runReport(){
		var gsnName = d3.select('#node').node().value;
		var gsnVersions = $('#gsn_version').val();
		var hardwares = $('#hardware').val();
		var regions = $('#region').val();
		var countries = $('#country').val();
		var customers = $('#customer_name').val();
		var dates = $('#timespan').val();
		var nodeIds = $('#node_id').val();
		model.getReport(gsnName, gsnVersions, hardwares, regions, countries, customers, dates, nodeIds, function(jsonData){
			_setupFilterData('#report','Select Reports',jsonData.data,'Id',null);
		});
	}

	function _setupFilterData(divId, placeholder, jsonData, property, fn){
		var div = d3.select(divId);
		div.html("");
		div.selectAll('option').data(jsonData).enter().append('option')
		.attr('value', function(d){
			return d[property];
		})
		.text(function(d){
			return d[property];
		});
		div.insert('option',':first-child').attr({'disabled':'','selected':''}).text(placeholder);
		div.on('change', fn);
	}

	function _resetFields(divIds){
		divIds.forEach(function(obj) {
	    	d3.select(obj.divId).html("").append('option').attr({'disabled':'','selected':''}).text(obj.divTitle);
		});

	}


});

