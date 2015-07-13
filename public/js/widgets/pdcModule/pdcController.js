define(['node_modules/d3/d3.js','public/js/widgets/pdcModule/pdcModel.js'], function(d3,model){

	return {

		initController: function(){

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
			});


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


});