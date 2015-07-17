To use this json API service 
(Dont forget to run Node server for API by type "node server.js" in shell)

Option 1 : Recommended!!!! shorthand version of jQuery Ajax(100% working)
use jQuery to send GET request
1A) without params
	$.get( "http://localhost:8080/api/[component]/[function]").done(function(jsonData){
	    //do something with data here
	});

1B) with params
	$.get( "http://localhost:8080/api/[component]/[function]", {key1: param1, key2: param2})
	.done(function(jsonData){
	    //do something with data here
	});

Option 2 : full version using jQuery Ajax (work too)
	http://api.jquery.com/jquery.ajax/



Where 
	[component] is the component name. We have 3 components so far which are
	- etv
	- performance
	- pdc

	[function] is the specific target object we want to get depends on component
	- etv
		- fetchetvnode

	- performance
		- fetchnodestatus
		- fetchpayload

	- pdc
		- a lot...I don't think u need to use this


Note:
	fetchetvnode
	- return dummy ETV nodes

	fetchnodestatus
	- return node status contains CPU Load, Memory Usage

	fetchpayload
	- return uplink and downlink traffic

Example
	$.get( "http://localhost:8080/api/etv/fetchetvnode")
	.done(function(data){
	    //do something with data here
	});

