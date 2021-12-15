({
	// Sets an empApi error handler on component initialization
    onInit : function(component, event, helper) {
        let auraId = component.get('v.auraId');
        // Get the empApi component
        const empApi = component.find(auraId);

        // Uncomment below line to enable debug logging (optional)
        // empApi.setDebugFlag(true);

        // Register error listener and pass in the error handler function
        empApi.onError($A.getCallback(error => {
            // Error can be any type of error (subscribe, unsubscribe...)
            console.error('EMP API error: ', JSON.stringify(error));
        }));
    },
    // Invokes the subscribe method on the empApi component
    subscribe : function(component, event, helper) {
        let auraId = component.get('v.auraId')
        // Get the empApi component
        const empApi = component.find(auraId);
        // Get the channel from the aura method params
        var params = event.getParam('arguments');
        if(params){
        	const channel = params.channelToSubscribe;
	        // Replay option to get new events
	        const replayId = -1;

	        // Subscribe to an event
	        empApi.subscribe(channel, replayId, $A.getCallback(eventReceived => {
	            // Process event (this is called each time we receive an event)
	            var msg = JSON.parse(JSON.stringify(eventReceived));
	            component.set('v.message',msg);
	            	
	        }))
	        .then(subscription => {
	            // Subscription response received.
	            // We haven't received an event yet.

	            // Save subscription to unsubscribe later
	            component.set('v.subscription', subscription);
	            component.set('v.subscribe',true);
	        });
        }
	        
    },
    // Invokes the unsubscribe method on the empApi component
    unsubscribe : function(component, event, helper) {
        let auraId = component.get('v.auraId');
    	console.log('unsubscribing' + component.get('v.subscribe'));
        // Get the empApi component
        const empApi = component.find(auraId);
        // Get the subscription that we saved when subscribing
        const subscription = component.get('v.subscription');

        // Unsubscribe from event
        empApi.unsubscribe(subscription, $A.getCallback(unsubscribed => {
          // Confirm that we have unsubscribed from the event channel
          component.set('v.subscription', null);
          component.set('v.subscribe',false);
        }));
    }
})