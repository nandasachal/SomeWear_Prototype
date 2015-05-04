// KPR Script file

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


function lightUp(hanger, color) {
    application.invoke(new Message(deviceURL + "lightUp?" + serializeQuery({
	    hanger: hanger,
	    color: color
	})), Message.JSON);
}

function dim(hanger) {
    application.invoke(new Message(deviceURL + "dim?" + serializeQuery({
        hanger: hanger
    })), Message.JSON);
}

function dimAll() {
    application.invoke(new Message(deviceURL + "dimAll"));
    trace('reached dimAll\n');
}

exports.lightUp = lightUp;
exports.dimAll = dimAll;
exports.dim = dim;