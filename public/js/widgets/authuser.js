define(["node_modules/d3/d3.js"], function(d3) {

	return {

		initProfile: function(){

			$.get('http://localhost:3000/api/userdata').done(function(jsonData){
			    var profiles = jsonData.userdata;
			    var fullname = profiles[0].Firstname + '  ' + profiles[0].Lastname;
			    var role = (profiles[0].Role == 1) ? 'Admin' : 'User';

				var topProfile = d3.select('#top_profile'),
				    topProfileTitle = d3.select('#top_profile_title'),
				    leftProfile = d3.select('#left_profile'),
				    leftRole = d3.select('#left_role'); 

				topProfile.text(fullname);
				topProfileTitle.text(fullname + ' - ' + role);
				leftProfile.text(fullname);
				leftRole.html("<i class='fa fa-circle text-success'></i>"+' '+role);

			});


		}

	}



});
