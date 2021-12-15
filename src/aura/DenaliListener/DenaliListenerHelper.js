({
	doInit : function(component,event,helper) {
		var subscribed = component.get('v.subscribe');
		var utilityAPI = component.find("denaliListenerUtil");
		utilityAPI.getAllUtilityInfo().then(function(response){
			if(typeof response !== 'undefined'){
				utilityAPI.disableUtilityPopOut({disabled: true,disabledText: "Pop-out is disabled"});
				if(subscribed){
					utilityAPI.setUtilityIcon({icon : 'utility:podcast_webinar'});
					var status = 'Listening to connection';
					utilityAPI.setUtilityLabel({label : status});
					utilityAPI.setUtilityHighlighted({highlighted : false});
					utilityAPI.setPanelWidth({widthPX : 480});
					utilityAPI.setPanelHeight({heightPX :120});
					utilityAPI.setPanelHeaderLabel({label  :'Listening to connection'});
					utilityAPI.setPanelHeaderIcon({icon: 'utility:podcast_webinar'});
				} else{
					utilityAPI.setUtilityIcon({icon : 'utility:muted'});
					var status = 'Click to listen to connection';
					utilityAPI.setUtilityLabel({label : status});
					utilityAPI.setUtilityHighlighted({highlighted : true});
					utilityAPI.setPanelWidth({widthPX : 480});
					utilityAPI.setPanelHeight({heightPX :120});
					utilityAPI.setPanelHeaderLabel({label  :'Listen to connection'});
					utilityAPI.setPanelHeaderIcon({icon: 'utility:muted'});
				}

				var eventHandler = function(response){
					if(response.panelVisible === true) {

					} else{

					}
				};
				utilityAPI.onUtilityClick({
					eventHandler : eventHandler
				}).then(function(result){
					if(subscribed){
        				
						
					} else{
						
						
					}
					
				}).catch(function(error){
					console.log('click util error: ' + error);
				});
			}else{
				console.log('No Utility API available');
			}
		});	
	},
	displayToast: function (component, type, message) {
    	const toastEvent = $A.get('e.force:showToast');
    	toastEvent.setParams({
      		type: type,
      		message: message
    	});
    	toastEvent.fire();
  	},
})