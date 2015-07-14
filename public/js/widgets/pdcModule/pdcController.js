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
		var gsnVersion = d3.select('#gsn_version').node().value;
		

	}



});