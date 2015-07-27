/**
 * PDC Performance view
 * Author: Nattapon Thathong
 */
define(['performance/nodeChart'],function (nodechart) {
	return {

		//Widget properties
		properties: {
			updateInterval: ''
		},

		init: function () {
		//end of init
		},

		// getRandomData: function(){
		// 	var data = [];
		// 	var now = new Date().getTime();
		// 	updateInterval = 1000;
		// 	var totalPoints = 100;
		// 	data.shift();
		// 		// if (data.length > 0)
		// 		// 	data = data.slice(1);
		// 		// Do a random walk
		// 		while (data.length < totalPoints) {
		// 			var temp = [now += updateInterval, Math.floor((Math.random() * 20) + 5)];
		// 			data.push(temp);	
		// 		}
		// 		return data;
		// }

	}
});

