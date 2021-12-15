({
	// Sets an empApi error handler on component initialization
    onInit : function(component, event, helper) {
        var auraId = component.get('v.auraId');
        var channel = component.get('v.channel');
        var subscribed = component.set('v.subscribe',true);
        var listener = component.find(auraId);
        listener.subscribeToChannel(channel,true);
        helper.doInit(component,event,helper);
    },
    // Invokes the subscribe method on the empApi component
    subscribe : function(component, event, helper) {
        var auraId = component.get('v.auraId');
        var channel = component.get('v.channel');
        var subscribed = component.set('v.subscribe',true);
        var listener = component.find(auraId);
        listener.subscribeToChannel(channel,true);
        helper.doInit(component,event,helper);
    },
    // Invokes the unsubscribe method on the empApi component
    unsubscribe : function(component, event, helper) {
        var auraId = component.get('v.auraId');
        var channel = component.get('v.channel');
        var subscribed = component.set('v.subscribe',false);
        var listener = component.find(auraId);
        listener.unsubscribeFromChannel();
        helper.doInit(component,event,helper);
    },
    //fires the Toast Message to the end user.  Should be updated for each instance of this component.
    fireMessage : function(component,event,helper){
        var msg = component.get('v.message');
        var name = component.get('v.displayName');
        var toastName = name + ' response | ';
        if(msg.data.payload.Success__c == true)            {
            helper.displayToast(component, 'success',toastName + msg.data.payload.StatusCode__c +': ' + msg.data.payload.Status__c);
        }
        else{
            helper.displayToast(component, 'warning',toastName + msg.data.payload.StatusCode__c +': ' + msg.data.payload.Status__c);
        }
    }
})