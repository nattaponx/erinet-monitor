var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.json({ message: 'welcome to api!' });   
});

router.get('/etv/:function_id', function(req, res) {
	var etv_model = require('../models/etv.js');  
	res.header('Access-Control-Allow-Origin', '*');

    var fid = req.params.function_id;
	switch(fid){
		case 'fetchetvnode':
   			etv_model.fetchETVNode(function(jsonData){
   				res.json(jsonData);
   			});
			break;
		default:
			res.json({ error: "error invalid request" });   

	}

});

router.get('/performance/:function_id', function(req, res) {
	var perf_model = require('../models/performance.js');  
	res.header('Access-Control-Allow-Origin', '*');

    var fid = req.params.function_id;
	switch(fid){
		case 'fetchnodestatus':
   			perf_model.fetchNodeStatus(function(jsonData){
   				res.json(jsonData);
   			});
			break;
		case 'fetchpayload':
   			perf_model.fetchPayLoad(function(jsonData){
   				res.json(jsonData);
   			});
			break;	
		default:
			res.json({ error: "error invalid request" });   

	}

});


router.get('/pdc/:function_id', function(req, res) {
	res.header('Access-Control-Allow-Origin', '*');
	var pdc_model = require('../models/pdc.js');  
    var fid = req.params.function_id;

    var gsnName = req.param('gsnName');
    var gsnVersions = req.param('gsnVersion');
    var hardwares = req.param('hardware');
    var regions = req.param('region');
    var countries = req.param('country');
    var customers = req.param('customer');
    var dates = req.param('date');
    var nodeIds = req.param('nodeId');

	switch(fid){
		case 'fetchgsnname':
   			pdc_model.fetchGsnName(function(jsonData){
   				res.json(jsonData);
   			});
			break;
		case 'fetchgsnversion':
   			pdc_model.fetchGsnVersion(gsnName, function(jsonData){
   				res.json(jsonData);
   			});
			break;	
		case 'fetchhardware':
   			pdc_model.fetchHardware(gsnName, gsnVersions, function(jsonData){
   				res.json(jsonData);
   			});
			break;	
		case 'fetchregion':
   			pdc_model.fetchRegion(gsnName, gsnVersions, hardwares, function(jsonData){
   				res.json(jsonData);
   			});
			break;
		case 'fetchcountry':
   			pdc_model.fetchCountry(gsnName, gsnVersions, hardwares, regions, function(jsonData){
   				res.json(jsonData);
   			});
			break;	
		case 'fetchcustomer':
   			pdc_model.fetchCustomer(gsnName, gsnVersions, hardwares, regions, countries, function(jsonData){
   				res.json(jsonData);
   			});
			break;	
		case 'fetchdate':
   			pdc_model.fetchDate(gsnName, gsnVersions, hardwares, regions, countries, customers, function(jsonData){
   				res.json(jsonData);
   			});
			break;			
		case 'fetchnodeid':
   			pdc_model.fetchNodeId(gsnName, gsnVersions, hardwares, regions, countries, customers, dates, function(jsonData){
   				res.json(jsonData);
   			});
			break;		
		case 'fetchreport':
   			pdc_model.fetchReport(gsnName, gsnVersions, hardwares, regions, countries, customers, dates, nodeIds, function(jsonData){
   				res.json(jsonData);
   			});
			break;						
		default:
			res.json({ error: "error invalid request" });   

	}

});


module.exports = router;