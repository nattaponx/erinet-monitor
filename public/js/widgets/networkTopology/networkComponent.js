define([], function(){
	return{
		
		getInstance: function(){
			var instance = {
				properties: {
					x: '',
					y: '',
					type: ''
				},

				init: function(){

				},

				//------Get fucntions------
				getX: function(){
					return this.properties.x;
				},

				getY: function(){
					return this.properties.y;
				},

				getType: function(){
					return this.properties.type;
				},

				//------Set fucntions------
				setX: function(x){
					this.properties.x = x;
				},

				setY: function(y){
					this.properties.y = y;
				}				
			}

			return instance;
		}
	}
});