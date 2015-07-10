define([], function(){
	return{
		
		getInstance: function(){
			var instance = {
				properties: {
					id: '',
					name: '',
					type: '',
					status:'',
					x: '',
					y: '',
					activeImg: '',
					disabledImg:''
				},

				init: function(component){
					this.properties.id     = component.id;
					this.properties.name   = component.name;
					this.properties.status = component.status;

					if(component.name.toUpperCase().indexOf('EPG') > -1){
						this.properties.type = 'EPG';
					}else if(component.name.toUpperCase().indexOf('MME') > -1){
						this.properties.type = 'MME';
					}else if(component.name.toUpperCase().indexOf('SAPC') > -1){
						this.properties.type = 'SAPC';
					}else if(component.name.toUpperCase().indexOf('SASN') > -1){
						this.properties.type = 'SASN';
					}

				},

				//------Get fucntions------
				
				getId: function(){
					return this.properties.id;
				},

				getName: function(){
					return this.properties.name;
				},

				getType: function(){
					return this.properties.type;
				},

				getStatus: function(){
					return this.properties.status;
				},

				getX: function(){
					return this.properties.x;
				},

				getY: function(){
					return this.properties.y;
				},

				getActiveImg: function(){
					return this.properties.activeImg;
				},

				getDisabledImg: function(){
					return this.properties.disabledImg;
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