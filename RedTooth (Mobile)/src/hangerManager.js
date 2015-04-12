// KPR Script file

var closet={};

Handler.bind("/getCloset", {
    onInvoke: function(handler, message){
        if (deviceURL != "") handler.invoke(new Message(deviceURL + "getCloset"), Message.JSON);
    },
    onComplete: function(handler, message, json){
    	closet=json.closet;
    }
});

deviceURL = "";

Handler.bind("/discover", Behavior({
	onInvoke: function(handler, message){
		deviceURL = JSON.parse(message.requestText).url;
	}
}));

Handler.bind("/forget", Behavior({
	onInvoke: function(handler, message){
		deviceURL = "";
	}
}));
