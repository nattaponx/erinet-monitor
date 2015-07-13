require(['public/js/widgets/pdcModule/pdcView.js','public/js/widgets/pdcModule/pdcController.js'], 
	function(pdcView, pdcCtrl){
		pdcView.initModule('#pdc-container','#toggleModule');
		pdcCtrl.initToggleButton('#toggleModule');
		pdcCtrl.initController();
});