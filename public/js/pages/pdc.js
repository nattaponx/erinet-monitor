require(['public/js/widgets/pdcModule/pdcController.js','public/js/widgets/authuser.js'], 
	function(pdcCtrl, user){
		pdcCtrl.initController('#pdc-container','#toggleModule');
		user.initProfile();
});