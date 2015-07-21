require(['public/js/widgets/pdcModule/pdcView.js','public/js/widgets/pdcModule/pdcController.js',
	'public/js/widgets/authuser.js'], 
	function(pdcView, pdcCtrl, user){
		pdcView.initModule('#pdc-container','#toggleModule');
		pdcCtrl.initToggleButton('#toggleModule');
		pdcCtrl.initController();
		user.initProfile();
});