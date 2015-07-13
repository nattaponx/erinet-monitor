/**
 * Network Component
 * Author: Victor Larsson (elarvic)
 */
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
					disabledImg:'',
					hoverImg: '',
					clickedImg: ''
				},

				/**
				 * Initializing a component object
				 *  
				 * @param  {JSON} component []
				 */
				init: function(component){
					//Assig properties
					this.properties.id     = component.id;
					this.properties.name   = component.name;
					this.properties.status = component.status;

					var url = '/public/img/';

					//Assign properties based on the type of the component
					if(component.name.toUpperCase().indexOf('EPG') > -1){
						this.properties.type        = 'EPG';
						this.properties.activeImg   = url + 'epg_mme_button.svg';
						this.properties.disabledImg = url + 'epg_mme_button_disabled.svg';
						this.properties.hoverImg    = url + 'epg_mme_button_hover.svg';
						this.properties.clickedImg  = url + 'epg_mme_button_clicked.svg';
					}else if(component.name.toUpperCase().indexOf('MME') > -1){
						this.properties.type        = 'MME';
						this.properties.activeImg   = url + 'epg_mme_button.svg';
						this.properties.disabledImg = url + 'epg_mme_button_disabled.svg';
						this.properties.hoverImg    = url + 'epg_mme_button_hover.svg';
						this.properties.clickedImg  = url + 'epg_mme_button_clicked.svg';
					}else if(component.name.toUpperCase().indexOf('SAPC') > -1){
						this.properties.type        = 'SAPC';
						this.properties.activeImg   = url + 'sapc_button.svg';
						this.properties.disabledImg = url + 'sapc_button_disabled.svg';
						this.properties.hoverImg    = url + 'sapc_button_hover.svg';
						this.properties.clickedImg  = url + 'sapc_button_clicked.svg';
					}else if(component.name.toUpperCase().indexOf('SASN') > -1){
						this.properties.type        = 'SASN';
						this.properties.activeImg   = url + 'epg_mme_button.svg';
						this.properties.disabledImg = url + 'epg_mme_button_disabled.svg';
						this.properties.hoverImg    = url + 'epg_mme_button_hover.svg';
						this.properties.clickedImg  = url + 'epg_mme_button_clicked.svg';
					}else{
						this.properties.type        = 'undefined';
						this.properties.activeImg   = url + 'epg_mme_button.svg';
						this.properties.disabledImg = url + 'epg_mme_button_disabled.svg';
						this.properties.hoverImg    = url + 'epg_mme_button_hover.svg';
						this.properties.clickedImg  = url + 'epg_mme_button_clicked.svg';
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

				getHoverImg: function(){
					return this.properties.hoverImg;
				},

				getClickedImg: function(){
					return this.properties.clickedImg;
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